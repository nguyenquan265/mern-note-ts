import { Router } from 'express'
import { getAuthenticatedUser, login, logout, signUp } from '~/controllers/users'

const router = Router()

router.get('/me', getAuthenticatedUser)
router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)

export default router
