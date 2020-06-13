<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-9 col-lg-12 col-xl-10">
				<div class="card shadow-lg o-hidden border-0 my-5">
					<div class="card-body p-0">
						<div class="row">
							<div class="col-lg-6 d-none d-lg-flex">
								<div class="flex-grow-1 bg-login-image connexion-dashboard"></div>
							</div>
							<div class="col-lg-6">
								<div class="p-5">
									<div class="text-center">
										<h4 class="text-dark mb-4">Connexion</h4>
									</div>
									<form class="user" @submit.prevent="connection">
										<div class="form-group">
											<input
												v-model="username"
												class="form-control form-control-user"
												type="text"
												placeholder="pseudo"
											>
										</div>
										<div class="form-group">
											<input
												v-model="password"
												class="form-control form-control-user"
												type="password"
												placeholder="mot de passe"
											>
										</div>
										<button
											class="btn btn-primary btn-block text-white btn-user"
											type="submit"
										>
											Connexion
										</button>
										<p class="text-danger">{{ error }}</p>
										<hr>
										</form>
										<div class="text-center">
											<a
												class="small"
												href="#"
												@click.prevent="register"
											>
												Vous n'avez pas de compte ? Créez-en un !
											</a>
										</div>
								</div>
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
import router from '../router'

export default {
	name: 'Connection',
	data() {
		return {
			username: '',
			password: '',
			error: ''
		}
	},

	beforeCreate () {
		this.accessToken = this.$cookie.get('access_token')
		if (this.accessToken !== null) {
			router.push({ path: '/dashboard'}).catch(() => {})
		}
	},

	methods: {
		async connection () {
			if (this.username === '' || this.password === '') {
				this.result = 'Tous les champs sont obligatoires'
			} else {
				try {
					const { data } = await axios({
						url: `${apiBaseUrl}user/signin/`,
						method: 'get',
						params: {
							username: this.username,
							password: this.password
						}
					})
					const token = data.token
					this.$cookie.set('access_token', token, 1)
					router.push({ path: '/dashboard/'})
				} catch (err) {
					if (err.response.status === 401) {
						this.error = err.response.data.error
					} else {
						this.error = 'Une erreur est survenue'
					}
				}
			}
		},
		register () {
			router.push({ path: '/register'})
		}
	}
}
</script>