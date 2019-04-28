const express = require('express')

const routes = express.Router()

const userController = require('./app/controllers/UserController')
const sessionController = require('./app/controllers/SessionController')

routes.post('/users', userController.store)
routes.post('/session', sessionController.store)

module.exports = routes
