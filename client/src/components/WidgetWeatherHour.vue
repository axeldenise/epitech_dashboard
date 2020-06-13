<template>
	<div class="col-lg-6 mb-4">
		<div class="card shadow mb-4">
			<div class="card-header py-3">
				<h6 class="text-primary font-weight-bold m-0">Prochaines temperatures
					<button
						type="button"
						class="close"
						aria-label="Close"
						@click="deleteWidget"
					>
						<span aria-hidden="true">×</span>
					</button>
				</h6>
			</div>
			<div class="card-body">
				<ul class="list-group list-group-flush" :key="index" v-for="(hour, index) in hours">
					<li class="list-group-item">
						<div class="row align-items-center no-gutters">
							<div class="col mr-2">
								<h6 class="mb-0">
									<strong>{{ hour.temp }} °C</strong>
								</h6>
								<span class="text-xs">{{ hour.hour }}</span>
							</div>
						</div>
					</li>
				</ul>
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
			hours: [],
			error: '',
			idInterval: null,
		}
	},
	methods: {
		deleteWidget() {
			this.$emit('deleteWidget')
		},

		async updateTempToday() {
			try {
				const { data } = await axios({
					url: `${apiBaseUrl}weather/next/`,
					method: 'get',
					params: {
						city: this.city
					},
					headers: {
						'authorization': 'Bearer ' + this.$cookie.get('access_token')
					}
				})
				this.hours = []
				for (const elem of data) {
					const myDate = new Date(elem.hour)
					this.hours.push({
						temp: elem.temp,
						hour: myDate.toLocaleDateString('fr-FR', { hour: 'numeric', minute: '2-digit' })
					})
				}
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
		this.updateTempToday()
		this.idInterval = setInterval(() =>{
			this.updateTempToday()
		}, 1000 * 60 * interval)
	}
}
</script>