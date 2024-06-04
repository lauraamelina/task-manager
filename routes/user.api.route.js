import express from 'express'
import * as userController from '../controllers/user.api.controller.js'

const route = express.Router()

route.get('/users', userController.getAllUsers)
route.post('/users', userController.create)
route.post('/users/email', userController.findUserByEmail)


export default route