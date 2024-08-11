import express, { NextFunction, Request, Response } from 'express'
import router from './routes'
import morgan from 'morgan'
import errorMiddleware from './middlewares/error'
import createHttpError from 'http-errors'
import cors from 'cors'
import corsOptions from './config/cors'
import session from 'express-session'
import env from './config/env'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'

const app = express()

// Middlewares
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60
    },
    rolling: true,
    store: MongoStore.create({ mongoUrl: env.mongoUri })
  })
)
app.use(cookieParser())

// Routes
app.use('/api/v1', router)
app.use('/*', (req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, `Can't find ${req.originalUrl} on this server!`))
})
app.use(errorMiddleware)

export default app
