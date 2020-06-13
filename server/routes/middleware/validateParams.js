/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

class ValidateParams {
	static validateParams (requestParams) {
		return (req, res, next) => {
			let result = null

			if (req.method === 'GET') {
				result = requestParams.validate(req.query)
			} else if (req.method === 'DELETE') {
				result = requestParams.validate(req.params)
			} else {
				result = requestParams.validate(req.body)
			}

			if (result.error === undefined) {
				next()
			} else {
				res.status(400).json(result.error)
			}
		}
	}
}

module.exports = ValidateParams