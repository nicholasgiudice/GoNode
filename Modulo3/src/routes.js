const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const userController = require('./app/controllers/UserController')
const sessionController = require('./app/controllers/SessionController')

routes.post('/users', userController.store)
routes.post('/session', sessionController.store)
routes.get('/test', authMiddleware, (req, res) => {
  return res.json('OK')
})

module.exports = routes
