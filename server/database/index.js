/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

const knex = require('knex') ({
	client: 'mysql',
	connection: {
		host: process.env.MARIA_HOST,
		user: process.env.MARIA_USER,
		password: process.env.MARIA_PASSWORD,
		database: process.env.MARIA_DATABASE
	},
	pool: { min: 1, max: 1 }
})

module.exports = knex