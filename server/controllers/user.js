/*
** FANGORN PROJECT, 2019
** Dashboard
** File description:
** Controller User
*/

const UserModel = require('../models').UserModel
const Auth = require('../libraries').Auth
const K = require('../Constants')
const sha256 = require('js-sha256')
const _ = require('lodash')

class User {
	constructor() {
		this.userModel = new UserModel()
	}

	async addUser(user) {
		try {
			await this.userModel.addUser(user)
			return true
		} catch (err) {
			console.error(err)
			return false
		}
	}

	async getUser(user) {
		try {
			const result = await this.userModel.getUser(user)
			return (result && result.length > 0) ? result[0] : {}
		} catch (err) {
			console.error(err)
			return null
		}
	}

	async signUp(req, res) {
		const parameters = req.body
		const profile = await this.getUser({ username: parameters.username })

		if (profile === null) {
			return res.status(500).send(K.HttpStatus.internalError)
		} else if (_.isEmpty(profile)) {
			const user = {
				NAME: parameters.name,
				LASTNAME: parameters.lastname,
				USERNAME: parameters.username,
				PASSWORD: sha256(parameters.password),
			}
			const result = await this.addUser(user)
			if (result === null) {
				return res.status(500).send(K.HttpStatus.internalError)
			} else {
				return res.status(200).json(result)
			}
		} else {
			return res.status(409).json({ error: K.HttpStatus.accountAlreadyExist })
		}
	}

	async signIn(req, res) {
		const parameters = req.query
		const result = await this.getUser({ username: parameters.username })

		if (result === null) {
			return res.status(500).send(K.HttpStatus.internalError)
		} else if (_.isEmpty(result)) {
			res.status(401).json({ error: K.HttpStatus.accountNotExist })
		} else {
			if (result.PASSWORD === sha256(parameters.password)) {
				res.status(200).json({ 'token': Auth.createToken({ 'id': result.ID_USER }) })
			} else {
				res.status(401).json({ error: K.HttpStatus.accountBadPassword })
			}
		}
	}
}

module.exports = User