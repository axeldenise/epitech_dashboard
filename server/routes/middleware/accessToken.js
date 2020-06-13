/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

const UserModel = require('../../models').UserModel
const Auth = require('../../libraries').Auth

class AccessToken {
	static async checkUserExist(idUser) {
		const userModel = new UserModel()
		const result = await userModel.getUser({ id: idUser })

		return (result.length > 0) ? true : false
	}

	static async verifyToken (req, res, next) {
		const bearerHeader = req.headers['authorization']

		if (typeof bearerHeader !== 'undefined') {
			try {
				const bearer = bearerHeader.split(' ')
				const bearerToken = bearer[1]
				const authData = Auth.getTokenData(bearerToken)
				const accountExist = await AccessToken.checkUserExist(authData.id)
				if (accountExist === true) {
					req.authData = authData
					next()
				} else {
					res.sendStatus(401)
				}
			} catch (err) {
				res.sendStatus(401)
			}
		} else {
			res.sendStatus(401)
		}
	}
}

module.exports = AccessToken