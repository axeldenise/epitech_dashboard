/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

/* global describe, it, db */
/* eslint no-undef: "error" */

const chai = require('chai')
const chaiHttp = require('chai-http')
const api = require('../index')
const Auth = require('../libraries').Auth

chai.should()
chai.use(chaiHttp)

describe('# Widget routes', () => {
	it('- getWidget user not connected', (done) => {
		chai.request(api)
			.get('/widget/')
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('- getWidget ok', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/widget/')
			.set('Authorization', 'Bearer ' + token)
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})

	it('- addWidget not connected', (done) => {

		chai.request(api)
			.post('/widget/')
			.send({
				idWidget: 5
			})
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('- addWidget bad parameter', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.post('/widget/')
			.set('Authorization', 'Bearer ' + token)
			.send({
				idWidget: 'azerty'
			})
			.end((err, res) => {
				res.should.have.status(400)
				done()
			})
	})

	it('- addWidget ok', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.post('/widget/')
			.set('Authorization', 'Bearer ' + token)
			.send({
				idWidget: 3
			})
			.end(async (err, res) => {
				const result = await db.select().from('USERS_WIDGETS').where({
					ID_USER: 1,
					ID_WIDGET: 3,
				})
				res.should.have.status(200)
				result.should.have.lengthOf(1)
				done()
			})
	})

	it('- removeWidget not connected', (done) => {
		chai.request(api)
			.delete('/widget/1/')
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('- removeWidget ok', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.delete('/widget/1/')
			.set('Authorization', 'Bearer ' + token)
			.end(async (err, res) => {
				const result = await db.select().from('USERS_WIDGETS').where({
					ID_USER: 1,
					ID: 1,
				})
				res.should.have.status(200)
				result.should.have.lengthOf(0)
				done()
			})
	})
})