import { Router } from 'express'
import { createNote, deleteNote, getNotes, getSingleNote, updateNote } from '~/controllers/notes'

const router = Router()

router.get('/', getNotes)
router.post('/', createNote)
router.get('/:noteId', getSingleNote)
router.patch('/:noteId', updateNote)
router.delete('/:noteId', deleteNote)

export default router
