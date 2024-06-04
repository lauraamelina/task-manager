import express from 'express'
import * as statusController from '../controllers/status.api.controller.js'
import { authorization } from '../middlewares/auth.middleware.js'

const route = express.Router()

route.get('/', authorization, statusController.getAllStatus)
route.get('/:id', authorization, statusController.findStatusById)


export default route