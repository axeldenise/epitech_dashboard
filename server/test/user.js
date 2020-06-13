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
const sha256 = require('js-sha256')
const api = require('../index')
const UserModel = require('../models').UserModel
const K = require('../Constants')

chai.should()
chai.use(chaiHttp)

describe('# User routes', () => {
	it('- Connection missing parameters', (done) => {
		chai.request(api)
			.get('/user/signin')
			.query({
				'username': 'marie54'
			})
			.end(async (err, res) => {
				res.should.have.status(400)
				done()
			})
	})

	it('- Connection bad password', (done) => {
		chai.request(api)
			.get('/user/signin')
			.query({
				'username': 'marie54',
				'password': '123456'
			})
			.end((err, res) => {
				res.should.have.status(401)
				res.body.should.have.property('error')
				res.body.should.have.property('error').eql(K.HttpStatus.accountBadPassword)
				done()
			})
	})

	it('- Connection account not exist', (done) => {
		chai.request(api)
			.get('/user/signin')
			.query({
				'username': 'michel78',
				'password': '123456'
			})
			.end((err, res) => {
				res.should.have.status(401)
				res.body.should.have.property('error')
				res.body.should.have.property('error').eql(K.HttpStatus.accountNotExist)
				done()
			})
	})

	it('- Connection ok', (done) => {
		chai.request(api)
			.get('/user/signin')
			.query({
				'username': 'marie54',
				'password': 'azerty'
			})
			.end((err, res) => {
				res.should.have.status(200)
				res.body.should.have.property('token')
				done()
			})
	})

	it('- Create account missing parameters', (done) => {
		const currentDate = new Date()
		const timestamp = currentDate.getTime()

		chai.request(api)
			.post('/user/signup')
			.send({
				'name': 'User',
				'username': `${timestamp}`,
				'password': 'azerty',
			})
			.end(async (err, res) => {
				res.should.have.status(400)
				done()
			})
	})

	it('- Create account username already used', (done) => {
		chai.request(api)
			.post('/user/signup')
			.send({
				'name': 'User',
				'lastname': 'Test',
				'username': 'marie54',
				'password': 'azerty',
			})
			.end(async (err, res) => {
				res.should.have.status(409)
				res.body.should.have.property('error')
				res.body.should.have.property('error').eql(K.HttpStatus.accountAlreadyExist)
				done()
			})
	})

	it('- Create account ok', (done) => {
		const currentDate = new Date()
		const timestamp = currentDate.getTime()

		chai.request(api)
			.post('/user/signup')
			.send({
				'name': 'User',
				'lastname': 'Test',
				'username': `${timestamp}`,
				'password': 'azerty',
			})
			.end(async (err, res) => {
				res.should.have.status(200)
				
				const userModel = new UserModel()
				const result = await userModel.getUser({ username: `${timestamp}` })

				result.should.have.lengthOf(1)
				result[0].should.have.property('NAME').eql('User')
				result[0].should.have.property('LASTNAME').eql('Test')
				result[0].should.have.property('USERNAME').eql(`${timestamp}`)
				result[0].should.have.property('PASSWORD').eql(sha256('azerty'))
				done()
			})
	})
})