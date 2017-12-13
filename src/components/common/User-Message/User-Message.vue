<template>
	<div class="user-msg" v-if="msgobj">
		<div class="user-avatar" :style="{backgroundColor: msgobj.avatarColor}">
			<span class="user-avatar-name">{{avatarName}}</span>
		</div>
		<div class="msg-content">
			<p class="user-name" v-text="msgobj.user"></p>
			<div class="user-msg-box">
				<div class="triangle"></div>
				<div class="message">{{msgobj.content}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['msgobj'],
		computed: {
			avatarName() {
				return this.msgobj.user[0]
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "~@/common/scss/device-width.scss";
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
					line-height: 24px;
					word-wrap: break-word;
				}
			}
		}
	}
</style>