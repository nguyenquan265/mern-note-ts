import 'bootstrap/dist/css/bootstrap.min.css'
import style from './style/NotesPage.module.css'
import styleUtils from './style/utils.module.css'
import { useEffect, useState } from 'react'
import { Note as NoteModel } from './models/note'
import Note from './components/Note'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import * as NotesApi from './apis/notes_api'
import AddOrEditNoteDialog from './components/AddOrEditNoteDialog'
import { FaPlus } from 'react-icons/fa'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [notesLoading, setNotesLoading] = useState(true)
  const [notesError, setNotesError] = useState('')
  const [showAddOrEditNoteDialog, setShowAddOrEditNoteDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id)

      setNotes(notes.filter((n) => n._id !== note._id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setNotesLoading(true)
        setNotesError('')

        const data = await NotesApi.fetchNotes()

        setNotes(data)
      } catch (error) {
        console.log(error)
        setNotesError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setNotesLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <Container className={style.notesPage}>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddOrEditNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>

      {notesLoading ? (
        <Spinner animation='border' variant='primary' />
      ) : notesError ? (
        <p>{notesError}</p>
      ) : notes.length === 0 ? (
        <p>You don't have any notes</p>
      ) : (
        <Row xs={1} md={2} xl={3} className={`g-4 ${style.noteGrid}`}>
          {notes.map((note, index) => (
            <Col key={index}>
              <Note
                note={note}
                onEditNoteClicked={() => {
                  setShowAddOrEditNoteDialog(true)
                  setNoteToEdit(note)
                }}
                onDeleteNoteClicked={deleteNote}
                className={style.note}
              />
            </Col>
          ))}
        </Row>
      )}

      {showAddOrEditNoteDialog && !noteToEdit && (
        <AddOrEditNoteDialog
          onDismiss={() => setShowAddOrEditNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddOrEditNoteDialog(false)
          }}
        />
      )}

      {showAddOrEditNoteDialog && noteToEdit && (
        <AddOrEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setShowAddOrEditNoteDialog(false)}
          onNoteSaved={(updatedNote) => {
            const newNotes = notes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
            setNotes(newNotes)
            setShowAddOrEditNoteDialog(false)
            setNoteToEdit(null)
          }}
        />
      )}
    </Container>
  )
}

export default App
