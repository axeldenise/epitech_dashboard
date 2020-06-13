<template>
	<div class="container">
		<div class="card shadow-lg o-hidden border-0 my-5">
			<div class="card-body p-0">
				<div class="row">
					<div class="col-lg-5 d-none d-lg-flex">
						<div class="flex-grow-1 bg-register-image register-dashboard"></div>
					</div>
					<div class="col-lg-7">
						<div class="p-5">
							<div class="text-center">
								<h4 class="text-dark mb-4">Inscription</h4>
							</div>
							<form class="user" @submit.prevent="register">
								<div class="form-group row">
									<div class="col-sm-6 mb-3 mb-sm-0">
										<input
											v-model="name"
											class="form-control form-control-user" 
											type="text"
											placeholder="prénom"
										>
									</div>
									<div class="col-sm-6">
										<input
											v-model="lastname"
											class="form-control form-control-user"
											type="text"
											placeholder="nom de famille"
										>
									</div>
								</div>
								<div class="form-group">
									<input
										v-model="username"
										class="form-control form-control-user"
										type="text"
										placeholder="pseudonyme"
									>
								</div>
								<div class="form-group row">
									<div class="col-sm-6 mb-3 mb-sm-0">
										<input
											v-model="password"
											class="form-control form-control-user"
											type="password"
											placeholder="mot de passe"
										>
									</div>
									<div class="col-sm-6">
										<input
											v-model="repeatPassword"
											class="form-control form-control-user"
											type="password"
											placeholder="Confirmer le mot de passe"
										>
									</div>
								</div>
								<button
									class="btn btn-primary btn-block text-white btn-user"
									type="submit"
								>
									Créer mon compte
								</button>
								<p class="text-danger">{{ error }}</p>
								<hr>
							</form>
							<div class="text-center">
								<a class="small"
									href="#"
									@click.prevent="connexion"
								>
								Vous avez déjà un compte ? Connectez-vous !</a>
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
import router from '../router'
import { apiBaseUrl } from '../config/base.js'

export default {
	name: 'Register',
	data() {
		return {
			name : '',
			lastname: '',
			username: '',
			password: '',
			repeatPassword: '',
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
		async register () {
			if (this.password != this.repeatPassword) {
				this.result = 'Les mots de passe ne sont pas identiques'
			} else if (this.name === '' || this.lastname === '' || this.password === '' || this.username === '') {
				this.result = 'Tous les champs sont obligatoires'
			} else {
				try {
					await axios({
						url: `${apiBaseUrl}user/signup/`,
						method: 'post',
						data: {
							username: this.username,
							password: this.password,
							name: this.name,
							lastname: this.lastname
						}
					})
					router.push({ path: '/'})
				} catch (err) {
					if (err.response.status === 401 || err.response.status === 409) {
						this.error = err.response.data.error
					} else {
						this.error = 'Une erreur est survenue'
					}
				}
			}
		},
		connexion () {
			router.push({ path: '/'})
		}
	},
}
</script>