import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//引入全局初始化文件
import './assets/css/global.css'
// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

axios.interceptors.request.use((config) => {
	let token = window.sessionStorage.getItem('token')
	if (token) {
		config.headers.Authorization = window.sessionStorage.getItem('token')
	}

	//最后必须return config
	return config
})
//全局vue过滤器(时间戳过滤器)
Vue.filter('dateFormat', function(originVal) {
	const dt = new Date(originVal)

	const y = dt.getFullYear()
	const m = (dt.getMonth() + 1 + '').padStart(2, '0')
	const d = (dt.getDay() + '').padStart(2, '0')

	const hh = (dt.getHours() + '').padStart(2, '0')
	const mm = (dt.getMinutes() + '').padStart(2, '0')
	const ss = (dt.getSeconds() + '').padStart(2, '0')

	return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
	// return `${y}-${m}-${d}`
})
// 公示板过滤器
Vue.filter('describe', function(value) {
	var des = value.replace(/<[^>]*>/g, '')
	if (des.length <= 15) {
		return des
	}
	return des.substr(0, 50) + '...'
})
Vue.config.productionTip = false
Vue.use(VueQuillEditor)
// 全局路由守卫
router.beforeEach((to, from, next) => {
	let token = window.sessionStorage.getItem('token')
	let Authorer = window.sessionStorage.getItem('Authorer')
	if (token && Authorer) {
		if (to.fullPath === '/adminhome' && Authorer === '0') {
			Vue.prototype.$message({
				message: '非法操作',
				type: 'error',
			})
			next({ path: '/login' })
		}
		next()
	} else {
		if (to.fullPath === '/login') {
			next()
		}
		if (to.fullPath !== '/login') {
			Vue.prototype.$message({
				message: '请先登录',
				type: 'error',
			})
		}
		next({ path: '/login' })
	}
})
new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app')
