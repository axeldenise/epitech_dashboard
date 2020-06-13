import Vue from 'vue'
import Router from 'vue-router'
import Connection from '../components/Connection'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Connection',
			component: Connection
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard
		}
	]
})