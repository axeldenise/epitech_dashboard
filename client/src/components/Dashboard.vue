<template>
	<div id="wrapper">
		<modal name="weather"
			:height="350">
			<div class="container">
			<h2 align="center">Service Meteo - Widget</h2>
			<form @submit.prevent="addWidget('weather')">
				<div class="form-group myselect">
					<label>Quel widget voulez-vous ajouter ?</label>
					<select v-model="selectedWidget" class="form-control">
						<option selected="selected" value=7>Température Actuelle</option>
						<option value=8>Température 5 prochaines heures</option>
						<option value=6>Heure du lever du soleil</option>
						<option value=5>Heure du coucher du soleil</option>
					</select>
				</div>
				<div class="form-group">
					<label>Entrez votre ville</label>
					<input
						v-model="city"
						class="form-control"
						type="text"
						placeholder="ville">
				</div>
				<button
					class="btn btn-primary"
					type="submit"
					@click="$modal.hide('weather')"
				>
					Submit
				</button>
			</form>
			</div>
		</modal>

		<modal name="intraEpitech"
		:height="370">
			<div class="container">
			<h2 align="center">Service Intranet Epitech - Widget</h2>
			<form @submit.prevent="addWidget('intranet')">
				<div class="form-group myselect">
					<label>Quel widget voulez-vous ajouter ?</label>
					<select class="form-control" v-model="selectedWidget">
						<option selected="selected" value=4>Nombre de crédits</option>
						<option value=1>GPA</option>
						<option value=3>Dernières absences</option>
						<option value=2>Dernières notifications</option>
					</select>
				</div>
				<div class="form-group">
					<label>Entrez votre autologin</label>
					<input
						v-model="autologin"
						class="form-control"
						type="text"
						placeholder="autologin"
					>
					<small class="form-text text-muted">auth-XXXXXXXXXXXXXXXX</small>
				</div>
				<button
					class="btn btn-primary"
					type="submit"
					@click="$modal.hide('intraEpitech')"
				>
					Submit
				</button>
			</form>
			</div>
		</modal>

		<nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
			<div class="container-fluid d-flex flex-column p-0">
				<a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
					<div class="sidebar-brand-icon rotate-n-15">
						<i class="fas fa-laugh-wink"></i>
					</div>
					<div class="sidebar-brand-text mx-3">
						<span>Dashboard</span>
					</div>
				</a>
				<hr class="sidebar-divider my-0">
				<ul class="nav navbar-nav text-light" id="accordionSidebar">
					<li class="nav-item" role="presentation">
						<a
							class="nav-link active"
							href="#"
							@click.prevent="intranetModal"
						>
							<i class="fas fa-school"></i>
							<span>Intranet Epitech</span>
						</a>
						<a
							class="nav-link active"
							href="#"
							@click.prevent="weatherModal"
						>
							<i class="fas fa-cloud-sun"></i>
							<span>Meteo</span>
						</a>
					</li>
				</ul>
				<div class="text-center d-none d-md-inline">
					<button
						class="btn rounded-circle border-0"
						type="button"
						id="sidebarToggle"
						@click="disconnect"
					>
					</button>
				</div>
			</div>
		</nav>
		<div class="d-flex flex-column" id="content-wrapper">
			<div class="dashboad-main">
				<div class="container-fluid">
					<div class="d-sm-flex justify-content-between align-items-center mb-4">
						<h3 class="text-dark mb-0">Dashboard</h3>
					</div>
					<div class="row">
						<component
							:key="index"
							v-for="(component, index) in simpleWidget"
							v-bind:info="component"
							:is="component.name"
							@deleteWidget="removeWidget(component)"
						>
						</component>
					</div>
					
					<div class="row">
						<component
							:key="index"
							v-for="(component, index) in complexWidget"
							v-bind:info="component"
							:is="component.name"
							@deleteWidget="removeWidget(component)"
						>
						</component>
					</div>
				</div>
			</div>
			<footer class="bg-white sticky-footer">
				<div class="container my-auto">
					<div class="text-center my-auto copyright">
						<span>Copyright © Dashboard Fangorn 2019</span>
					</div>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import { apiBaseUrl } from '../config/base.js'
