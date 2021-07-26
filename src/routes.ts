import { Router } from 'express'
import { EnsureAuthenticated } from './middlewares/EnsureAuthenticated'
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from './useCases/createUser/CreateUserController'
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController'

const routes = Router()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()

routes.post('/users', createUserController.handle)
routes.post('/login', authenticateUserController.handle)
routes.post('/refresh-token', refreshTokenUserController.handle)

routes.get('/courses', EnsureAuthenticated, (request, response) => {
  const courses = [
    { id: 1, name: 'NodeJs' },
    { id: 2, name: 'ReactJs' },
    { id: 3, name: 'React Native' },
    { id: 4, name: 'Flutter' },
    { id: 5, name: 'Elixir' }
  ]
  return response.json(courses)
})

export { routes }
