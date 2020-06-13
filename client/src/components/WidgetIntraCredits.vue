<template>
	<div class="col-md-6 col-xl-3 mb-4">
		<div class="card shadow border-left-success py-2">
			<div style="padding-right:10px">
				<button
					type="button"
					class="close"
					aria-label="Close"
					@click="deleteWidget"
				>
					<span  aria-hidden="true">×</span>
				</button>
			</div>
			<div class="card-body" style="padding-top: 0rem;">
				<div class="row align-items-center no-gutters">
					<div class="col mr-2">
						<div class="text-uppercase text-success font-weight-bold text-xs mb-1">
							<span style="color: #1cc88a;">Nombre de crédits</span>
						</div>
						<div class="text-dark font-weight-bold h5 mb-0">
							<span>{{credits}}</span>
						</div>
					</div>
					<div class="col-auto">
						<i class="fas fa-donate fa-2x icon-green"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { apiBaseUrl } from '../config/base.js'
import { interval } from '../config/base.js'

export default {
	props: {
		info: {
			type: Object
		},
	},
	data () {
		return {
			autologin: '',
			credits: '',
			idInterval: null,
		}
	},

	methods: {
		deleteWidget() {
			this.$emit('deleteWidget')
		},

		async updateUserInfo () {
			try {
				const { data } = await axios({
					url: `${apiBaseUrl}intranet/user/`,
					method: 'get',
					params: {
						autologin: this.autologin
					},
					headers: {
						'authorization': 'Bearer ' + this.$cookie.get('access_token')
					}
				})
				this.credits = data.credits
			} catch (err) {
				console.error(err)
			}
		}
	},
	
	beforeDestroy () {
		clearInterval(this.idInterval)
	},

	created () {
		const parameter = JSON.parse(this.info.PARAMETERS)
		this.autologin = parameter.autologin
		this.updateUserInfo()
		this.idInterval = setInterval(() => {
			this.updateUserInfo()
		}, 1000 * 60 * interval)
	},
}
</script>