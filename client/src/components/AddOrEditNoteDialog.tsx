import { Button, Form, Modal } from 'react-bootstrap'
import { Note } from '../models/note'
import { useForm } from 'react-hook-form'
import { INoteInput, createNote, updateNote } from '../apis/notes_api'

interface AddOrEditNoteDialogProps {
  noteToEdit?: Note | null
  onDismiss: () => void
  onNoteSaved: (note: Note) => void
}

const AddOrEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddOrEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<INoteInput>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || ''
    }
  })

  const onSubmit = async (input: INoteInput) => {
    try {
      let data: Note

      if (noteToEdit) {
        data = await updateNote(noteToEdit._id, input)
      } else {
        data = await createNote(input)
      }

      onNoteSaved(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title>{noteToEdit ? 'Edit note' : 'Add note'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='addOrEditNoteForm' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Title'
              isInvalid={!!errors.title}
              {...register('title', { required: 'Required' })}
            />
            <Form.Control.Feedback type='invalid'>{errors.title?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Text</Form.Label>
            <Form.Control as='textarea' rows={5} placeholder='Text' {...register('text')} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type='submit' form='addOrEditNoteForm' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddOrEditNoteDialog
