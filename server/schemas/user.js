/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** Index de l'API
*/

const Joi = require('@hapi/joi')

class UserSchema {
	static signUp() {
		return Joi.object({
			name: Joi.string()
				.max(50, 'utf8')
				.required(),

			lastname: Joi.string()
				.max(50, 'utf8')
				.required(),

			username: Joi.string()
				.max(50, 'utf8')
				.required(),

			password: Joi.string()
				.required()
		})
	}

	static signIn() {
		return Joi.object({
			username: Joi.string()
				.max(50, 'utf8')
				.required(),

			password: Joi.string()
				.required()
		})
	}
}

module.exports = UserSchema