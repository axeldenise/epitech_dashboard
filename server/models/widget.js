/*
** FANGORN PROJECT, 2019
** Koza
** File description:
** Modele User
*/

/* global db */
/* eslint no-undef: "error" */

class WidgetModel {
	async addWidget(widget) {
		return db.insert(widget)
			.into('USERS_WIDGETS')
	}

	async getWidget(idUser) {
		return db.select().
			from('USERS_WIDGETS').
			where({ ID_USER: idUser })
	}

	async removeWidget(idUser, idWidget) {
		return db('USERS_WIDGETS').del().where({
			ID_USER: idUser,
			ID: idWidget
		})
	}
}

module.exports = WidgetModel