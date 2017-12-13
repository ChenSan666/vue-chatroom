// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import axios from 'axios'
// import io from 'socket.io-client'
global.API_PROXY = 'https://bird.ioliu.cn/v1/?url='
global.API = 'http://api.qingyunke.com/api.php?key=free&appid=0&msg='



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

// 挂载在 Vue原型上
Vue.prototype.$http = axios
//socket连接
Vue.prototype.$socket = null
// Vue.prototype.$io = io
/* eslint-disable no-new */
const store = new Vuex.Store({
	state: {
		userName: '',
		// 获取每个socket连接的userID
		userId: null,
		avatarColor: ''
	},
	mutations: {
		setUserName(state, userName)	{
			state.userName = userName
		},
		setUserId(state, userId) {
			state.userId = userId
		},
		setAvatarColor(state, randomNumer) {
			var colorArray = [
				'#2C72C7',
				'#E85A90',
				'#2C6BCC',
				'#FD8A21',
				'#005684',
				'#F6A615',
				'#0DA921',
				'#F35E4C',
				'#CC6D5B',
				'#E0360D'
			]
			state.avatarColor = colorArray[randomNumer]
		}
	}
})

var vue = new Vue({
  el: '#app',
	router,
	store,
  template: '<App/>',
  components: { App }
})
