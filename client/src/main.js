import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.use(VModal)


new Vue({
	el: '#app',
	router,
	render: h => h(App)
})