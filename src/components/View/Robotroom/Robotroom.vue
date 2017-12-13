<template>
	<div class="robotroom">
		<div class="room-header">
			<div class="room-type" @click="goChatroom">
				<span class="type-icon"></span>
			</div>
			<div class="room-info">
				<span class="room-name">机器人</span>
			</div>
			<div class="logout-wrapper" @click="logout">
				<span class="logout">退出</span>
			</div>
		</div>
		<div class="room-centent">
			<ul class="message-list">
				<li class="message-item" v-for="msgItem in msgObjArr">
					<user-message :msgobj="msgItem" v-if="msgItem.from !== userName"></user-message>
					<mine-message :message="msgItem.content" v-if="msgItem.from === userName"></mine-message>	
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
const ERR_OK = 0
import SysInfo from "@/components/common/Sys-Info/Sys-Info"
import UserMessage from "@/components/common/User-Message/User-Message";
import MineMessage from "@/components/common/Mine-Message/Mine-Message";

//导入 此连接的用户信息
import { mapState } from "vuex";

//导入接口
// import getRobotMsg from '@/api/robot'
export default {
  name: "robotroom",
  data() {
    return {
			emojiShow: false,
			emojiArray: [['😀','😬','😁','😂','😃','😄','😅','😆','😇','😉'],['😊','🙂','🙃','😋','😌','😍','😘','😗','😙','😚'],['😜','😝','😛','🤑','🤓','😎','🤗','😏','😶','😐']],
      msgObjArr: [
        // {from: "sys",content: "zzz离开了群聊", avataColor: '#ccc',user: 'userName'}
			],
      message: ''
    };
	},
	// created() {
	// 	this.$socket = io.connect('http://192.168.0.107:3000/robotroom')
	// 	this.$socket.on('message', function(content) {
	// 		this.msgObjArr.push({from:'机器人', conetent, avataColor: 'rgb(250, 210, 40)', user: '机器人'})
	// 	})
	// },
	computed:{
		...mapState(['userName', 'avatarColor', 'userId'])
	},
	methods: {
		logout() {
			this.$router.push('/')
		},
		goChatroom() {		
			this.$router.push('/chatroom')
		},
		sendMessage(msg){
			if(!msg){
				return;
			}
			// 自己的消息
			this.msgObjArr.push({content: msg, from: this.userName})
			//机器人的回复
			// console.log(this);
			// console.log(API_PROXY + API + encodeURIComponent(msg));
			this.$http.get(API_PROXY + API + encodeURIComponent(msg)).then(res => {
				res = res.data
				if(res.result === ERR_OK){
					// console.log(res.content);
					let msgObj = {from:'机器人', content: res.content, avataColor: 'rgb(250, 210, 40)', user: '机器人'}
					this.msgObjArr.push(msgObj)
				}
			}).catch(e => {throw e})
			if(msg === this.message){
				this.message = ''
			}else{
				this.emojiShow = false
			}
		}

	},
  components: {
    SysInfo,
    UserMessage,
    MineMessage
  }
};
</script>

<style scoped lang="scss">
@import "~@/common/scss/device-width.scss";

.robotroom {
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
			background: url(../../../../static/img/chatroom.svg) no-repeat;
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
		overflow: auto;
    background-color: rgba(240, 240, 240, 0.5);
    box-sizing: border-box;
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