import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import AdminHome from '../views/AdminHome'
import OldMan from '../components/OldMan'
import OldHealth from '../components/OldHealth'
import ActivityInfo from '../components/ActivityInfo'
import Edit from '../components/Edit'
Vue.use(VueRouter)

const routes = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: Login },
	{
		path: '/adminhome',
		component: AdminHome,
		children: [
			{ path: '/OldMan', component: OldMan },
			{ path: '/OldHealth', component: OldHealth },
			{ path: '/ActivityInfo', component: ActivityInfo },
			{ path: '/Edit', component: Edit },
			{ path: '/Edit/:id', component: Edit },
		],
	},
]

const router = new VueRouter({
	routes,
})

export default router
