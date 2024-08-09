import { NextFunction, Request, RequestHandler, Response } from 'express'
import createHttpError from 'http-errors'
import { ICreateNoteBody, IUpdateNoteBody, IUpdateNoteParams } from '~/dtos/note.dto'
import NoteModel from '~/models/note'
import catchAsync from '~/utils/catchAsync'

export const getNotes: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const notes = await NoteModel.find({}).exec()

  res.status(200).json(notes)
})

export const getSingleNote: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const note = await NoteModel.findById(req.params.noteId).exec()

  if (!note) {
    throw createHttpError(404, 'Note not found')
  }

  res.status(200).json(note)
})

export const createNote: RequestHandler = catchAsync(
  async (req: Request<unknown, unknown, ICreateNoteBody, unknown>, res: Response, next: NextFunction) => {
    const title = req.body.title
    const text = req.body.text

    if (!title) {
      throw createHttpError(400, 'Title is required')
    }

    const note = await NoteModel.create({ title, text })

    res.status(200).json(note)
  }
)

export const updateNote: RequestHandler = catchAsync(
  async (req: Request<IUpdateNoteParams, unknown, IUpdateNoteBody, unknown>, res: Response, next: NextFunction) => {
    const noteId = req.params.noteId
    const title = req.body.title
    const text = req.body.text

    if (!title) {
      throw createHttpError(400, 'Title is required')
    }

    const note = await NoteModel.findByIdAndUpdate(noteId, { title, text }, { new: true }).exec()

    if (!note) {
      throw createHttpError(404, 'Note not found')
    }

    res.status(200).json(note)
  }
)

export const deleteNote: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await NoteModel.findByIdAndDelete(req.params.noteId).exec()

  res.status(200).json({ message: 'Note deleted successfully' })
})
