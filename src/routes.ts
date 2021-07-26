import { Router } from 'express'
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from './useCases/createUser/CreateUserController'

const routes = Router()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

routes.post('/users', createUserController.handle)
routes.post('/login', authenticateUserController.handle)

export { routes }
