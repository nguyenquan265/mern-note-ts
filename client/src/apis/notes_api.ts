import { Note } from '../models/note'
import { User } from '../models/user'

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return data
}

// Note
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

// User
export const fetchUser = async (): Promise<User> => {
  return fetchData('http://localhost:8000/api/v1/users/me', {
    credentials: 'include'
  })
}

export interface ISignUpCredentials {
  username: string
  email: string
  password: string
}

export const signUp = async (credentials: ISignUpCredentials): Promise<User> => {
  return fetchData('http://localhost:8000/api/v1/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
}

export interface ILoginCredentials {
  username: string
  password: string
}

export const login = async (credentials: ILoginCredentials): Promise<User> => {
  return fetchData('http://localhost:8000/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
}

export const logout = async (): Promise<void> => {
  return fetchData('http://localhost:8000/api/v1/users/logout', {
    method: 'POST',
    credentials: 'include'
  })
}
