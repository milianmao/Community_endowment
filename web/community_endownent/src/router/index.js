import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import AdminHome from '../views/AdminHome'
import OldMan from '../components/OldMan'
import OldHealth from '../components/OldHealth'
import ActivityInfo from '../components/ActivityInfo'
import Edit from '../components/Edit'
import Organizers from '../components/organizers'
import ServicePersonnel from '../components/ServicePersonnel'
import UserHome from '../views/UserHome'
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
			{ path: '/Organizers', component: Organizers },
			{ path: '/ServicePersonnel', component: ServicePersonnel },
		],
	},
	{ path: '/userhome', component: UserHome },
]

const router = new VueRouter({
	mode: 'history',
	routes,
})

export default router
