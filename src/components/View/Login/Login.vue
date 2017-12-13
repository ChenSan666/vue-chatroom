<template>
	<div class="login">
		<div class="login-wrapper">
			<h1 class="reminder">请输入你的用户名</h1>
			<input type="text" v-model="userName" class="username" autofocus="autofocus" @keyup.enter="login">
			<!-- <el-input v-model="username" placeholder="请输入消息"></el-input> -->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				userName: ''
			}
		},
		methods: {
			login() {
				if(this.name === ''){
					return;
				}
				//设置vuex内的userName
				this.$store.commit('setUserName', this.userName)
				//设置vuex内的userId
				this.$store.commit('setUserId', new Date().getTime())
				//设置avatarColor 
				this.$store.commit('setAvatarColor', Math.floor(Math.random()*10))
				this.$router.push('/chatroom')
				// console.log(this.$store.state.userName);
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