import WidgetIntraCredits from './WidgetIntraCredits'
import WidgetIntraGpa from './WidgetIntraGpa'
import WidgetIntraAbsences from './WidgetIntraAbsences'
import WidgetIntraNotification from './WidgetIntraNotification'
import WidgetWeatherSunrise from './WidgetWeatherSunrise'
import WidgetWeatherSunset from './WidgetWeatherSunset'
import WidgetWeatherNow from './WidgetWeatherNow'
import WidgetWeatherHour from './WidgetWeatherHour'

export default {
	name: 'Dashboard',
	data() {
		return {
			autologin: '',
			city: '',
			interval: '',
			accessToken: '',
			selectedWidget: 0,
			widgetList: [],
			simpleWidget: [],
			simpleWidgetList: [
				{
					id: 1,
					componentName: 'WidgetIntraGpa'
				},
				{
					id: 4,
					componentName: 'WidgetIntraCredits'
				},
				{
					id: 5,
					componentName: 'WidgetWeatherSunset'
				},
				{
					id: 6,
					componentName: 'WidgetWeatherSunrise'
				},
				{
					id: 7,
					componentName: 'WidgetWeatherNow'
				}
			],
			complexWidget: [],
			complexWidgetList: [
				{
					id: 2,
					componentName: 'WidgetIntraNotification'
				},
				{
					id: 3,
					componentName: 'WidgetIntraAbsences'
				},
				{
					id: 8,
					componentName: 'WidgetWeatherHour'
				}
			],
			error: '',
		}
	},

	components: {
		WidgetIntraGpa,
		WidgetIntraCredits,
		WidgetIntraAbsences,
		WidgetIntraNotification,
		WidgetWeatherSunset,
		WidgetWeatherSunrise,
		WidgetWeatherNow,
		WidgetWeatherHour,
	},

	async created () {
		this.accessToken = this.$cookie.get('access_token')
		if (this.accessToken === null) {
			router.push({ path: '/'})
		} else {
			await this.getWidgetList()
		}
	},

	methods: {
		disconnect () {
			this.$cookie.delete('access_token')
			router.push({ path: '/'})
		},
		weatherModal () {
			this.city = ''
			this.$modal.show('weather')
		},

		intranetModal () {
			this.autologin = ''
			this.$modal.show('intraEpitech')
		},

		async addWidget (widgetType) {
			const idWidget = this.selectedWidget
			const parameters = (widgetType === 'intranet') ? { autologin: this.autologin } : { city: this.city }
			try {
				await axios({
					url: `${apiBaseUrl}widget/`,
					method: 'post',
					headers: {
						authorization: 'Bearer ' + this.$cookie.get('access_token')
					},
					data: {
						idWidget: idWidget,
						parameters: JSON.stringify(parameters)
					}
				})
				this.getWidgetList()
			} catch (err) {
				console.error(err)
			}
		},

		async removeWidget (widget) {
			const idWidget = widget.ID

			try {
				await axios({
					url: `${apiBaseUrl}widget/${idWidget}/`,
					method: 'delete',
					headers: {
						authorization: 'Bearer ' + this.$cookie.get('access_token')
					},
				})
				this.simpleWidget = this.simpleWidget.filter(elem => elem.ID !== idWidget)
				this.complexWidget = this.complexWidget.filter(elem => elem.ID !== idWidget)
			} catch (err) {
				console.error(err)
			}
		},

		async getWidgetList () {
			this.simpleWidget = []
			this.complexWidget = []
			try {
				const { data } = await axios({
					url: `${apiBaseUrl}widget/`,
					method: 'get',
					headers: {
						authorization: 'Bearer ' + this.$cookie.get('access_token')
					}
				})
				for (const elem of data) {
					let widget = this.simpleWidgetList.find(widget => widget.id === elem.ID_WIDGET)
					if (widget) {
						elem.name = widget.componentName
						this.simpleWidget.push(elem)
					} else {
						widget = this.complexWidgetList.find(widget => widget.id === elem.ID_WIDGET)
						elem.name = widget.componentName
						this.complexWidget.push(elem)
					}
				}
			} catch (err) {
				console.error(err)
			}
		},
	},
}
</script>