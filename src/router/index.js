import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/View/Login/Login'
import Chatroom from '@/components/View/Chatroom/Chatroom'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/',
			name: 'login',
			component: Login
		}, {
			path: '/chatroom',
			name: 'chatroom',
			component: Chatroom
		}
	]
})
