import express from 'express'
import * as userController from '../controllers/user.api.controller.js'
import { authorization } from '../middlewares/auth.middleware.js';

const route = express.Router()

route.get('/', authorization, userController.getAllUsers)
route.post('/', userController.create)
route.post('/login', userController.login)
route.post('/email', authorization, userController.findUserByEmail)
route.get('/:id', authorization, userController.findUserById)
route.put('/:id', authorization, userController.update)


export default route