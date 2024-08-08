export interface ICreateNoteBody {
  title?: string
  text?: string
}

export interface IUpdateNoteBody {
  title?: string
  text?: string
}

export interface IUpdateNoteParams {
  noteId: string
}
