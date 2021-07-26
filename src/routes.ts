import { Router } from 'express'
import { CreateUserController } from './useCases/createUser/CreateUserController'

const routes = Router()
const authenticateUserController = new CreateUserController()

routes.post('/users', authenticateUserController.handle)

export { routes }
