/*
** FANGORN PROJECT, 2019
** Koza
** File description:
** Modele User
*/

/* global db */
/* eslint no-undef: "error" */

class UserModel {
	constructor() {
		this.tableName = 'USERS'
	}

	async addUser(user) {
		return db.insert(user).into(this.tableName)
	}

	async getUser(user) {
		const request = db.select().from(this.tableName)

		if (user.username !== undefined) {
			request.where({ USERNAME: user.username })
		} else if (user.id !== undefined) {
			request.where({ ID_USER: user.id })
		} else {
			return null
		}
		return request
	}
}

module.exports = UserModel