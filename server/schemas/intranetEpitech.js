/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** Index de l'API
*/

const Joi = require('@hapi/joi')

class IntranetSchema {
	static default() {
		return Joi.object({
			autologin: Joi.string()
				.required()
		})
	}
}

module.exports = IntranetSchema