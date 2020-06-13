/*
** FANGORN PROJECT, 2019
** Dashboard
** File description:
** 
*/

const K = require('../Constants')
const axios = require('axios')

class Weather {

	constructor () {
		this.apiKey = process.env.WEATHER_API_KEY
	}

	addGMT1(hour) {
		const words = hour.split(':')
		const result = parseInt(words[0]) + 2
		return (`${result}:${words[1]}`)
	}

	async getTempNow(req, res) {
		try {
			const { data } = await axios({
				url: K.weather.baseUrl + K.weather.endPoints.now,
				method: 'get',
				params: {
					city: req.query.city,
					key: this.apiKey
				}
			})
			const result = {
				city: data.data[0].city_name,
				temp: data.data[0].temp
			}
			res.status(200).json(result)
		} catch (err) {
			console.error(err)
			res.status(503).send(K.HttpStatus.serviceUnavailable)
		}
	}

	async getInfo(req, res) {
		try {
			const { data } = await axios({
				url: K.weather.baseUrl + K.weather.endPoints.info,
				method: 'get',
				params: {
					city: req.query.city,
					key: this.apiKey,
				}
			})

			const result = {
				city: data.data[0].city_name,
				sunrise: this.addGMT1(data.data[0].sunrise),
				sunset: this.addGMT1(data.data[0].sunset),
				uv: data.data[0].uv,
				snow: data.data[0].snow
			}
			res.status(200).json(result)
		} catch (err) {
			console.error(err)
			res.status(503).send(K.HttpStatus.serviceUnavailable)
		}
	}

	async getNextTemp(req, res) {
		try {
			const { data } = await axios({
				url: K.weather.baseUrl + K.weather.endPoints.next,
				method: 'get',
				params: {
					city: req.query.city,
					key: this.apiKey,
					hours: '5'
				}
			})
			const resultData = []

			for (const elem of data.data) {
				resultData.push({
					hour: elem.timestamp_local,
					temp: elem.temp
				})
			}
			res.status(200).json(resultData)
		} catch (err) {
			console.error(err)
			res.status(503).send(K.HttpStatus.serviceUnavailable)
		}
	}
}

module.exports = Weather