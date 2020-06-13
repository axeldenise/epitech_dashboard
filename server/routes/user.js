/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

const express = require('express')
const router = express.Router()
const User = require('../controllers').User
const validateParams = require('./middleware').ValidateParams.validateParams
const schemas = require('../schemas').UserSchema

router.post('/signup', validateParams(schemas.signUp()), function (req, res) {
	const user = new User()
	user.signUp(req, res)
})

router.get('/signin', validateParams(schemas.signIn()), function (req, res) {
	const user = new User()
	user.signIn(req, res)
})

module.exports = router