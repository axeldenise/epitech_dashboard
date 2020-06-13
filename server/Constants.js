/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

module.exports = {
	'HttpStatus': {
		'missingParameters': 'Some required parameters are undefined',
		'accountAlreadyExist': 'An account already exist with this email address',
		'accountNotExist': 'No account register with this email address',
		'accountBadPassword': 'Bad password',
		'internalError': 'Internal Error',
		'serviceUnavailable': 'Service Unavailable',
		'forbidden': 'Forbidden'
	},
	'intranet': {
		'baseUrl': 'https://intra.epitech.eu/',
		'endPoints': {
			'profile': '/user/',
			'notification': '/user/notification/message/',
			'absence': '/user/notification/missed/'
		}
	},
	'weather': {
		'baseUrl': 'https://api.weatherbit.io/v2.0/',
		'endPoints': {
			'now': '/current/',
			'next': '/forecast/hourly/',
			'info': '/current/'
		}
	}
}