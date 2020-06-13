<template>
	<div class="col-md-6 col-xl-3 mb-4">
		<div class="card shadow border-left-info py-2">
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
						<div class="text-uppercase text-info font-weight-bold text-xs mb-1">
							<span style="color: #36b9cc;">GPA</span>
						</div>
						<div class="row no-gutters align-items-center">
							<div class="col-auto">
								<div class="text-dark font-weight-bold h5 mb-0 mr-3">
									<span>{{ gpa }}</span>
								</div>
							</div>
							<div class="col">
								<div class="progress progress-sm">
									<div class="progress-bar bg-info" v-bind:style="{width: percentage}">
									</div>
								</div>
							</div>
							<div class="col-auto">
								<i class="fas fa-graduation-cap fa-2x icon-cyan"></i>
							</div>
						</div>
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
			gpa: '',
			autologin: '',
			percentage: '',
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
				this.gpa = data.gpa
				this.percentage = '' + Math.trunc((100 * this.gpa) / 4) + '%'
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