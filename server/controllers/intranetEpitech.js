/*
** FANGORN PROJECT, 2019
** Dashboard
** File description:
** 
*/

const K = require('../Constants')
const axios = require('axios')
const _ = require('lodash')

class Intranet {

	removeHtmlTag(str) {
		if ((str === null) || (str === ''))
			return false
		else
			str = str.toString()
		return str.replace(/<[^>]*>/g, '')
	}

	async getUserInfo(req, res) {
		try {
			const { data } = await axios({
				url: K.intranet.baseUrl + req.query.autologin + K.intranet.endPoints.profile,
				method: 'get',
				params: {
					format: 'json'
				}
			})
			const result = {
				credits: data.credits,
				gpa: data.gpa[0].gpa
			}
			res.status(200).json(result)
		} catch (err) {
			console.error(err)
			res.status(503).send(K.HttpStatus.serviceUnavailable)
		}
	}

	async getNotification(req, res) {
		try {
			const { data } = await axios({
				url: K.intranet.baseUrl + req.query.autologin + K.intranet.endPoints.notification,
				method: 'get',
				params: {
					format: 'json'
				}
			})
			const resultData = []
			let i = 0

			if (_.isEmpty(data)) {
				res.status(200).json({})
				return
			}
			for (const elem of data) {
				i++
				resultData.push({
					title: this.removeHtmlTag(elem.title),
					date: elem.date
				})
				if (i === 5) {
					break
				}
			}
			res.status(200).json(resultData)
		} catch (err) {
			console.error(err)
			res.status(503).send(K.HttpStatus.serviceUnavailable)
		}
	}

	async getAbsences(req, res) {
		try {
			const { data } = await axios({
				url: K.intranet.baseUrl + req.query.autologin + K.intranet.endPoints.absence,
				method: 'get',
				params: {
					format: 'json'
				}
			})
			const resultData = []
			let i = 0

			if (_.isEmpty(data)) {
				res.status(200).json({})
				return
			}
			for (const elem of data.others) {
				i++
				resultData.push({
					module_title: elem.module_title,
					acti_title: elem.acti_title,
					date: elem.begin
				})
				if (i === 5) {
					break
				}
			}
			res.status(200).json(resultData)
		} catch (err) {
			console.error(err)
			res.status(503).send(K.HttpStatus.serviceUnavailable)
		}
	}
}

module.exports = Intranet