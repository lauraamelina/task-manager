import express from 'express'
import * as taskController from '../controllers/task.api.controller.js'

const route = express.Router()

route.get('/', taskController.getAllTasks)
route.post('/', taskController.create)
route.get('/:id', taskController.findTaskById)
route.put('/:id', taskController.update)
route.delete('/:id', taskController.deleteTask)
route.patch('/status/:id', taskController.changeTaskStatus)


export default route