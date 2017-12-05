<template>
	<div class="login">
		<div class="login-wrapper">
			<h1 class="reminder">请输入你的用户名</h1>
			<input type="text" v-model="username" class="username" autofocus="autofocus" @keyup.enter="sendUserName">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				username: ''
			}
		},
		methods: {
			sendUserName() {

			}
		}
	}
</script>

<style lang="scss" scoped>
.login{
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;;
	background-color: #222;
	.login-wrapper{
		.reminder{
			margin-top: 0;
			text-align: center;
			font-weight: 100;
			color: #fff;
		}
		.username{
			width: 100%;
			height: 36px;
			border: 0;
			font-size: 24px;;
			color: #fff;
			border-bottom: 1px solid #fff;
			outline-style: none;
			background-color: #222;
			text-align: center;
		}
	}
}
</style>