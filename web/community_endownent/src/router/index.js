import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../components/Home'
import AdminHome from '../views/AdminHome'
import OldMan from '../components/OldMan'
import OldHealth from '../components/OldHealth'
import ActivityInfo from '../components/ActivityInfo'
import Edit from '../components/Edit'
import Organizers from '../components/organizers'
import ServicePersonnel from '../components/ServicePersonnel'
import UserHome from '../views/UserHome'
import Order from '../components/Order'
import ServiceBusinesses from '../components/ServiceBusinesses'
Vue.use(VueRouter)

const routes = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: Login },
	{
		path: '/adminhome',
		component: AdminHome,
		redirect: '/Home',
		children: [
			{ path: '/Home', component: Home },
			{ path: '/OldMan', component: OldMan },
			{ path: '/OldHealth', component: OldHealth },
			{ path: '/ActivityInfo', component: ActivityInfo },
			{ path: '/Edit', component: Edit },
			{ path: '/Edit/:id', component: Edit },
			{ path: '/Organizers', component: Organizers },
			{ path: '/ServicePersonnel', component: ServicePersonnel },
			{ path: '/Order', component: Order },
			{ path: '/ServiceBusinesses', component: ServiceBusinesses },
		],
	},
	{ path: '/userhome', component: UserHome },
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}
const router = new VueRouter({
	mode: 'history',
	routes,
})

export default router
