import 'dotenv/config'

export default {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI!
}
