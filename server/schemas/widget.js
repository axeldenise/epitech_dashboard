/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** Index de l'API
*/

const Joi = require('@hapi/joi')

class WidgetSchema {
	static addWidget() {
		return Joi.object({
			idWidget: Joi.number()
				.integer()
				.positive()
				.required(),

			parameters: Joi.string()
				.max(500, 'utf8')
		})
	}

	static removeWidget() {
		return Joi.object({
			idWidget: Joi.number()
				.integer()
				.positive()
				.required()
		})
	}
}

module.exports = WidgetSchema