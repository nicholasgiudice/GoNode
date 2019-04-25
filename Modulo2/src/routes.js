const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const userController = require('./app/controllers/UserController')

routes.get('/signup', userController.create)
routes.post('/signup', upload.single('avatar'), userController.store)

module.exports = routes
