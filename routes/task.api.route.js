import express from 'express'
import * as taskController from '../controllers/task.api.controller.js'
import { authorization } from '../middlewares/auth.middleware.js'

const route = express.Router()

route.get('/', authorization, taskController.getAllTasks)
route.get('/user/:id', authorization, taskController.getAllTasksByUser)
route.post('/', authorization, taskController.create)
route.get('/:id', authorization, taskController.findTaskById)
route.put('/:id', authorization, taskController.update)
route.delete('/:id', authorization, taskController.deleteTask)
route.patch('/status/:id', authorization, taskController.changeTaskStatus)


export default route