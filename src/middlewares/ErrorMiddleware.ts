import { Request, Response, NextFunction } from 'express'

const ErrorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return response.status(500).json(error.message)
}

export { ErrorMiddleware }
