/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

const express = require('express')
const router = express.Router()
const Weather = require('../controllers').Weather
const accessToken = require('./middleware').AccessToken
const validateParams = require('./middleware').ValidateParams.validateParams
const schemas = require('../schemas').WeatherSchema

router.get('/now/', [accessToken.verifyToken, validateParams(schemas.default())], function (req, res) {
	const weather = new Weather()
	weather.getTempNow(req, res)
})

router.get('/next/', [accessToken.verifyToken, validateParams(schemas.default())], function (req, res) {
	const weather = new Weather()
	weather.getNextTemp(req, res)
})

router.get('/info/', [accessToken.verifyToken, validateParams(schemas.default())], function (req, res) {
	const weather = new Weather()
	weather.getInfo(req, res)
})

module.exports = router