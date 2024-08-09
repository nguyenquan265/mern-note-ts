import { NextFunction, Request, RequestHandler, Response } from 'express'
import createHttpError from 'http-errors'
import { iLoginBody, iSignUpBody } from '~/dtos/user.dto'
import UserModel from '~/models/user'
import catchAsync from '~/utils/catchAsync'
import bcrypt from 'bcryptjs'

export const getAuthenticatedUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId

    if (!userId) {
      throw createHttpError(401, 'Please login to access this resource')
    }

    const user = await UserModel.findById(userId)

    if (!user) {
      throw createHttpError(401, 'User not found')
    }

    res.status(200).json(user)
  }
)

export const signUp: RequestHandler = catchAsync(
  async (req: Request<unknown, unknown, iSignUpBody, unknown>, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      throw createHttpError(400, 'Please provide all required fields')
    }

    const [existingUser, existingEmail] = await Promise.all([
      UserModel.findOne({ username }).exec(),
      UserModel.findOne({ email }).exec()
    ])

    if (existingUser) {
      throw createHttpError(400, 'Username already taken')
    }

    if (existingEmail) {
      throw createHttpError(400, 'Email already taken')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await UserModel.create({ username, email, password: hashedPassword })

    req.session.userId = user._id

    res.status(200).json(user)
  }
)

export const login: RequestHandler = catchAsync(
  async (req: Request<unknown, unknown, iLoginBody, unknown>, res: Response, next: NextFunction) => {
    const { username, password } = req.body

    if (!username || !password) {
      throw createHttpError(400, 'Please provide all required fields')
    }

    const user = await UserModel.findOne({ username }).select('+password').exec()

    if (!user) {
      throw createHttpError(401, 'Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw createHttpError(401, 'Invalid credentials')
    }

    req.session.userId = user._id

    res.status(200).json(user)
  }
)

export const logout: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) {
      throw createHttpError(500, 'Something went wrong')
    }

    res.clearCookie('sid')

    res.status(200).json({ message: 'Logged out successfully' })
  })
})
