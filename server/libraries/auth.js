/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

const jwt = require('jsonwebtoken')

class Auth {
	static createToken(data = {}) {
		return jwt.sign(data, process.env.JWT_SIGN_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME })
	}

	static getTokenData(bearerToken) {
		return jwt.verify(bearerToken, process.env.JWT_SIGN_SECRET)
	}
}

module.exports = Auth