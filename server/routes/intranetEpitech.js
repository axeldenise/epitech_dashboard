/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

const express = require('express')
const router = express.Router()
const Intranet = require('../controllers').Intranet
const accessToken = require('./middleware').AccessToken
const validateParams = require('./middleware').ValidateParams.validateParams
const schemas = require('../schemas').IntranetSchema

router.get('/user/', [accessToken.verifyToken, validateParams(schemas.default())], function (req, res) {
	const intranet = new Intranet()
	intranet.getUserInfo(req, res)
})

router.get('/notification/', [accessToken.verifyToken, validateParams(schemas.default())], function (req, res) {
	const intranet = new Intranet()
	intranet.getNotification(req, res)
})

router.get('/absence/', [accessToken.verifyToken, validateParams(schemas.default())], function (req, res) {
	const intranet = new Intranet()
	intranet.getAbsences(req, res)
})

module.exports = router