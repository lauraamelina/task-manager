import express from 'express'
import * as userController from '../controllers/user.api.controller.js'

const route = express.Router()

route.get('/', userController.getAll)
route.post('/', userController.create)
route.post('/email', userController.findUserByEmail)
route.get('/:id', userController.findUserById)
route.put('/:id', userController.update)


export default route