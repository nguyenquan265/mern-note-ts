import { Note } from '../models/note'

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return data
}

export const fetchNotes = async (): Promise<Note[]> => {
  return fetchData('http://localhost:8000/api/v1/notes')
}

export const fetchNote = async (id: string): Promise<Note> => {
  return fetchData(`http://localhost:8000/api/v1/notes/${id}`)
}

export interface INoteInput {
  title: string
  text?: string
}

export const createNote = async (note: INoteInput): Promise<Note> => {
  return fetchData('http://localhost:8000/api/v1/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
}

export const updateNote = async (id: string, note: INoteInput): Promise<Note> => {
  return fetchData(`http://localhost:8000/api/v1/notes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
}

export const deleteNote = async (id: string): Promise<void> => {
  return fetchData(`http://localhost:8000/api/v1/notes/${id}`, {
    method: 'DELETE'
  })
}
