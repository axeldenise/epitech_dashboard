<template>
	<div class="col-md-6 col-xl-3 mb-4">
		<div class="card shadow border-left-danger py-2">
			<div style="padding-right:10px">
				<button
					type="button"
					class="close"
					aria-label="Close"
					@click="deleteWidget"
				>
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="card-body" style="padding-top: 0rem;">
				<div class="row align-items-center no-gutters">
					<div class="col mr-2">
						<div class="text-uppercase text-success font-weight-bold text-xs mb-1">
							<span style="color: #e74a3b;">COUCHER DU SOLEIL À {{city}}</span>
						</div>
						<div class="text-dark font-weight-bold h5 mb-0">
							<span>{{sunset}}</span>
						</div>
					</div>
					<div class="col-auto">
						<i class="fas fa-moon fa-2x icon-red"></i>
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
			city: '',
			sunset: '',
			idInterval: null,
		}
	},
	methods: {
		deleteWidget() {
			this.$emit('deleteWidget')
		},

		async updateInfo () {
			try {
				const { data } = await axios({
					url: `${apiBaseUrl}weather/info/`,
					method: 'get',
					params: {
						city: this.city
					},
					headers: {
						'authorization': 'Bearer ' + this.$cookie.get('access_token')
					}
				})
				this.city = data.city
				this.sunset = data.sunset
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
		this.city = parameter.city
		this.updateInfo()
		this.idInterval = setInterval(() => {
			this.updateInfo()
		}, 1000 * 60 * interval)
	}
}
</script>