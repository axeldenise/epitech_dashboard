/*
** FANGORN PROJECT, 2020
** Dashboard
** File description:
** [file description here]
*/

const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
global.db = require('./database')

app.use(bodyParser.json())
app.use(cors())

app.use('/user', routes.User)
app.use('/widget', routes.Widget)
app.use('/intranet', routes.Intranet)
app.use('/weather', routes.Weather)

app.listen(process.env.API_PORT)

module.exports = app