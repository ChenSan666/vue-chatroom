
var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var proxy = require('http-proxy-middleware')
var allowCors = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials','true');
	res.header('Content-Type', 'text/json,charset=utf-8');
	if(next){
		next();
	}
};

app.use(express.static('client'))
app.use(allowCors)
app.use('/', proxy({
	target: 'http://api.qingyunke.com',
	changeOrigin: true
}))
// 在线人数
var onlineCount = 0;

// 在线人员
var onlineUsers = {};

// 监听存在的链接， 此时回调一个socket进行socket控制
io.of('/chatroom').on('connection', function (socket) {
	console.log('a user connect');
	// console.log(socket.handshake);
	//监听新用户的加入
	socket.on('login', function (user) {
		//暂存socket.name 为user.userId;在用户退出时候将会用到
		socket.name = user.userId;
		// 在线人员不存在则加入
		if (!onlineUsers.hasOwnProperty(user.userId)) {
			// 加入在线人员
			onlineUsers[user.userId] = user;
			onlineCount++;
		}
		/*一个用户新加入，向所有客户端监听login的socket的实例发送响应，
			响应内容为一个对象*/
		socket.broadcast.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount,
						/*user: user*/from: 'sys', content: `${user.userName}加入了聊天室..`})
		socket.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount,
						/*user: user*/from: 'sys', content: `${user.userName}加入了聊天室..`})
		// 在控制台打印
		console.log(`${user.userName} 加入了聊天室！`);
	})
	// 监听用户推出聊天室
	socket.on('disconnect', function () {
		// 保存退出人员
		var user = onlineUsers[socket.name];

		if (onlineUsers[socket.name]) {

			// 在在线人员中删除
			delete onlineUsers[socket.name];

			// 在线人数减一
			onlineCount--;

			// 向全体用户广播，此用户退出
			socket.broadcast.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, from: 'sys', content: `${user.userName}离开了聊天室..` });

			// 控制台打印 退出信息
			console.log(`${user.userName} 退出群聊。。`);
		}

	})

	/*
		监听到用户发送了消息，就使用io广播信息，信息被所有客户端接收并显示。
		注意，如果客户端自己发送的也会接收到这个消息，
		故在客户端应当存在这的判断，是否收到的消息是自己发送的，
		故在emit时，应该将用户的id和信息封装成一个对象进行广播
	*/

	socket.on('message', function (msgObj) {
		// 在 在线人员列表对象中 找到该成员
		var user = onlineUsers[msgObj.userId]
		console.log(onlineUsers)
		var messageObj = {
			from: user.userName + user.userId,
			user: user.userName,
			content: msgObj.content,
			avatarColor: user.avatarColor
		}
		socket.broadcast.emit('message', messageObj);
		socket.emit('message', messageObj);

		// 控制台 打印  信息
		console.log(`${messageObj.user} 说了: ${messageObj.content}`);
	})
})
// io.of('/robotroom').on('connection', function(socket) {
// 	socket.on('message', function(content){
// 		getRobotMsg(content, function(content) {
// 			socket.emit('message', content)
// 		})
// 	})
// })
// 监听 3000 端口
http.listen(3000, function () {
	console.log('listen port: 3000');
})
