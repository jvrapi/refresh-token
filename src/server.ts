import 'express-async-errors'
import express from 'express'
import { ErrorMiddleware } from './middlewares/ErrorMiddleware'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(routes)
app.use(ErrorMiddleware)

app.listen(3000, () => console.log('🖥  Server is running on port 3000 🖥'))
