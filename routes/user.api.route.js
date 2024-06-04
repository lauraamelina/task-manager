import express from 'express'
import * as userController from '../controllers/user.api.controller.js'

const route = express.Router()

route.get('/users', userController.getAllUsers)
route.post('/users', userController.create)
route.post('/users/email', userController.findUserByEmail)
route.get('/users/:id', userController.findUserById)
route.put('/users/:id', userController.update)


export default route