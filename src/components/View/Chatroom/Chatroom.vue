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
					<div class="sys-info">
						<p class="log-out-in">zzz离开了群聊</p>	
					</div>		
				</li>
				<li class="message-item">
					<div class="sys-info">
						<p class="log-out-in">2015/9/12 21:18:32</p>	
					</div>		
				</li>
				<li class="message-item">	
					<div class="user-msg">
						<div class="user-avatar">
							<span class="user-avatar-name">u</span>
						</div>
						<div class="msg-content">
							<p class="user-name">asda</p>
							<div class="user-msg-box">
								<div class="triangle"></div>
								<div class="message">asdasddddddddddd</div>
							</div>
						</div>
					</div>
				</li>
				<li class="message-item">	
					<div class="mine-msg">
						<div class="msg-content">
							<div class="msg-wrapper">
								<p class="user-name">儒家文化哈哈就</p>
								<div class="user-msg-box">
									<div class="triangle"></div>
									<div class="message">sssssssddddddddddddddddddssssssssssssssssssssssssssssdss</div>
								</div>
							</div>
						</div>
						<div class="user-avatar">
							<span class="user-avatar-name">u</span>
						</div>
					</div>
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
        .sys-info {
          font-size: 10px;
          font-weight: 100;
          color: #ccc;
          text-align: center;
        }
        .user-msg {
          display: flex;
          .user-avatar {
            flex: 0 0 32px;
            width: 32px;
            height: 32px;
            border-radius: 16px;
            line-height: 32px;
            font-size: 16px;
            text-align: center;
            background-color: #f4f;
          }
          .msg-content {
            // display: inline-block;
            // vertical-align: top;
            flex: 1;
            padding-left: 8px;
            box-sizing: border-box;
            .user-name {
              margin-bottom: 8px;
              font-size: 12px;
              color: #ccc;
              overflow: hidden;
            }
            .user-msg-box {
              position: relative;
              display: inline-block;
              max-width: 240px;
              padding: 6px 10px 8px 10px;
              border-radius: 4px;
              background-color: #fff;
              word-wrap: break-word;
              @media (min-width: $width-sm) {
                max-width: 200px;
              }
              @media (min-width: $width-md) {
                max-width: 250px;
              }
              @media (min-width: $width-desktop) {
                max-width: 500px;
              }
              .triangle {
                position: absolute;
                margin-left: -18px;
                border: 4px solid transparent;
                border-right-color: #fff;
              }
              .message {
                // display: inline-block;
                word-wrap: break-word;
              }
            }
          }
        }
        .mine-msg {
          display: flex;
          .user-avatar {
            flex: 0 0 32px;
            width: 32px;
            height: 32px;
            border-radius: 16px;
            line-height: 32px;
            font-size: 16px;
            text-align: center;
            background-color: $user-color;
          }
          .msg-content {
            // display: inline-block;
            // vertical-align: top;
            flex: 1;
            padding-right: 8px;
            box-sizing: border-box;
            .msg-wrapper {
							float: right;
							// transform: rotateY(180deg);
							text-align: right;
              .user-name {
                margin-bottom: 8px;
                font-size: 12px;
                color: $user-color;
                overflow: hidden;
              }
              .user-msg-box {
                position: relative;
                display: inline-block;
                max-width: 240px;
                padding: 6px 10px 8px 10px;
                border-radius: 4px;
                background-color: #fff;
                word-wrap: break-word;
                @media (min-width: $width-sm) {
                  max-width: 200px;
                }
                @media (min-width: $width-md) {
                  max-width: 250px;
                }
                @media (min-width: $width-desktop) {
                  max-width: 500px;
                }
                .triangle {
                  position: absolute;
                  margin-left: -18px;
                  border: 4px solid transparent;
                  border-right-color: #fff;
                }
                .message {
									// display: inline-block;
									// transform: rotateY(180deg);
                  word-wrap: break-word;
                }
              }
            }
          }
        }
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