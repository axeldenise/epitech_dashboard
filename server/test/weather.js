/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

/* global describe, it */
/* eslint no-undef: "error" */

const chai = require('chai')
const chaiHttp = require('chai-http')
const api = require('../index')
const Auth = require('../libraries').Auth

chai.should()
chai.use(chaiHttp)

describe('# Weather routes', () => {
	it('- getTempNow not connected', (done) => {
		chai.request(api)
			.get('/weather/now/')
			.query({
				city: 'Nancy'
			})
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('- getTempNow no autologin', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/weather/now/')
			.set('Authorization', 'Bearer ' + token)
			.end((err, res) => {
				res.should.have.status(400)
				done()
			})
	})

	it('- getTempNow ok', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/weather/now/')
			.set('Authorization', 'Bearer ' + token)
			.query({
				city: 'Nancy'
			})
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})

	it('- getInfo not connected', (done) => {
		chai.request(api)
			.get('/weather/info/')
			.query({
				city: 'Nancy'
			})
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('- getInfo no autologin', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/weather/info/')
			.set('Authorization', 'Bearer ' + token)
			.end((err, res) => {
				res.should.have.status(400)
				done()
			})
	})

	it('- getInfo ok', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/weather/info/')
			.set('Authorization', 'Bearer ' + token)
			.query({
				city: 'Nancy'
			})
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})

	it('- getNextTemp not connected', (done) => {
		chai.request(api)
			.get('/weather/next/')
			.query({
				city: 'Nancy'
			})
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('- getNextTemp no autologin', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/weather/next/')
			.set('Authorization', 'Bearer ' + token)
			.end((err, res) => {
				res.should.have.status(400)
				done()
			})
	})

	it('- getNextTemp ok', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/weather/next/')
			.set('Authorization', 'Bearer ' + token)
			.query({
				city: 'Nancy'
			})
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})
})