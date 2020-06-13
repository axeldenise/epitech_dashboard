<template>
	<div class="col-md-6 col-xl-3 mb-4">
		<div class="card shadow border-left-primary py-2" style="margin-bottom: 10px;">
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
						<div class="text-uppercase text-primary font-weight-bold text-xs mb-1">
							<span style="color: #4e73df;">{{city}}</span>
						</div>
						<div class="text-dark font-weight-bold h5 mb-0">
							<span>{{temp}} °C</span>
						</div>
					</div>
					<div class="col-auto">
						<i class="fas fa-temperature-low fa-2x icon-blue"></i>
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
	data() {
		return {
			display: true,
			city: '',
			temp: '',
			idInterval: null,
		}
	},
	methods: {
		deleteWidget() {
			this.$emit('deleteWidget')
		},

		async updateTempNow() {
			try {
				const { data } = await axios({
					url: `${apiBaseUrl}weather/now/`,
					method: 'get',
					params: {
						city: this.city
					},
					headers: {
						'authorization': 'Bearer ' + this.$cookie.get('access_token')
					}
				})
				this.city = data.city
				this.temp = data.temp
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
		this.updateTempNow()
		this.idInterval = setInterval(() => {
			this.updateTempNow()
		}, 1000 * 60 * interval)
	}
}
</script>