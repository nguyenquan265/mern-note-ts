import { Router } from 'express'
import { Request, Response } from 'express'
import noteRouter from './notes'
import userRouter from './users'

const router = Router()

router.get('/check', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Server is running' })
})
router.use('/notes', noteRouter)
router.use('/users', userRouter)

export default router
