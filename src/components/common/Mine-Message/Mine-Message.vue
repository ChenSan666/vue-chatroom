<template>
	<div class="mine-msg">
		<div class="msg-content">
			<div class="msg-wrapper">
				<p class="user-name" v-text="userName"></p>
				<div class="user-msg-box">
					<div class="triangle"></div>
					<div class="message" v-text="message"></div>
				</div>
			</div>
		</div>
		<div class="user-avatar" :style="{backgroundColor: avatarColor}">
			<span class="user-avatar-name" v-if="userName">{{userName[0]}}</span>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	props: ['message'],
	computed: {
		...mapState(['userName', 'avatarColor'])
	}
};
</script>

<style scoped lang="scss">
@import "~@/common/scss/device-width.scss";
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
				text-align: left;
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
					right: -8px;
					// margin-left: -18px;
					// transform: rotate()
          border: 4px solid transparent;
          border-left-color: #fff;
        }
        .message {
          // display: inline-block;
					// transform: rotateY(180deg);
					line-height: 24px;
          word-wrap: break-word;
        }
      }
    }
  }
}
</style>