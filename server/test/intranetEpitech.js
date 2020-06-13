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

describe('# Intranet routes', () => {
	it('- getUserInfo not connected', (done) => {
		chai.request(api)
			.get('/intranet/user/')
			.query({
				autologin: process.env.AUTOLOGIN
			})
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('- getUserInfo no autologin', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/intranet/user/')
			.set('Authorization', 'Bearer ' + token)
			.end((err, res) => {
				res.should.have.status(400)
				done()
			})
	})

	it('- getUserInfo ok', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/intranet/user/')
			.set('Authorization', 'Bearer ' + token)
			.query({
				autologin: process.env.AUTOLOGIN
			})
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})

	it('- getNotification not connected', (done) => {
		chai.request(api)
			.get('/intranet/notification/')
			.query({
				autologin: process.env.AUTOLOGIN
			})
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('- getNotification no autologin', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/intranet/notification/')
			.set('Authorization', 'Bearer ' + token)
			.end((err, res) => {
				res.should.have.status(400)
				done()
			})
	})

	it('- getNotification ok', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/intranet/notification/')
			.set('Authorization', 'Bearer ' + token)
			.query({
				autologin: process.env.AUTOLOGIN
			})
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})

	it('- getAbsences not connected', (done) => {
		chai.request(api)
			.get('/intranet/absence/')
			.query({
				autologin: process.env.AUTOLOGIN
			})
			.end((err, res) => {
				res.should.have.status(401)
				done()
			})
	})

	it('- getAbsences no autologin', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/intranet/absence/')
			.set('Authorization', 'Bearer ' + token)
			.end((err, res) => {
				res.should.have.status(400)
				done()
			})
	})

	it('- getAbsences ok', (done) => {
		const token = Auth.createToken({ 'id': 1 })

		chai.request(api)
			.get('/intranet/absence/')
			.set('Authorization', 'Bearer ' + token)
			.query({
				autologin: process.env.AUTOLOGIN
			})
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})
})