import createHttpError from 'http-errors'
import cors from 'cors'
import { WHITELIST_DOMAINS } from '../utils/constants'

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (WHITELIST_DOMAINS.includes(origin as string)) {
      return callback(null, true)
    }

    return callback(createHttpError(403, `${origin} not allowed by our CORS Policy.`))
  },

  optionsSuccessStatus: 200,
  credentials: true
}

export default corsOptions
