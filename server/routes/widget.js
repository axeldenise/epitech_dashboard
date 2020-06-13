/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

const express = require('express')
const router = express.Router()
const Widget = require('../controllers').Widget
const accessToken = require('./middleware').AccessToken
const validateParams = require('./middleware').ValidateParams.validateParams
const schemas = require('../schemas').WidgetSchema

router.get('/', accessToken.verifyToken, function (req, res) {
	const widget = new Widget()
	widget.getWidget(req, res)
})

router.post('/', [accessToken.verifyToken, validateParams(schemas.addWidget())], function (req, res) {
	const widget = new Widget()
	widget.addWidget(req, res)
})

router.delete('/:idWidget/', [accessToken.verifyToken, validateParams(schemas.removeWidget())], function (req, res) {
	const widget = new Widget()
	widget.removeWidget(req, res)
})

module.exports = router