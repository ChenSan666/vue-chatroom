<template>
	<div class="chatroom">
		<div class="room-header">
			<div class="room-type" @click="goRobotRoom">
				<span class="type-icon"></span>
			</div>
			<div class="room-info">
				<span class="room-name">聊天室({{onlineUserCount}})人</span>
			</div>
			<div class="logout-wrapper">
				<span class="logout" @click="backHome">退出</span>
			</div>
		</div>
		<div class="room-centent">
			<ul class="message-list">
				<li class="message-item" v-for="msgItem in msgObjArr">
					<sys-info :message="msgItem.content" v-if="msgItem.from === 'sys'"></sys-info>
					<user-message :msgobj="msgItem" v-if="msgItem.from !== (userName+userId) && msgItem.from !== 'sys'"></user-message>
					<mine-message :message="msgItem.content" v-if="msgItem.from === (userName+userId)"></mine-message>	
				</li>
			</ul>
		</div>
		<div class="room-footer">
			<div class="emoji" @click="emojiShow = !emojiShow">
				<!-- <img src="../../../../static/img/emoji.png" width="30px"> -->
			</div>
			<div class="message-ipt" @keyup.enter="sendMessage(message)">
				<el-input class="msg-ipt" v-model="message" placeholder="请输入内容"></el-input>
			</div>
			<div class="send-btn">
				<el-button type="primary" @click="sendMessage(message)">发送</el-button>
			</div>
			<transition name="el-zoom-in-bottom">
				<div class="emoji-box" v-show="emojiShow">
					<ul class="row" v-for="emojiArr in emojiArray">
						<li v-for="emojiItem in emojiArr" class="emoji-item" @click="sendMessage(emojiItem)">
							{{emojiItem}}
						</li>
					</ul>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import SysInfo from "@/components/common/Sys-Info/Sys-Info";
import UserMessage from "@/components/common/User-Message/User-Message";
import MineMessage from "@/components/common/Mine-Message/Mine-Message";
//导入 此连接的用户信息
import { mapState } from "vuex";
export default {
  name: "charroom",
  data() {
    return {
			emojiShow: false,
			emojiArray: [['😀','😬','😁','😂','😃','😄','😅','😆','😇','😉'],['😊','🙂','🙃','😋','😌','😍','😘','😗','😙','😚'],['😜','😝','😛','🤑','🤓','😎','🤗','😏','😶','😐']],
      msgObjArr: [
        {from: "sys", time: "2015/9/12 21:18:32", content: "zzz离开了群聊", avataColor: '#ccc',user: 'userName'}
			],
			message: '',
			onlineUserCount: 0,
			onlineUsersArr:[]
    };
	},
	computed:{
		...mapState(['userName', 'avatarColor', 'userId'])
	},
	mounted() {
		this.$socket = io.connect('http://localhost:3000/chatroom')
		// 向服务器发送登录事件
		this.$socket.emit('login', {userName: this.userName, avatarColor: this.avatarColor, userId: this.userId})

		this.$socket.on('message', (msgObj) => {
			this.msgObjArr.push(msgObj);
		})

		this.$socket.on('logout', msgObj => {
			this.msgObjArr.push(msgObj);
			this.updateOnlineInfo(msgObj)
		})
		this.$socket.on('login', msgObj => {
			this.msgObjArr.push(msgObj);
			this.updateOnlineInfo(msgObj)
		})
		// console.log(this.userName)
		// console.log(mapState);
	},
	methods: {
		sendMessage(msg) {
			if(!msg){
				return;
			}
			
			let msgObj = {
				// userId是每个成员的唯一的标志
				userId: this.userId,
				content: msg
			}
			this.$socket.emit('message', msgObj)
			//清空输入框
			if(msg === this.message){
				this.message = ''
			}else{
				this.emojiShow = false
			}
		},
		//更新在线人数
		updateOnlineInfo(msgObj) {
			this.onlineUserCount = msgObj.onlineCount
			for(var user in msgObj.onlineUsersObj){
				this.onlineUsersArr.push(user.userName)
			}
		},
		backHome() {
			this.$socket.close()
			this.$router.push('/')
		},
		goRobotRoom(){
			this.$socket.close();
			this.$router.push('/robotroom')
		}
	},
	
	components:{
		SysInfo,
		UserMessage,
		MineMessage
	}
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/device-width.scss";

.chatroom {
  display: flex;
  flex-direction: column;
  .room-header {
    display: flex;
    flex: 0 0 48px;
    height: 48px;
    background-color: #66b1ff;
    .room-type {
      flex: 0 0 48px;
      width: 48px;
      height: 48px;
      padding-left: 8px;
      font-size: 16px;
      line-height: 48px;
      box-sizing: border-box;
      text-align: center;
			background: url(../../../../static/img/robot.svg) no-repeat;
			background-size: 24px 24px;
			background-position: center center;
    }
    .room-info {
      flex: 1;
      line-height: 48px;
      text-align: center;
    }
    .logout-wrapper {
      flex: 0 0 48px;
      width: 48px;
      height: 48px;
      padding-right: 8px;
      font-size: 16px;
      line-height: 48px;
      box-sizing: border-box;
      text-align: center;
    }
  }
  .room-centent {
    position: absolute;
    top: 48px;
    bottom: 40px;
    width: 100%;
		max-height: calc(100vh - 88px);
    padding: 4px 8px;
    background-color: rgba(240, 240, 240, 0.5);
    box-sizing: border-box;
		overflow: auto;
    .message-list {
      .message-item {
        margin: 12px 0;
      }
    }
  }
  .room-footer {
    position: absolute;
    display: flex;
    height: 40px;
    width: 100%;
    bottom: 0px;
    // background-color: #f5f;
    .emoji {
      flex: 0 0 40px;
      width: 40px;
			border-radius: 4px;
			background: url(../../../../static/img/emoji.svg) no-repeat;
			background-size: 30px 30px;
			background-position: center center;;
			background-color: rgba(240, 240, 240, 0.5)
      // background-color: #056;
    }
    .message-ipt {
      flex: 1;
    }
    .send-btn {
      flex: 0 0 70px;
      width: 70px;
      // background-color: #056;
    }
		.emoji-box{
			position: absolute;
			width: 100%;
			height: 120px;
			bottom: 40px;
			// background-color: #40f;
			.row{
				display: flex;
				width: 100%;
				height: 40px;
				.emoji-item{
					flex: 1;
					text-align: center;
					line-height: 40px;
					font-size: 20px;
					&:hover{
						background-color: #ccc;
					}
				}
			}
		}
  }
}
</style>