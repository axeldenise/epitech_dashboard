<template>
	<div class="col-lg-6 mb-4">
		<div class="card shadow mb-4">
			<div class="card-header py-3">
				<h6 class="text-primary font-weight-bold m-0">Notifications Intranet Epitech
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
				<ul class="list-group list-group-flush" :key="index" v-for="(notif, index) in notifs">
					<li class="list-group-item">
						<div class="row align-items-center no-gutters">
							<div class="col mr-2">
								<h6 class="mb-0">
									<strong>{{ notif.title }}</strong>
								</h6>
								<span class="text-xs">{{ notif.date }}</span>
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
	data () {
		return {
			notifs: [],
			autologin: '',
			idInterval: null,
		}
	},
	methods: {
		deleteWidget() {
			this.$emit('deleteWidget')
		},

		async updateNotification () {
			try {
				const { data } = await axios({
					url: `${apiBaseUrl}intranet/notification/`,
					method: 'get',
					params: {
						autologin: this.autologin
					},
					headers: {
						'authorization': 'Bearer ' + this.$cookie.get('access_token')
					}
				})
				this.notifs = []
				for (const elem of data) {
					this.notifs.push(elem)
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
		this.autologin = parameter.autologin
		this.updateNotification()
		this.idInterval = setInterval(() => {
			this.updateNotification()
		}, 1000 * 60 * interval)
	}    
}
</script>