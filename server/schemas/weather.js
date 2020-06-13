/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** Index de l'API
*/

const Joi = require('@hapi/joi')

class WeatherSchema {
	static default() {
		return Joi.object({
			city: Joi.string()
				.required()
		})
	}
}

module.exports = WeatherSchema