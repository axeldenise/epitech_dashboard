/*
** FANGORN PROJECT, 2019
** Dashboard
** File description:
** Controller User
*/

const WidgetModel = require('../models').WidgetModel
const K = require('../Constants')

class Widget {
	constructor() {
		this.widgetModel = new WidgetModel()
	}

	async getWidget(req, res) {
		const authData = req.authData

		try {
			const result = await this.widgetModel.getWidget(authData.id)
			res.status(200).json(result)
		} catch (err) {
			console.error(err)
			res.status(500).send(K.HttpStatus.internalError)
		}
	}

	async addWidget(req, res) {
		const authData = req.authData
		
		try {
			const widgetData = {
				ID_USER: authData.id,
				ID_WIDGET: req.body.idWidget
			}
			if (req.body.parameters) {
				widgetData.PARAMETERS = req.body.parameters
			}
			const result = await this.widgetModel.addWidget(widgetData)
			res.status(200).json(result)
		} catch (err) {
			console.error(err)
			res.status(500).send(K.HttpStatus.internalError)
		}
	}

	async removeWidget(req, res) {
		const authData = req.authData
									
		try {
			const userWidget = await this.widgetModel.getWidget(authData.id)
			if (userWidget.filter(widget => widget.ID == req.params.idWidget).length > 0) {
				await this.widgetModel.removeWidget(authData.id, req.params.idWidget)
				res.status(200).json()
			} else {
				res.status(403).send(K.HttpStatus.forbidden)
			}
		} catch (err) {
			console.error(err)
			res.status(500).send(K.HttpStatus.internalError)
		}
	}
}

module.exports = Widget