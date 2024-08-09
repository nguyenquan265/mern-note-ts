import mongoose from 'mongoose'
import 'express-session'

declare module 'express-session' {
  interface Session {
    userId: mongoose.Types.ObjectId
  }
}
