import { Router } from 'express'
import { NextFunction, Request, Response } from 'express'
import noteRouter from './notes'

const router = Router()

router.get('/check', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Server is running' })
})
router.use('/notes', noteRouter)

export default router
