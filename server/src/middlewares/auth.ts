import catchAsync from '~/utils/catchAsync'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import createHttpError from 'http-errors'
import UserModel from '~/models/user'

export const authenticate: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.session.userId

  if (!userId) {
    throw createHttpError(401, 'Please login to access this resource')
  }

  const user = await UserModel.findById(userId).exec()

  if (!user) {
    throw createHttpError(401, 'User not found')
  }

  next()
})
