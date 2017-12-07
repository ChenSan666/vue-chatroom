<template>
	<div class="chatroom">
		<div class="room-header">
			<div class="room-type">
				<span class="type-icon">HOME</span>
			</div>
			<div class="room-info">
				<span class="room-name">聊天室({{msgObjArr[msgObjArr.length-1].userCount}})人</span>
			</div>
			<div class="logout-wrapper">
				<span class="logout">退出</span>
			</div>
		</div>
		<div class="room-centent">
			<ul class="message-list">
				<li class="message-item">
					<sys-info></sys-info>
				</li>
				<li class="message-item">	
					<user-message></user-message>
				</li>
				<li class="message-item">	
					<mine-message></mine-message>	
				</li>
			</ul>
		</div>
		<div class="room-footer">
			<div class="emoji"></div>
			<div class="message-ipt"></div>
			<div class="send-btn"></div>
		</div>
	</div>
</template>

<script>
import SysInfo from "@/components/common/Sys-Info/Sys-Info";
import UserMessage from "@/components/common/User-Message/User-Message";
import MineMessage from "@/components/common/Mine-Message/Mine-Message";
export default {
  name: "charroom",
  data() {
    return {
      msgObjArr: [
        {
          userCount: 10,
          userName: "sys",
          time: "2015/9/12 21:18:32",
          content: "zzz离开了群聊"
        }
      ]
    };
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
    background-color: rgb(49, 188, 121);
    .room-type {
      flex: 0 0 48px;
      width: 48px;
      height: 48px;
      padding-left: 8px;
      font-size: 16px;
      line-height: 48px;
      box-sizing: border-box;
      text-align: center;
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
    bottom: 48px;
    width: 100%;
    padding: 4px 8px;
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
    height: 48px;
    width: 100%;
    bottom: 0px;
    background-color: #f5f;
    .emoji {
      flex: 0 0 48px;
      width: 48px;
      background-color: #056;
    }
    .message-ipt {
      flex: 1;
    }
    .send-btn {
      flex: 0 0 48px;
      width: 48px;
      background-color: #056;
    }
  }
}
</style>