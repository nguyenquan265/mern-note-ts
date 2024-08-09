import style from '../style/Note.module.css'
import styleUtils from '../style/utils.module.css'
import { Card } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'
import { formatDate } from '../utils/formatDate'
import { MdDelete } from 'react-icons/md'

interface NoteProps {
  note: NoteModel
  onEditNoteClicked: (note: NoteModel) => void
  onDeleteNoteClicked: (note: NoteModel) => void
  className?: string
}

const Note = ({ note, onEditNoteClicked, onDeleteNoteClicked, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note
  let date: string

  if (updatedAt > createdAt) {
    date = 'Updated: ' + formatDate(updatedAt)
  } else {
    date = 'Created: ' + formatDate(createdAt)
  }

  return (
    <Card className={`${style.noteCard} ${className}`} onClick={() => onEditNoteClicked(note)}>
      <Card.Body className={style.cardBody}>
        <Card.Title className={`${styleUtils.flexCenter}`}>
          {title}
          <MdDelete
            className='text-muted ms-auto'
            onClick={(e) => {
              onDeleteNoteClicked(note)
              e.stopPropagation()
            }}
          />
        </Card.Title>
        <Card.Text className={style.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{date}</Card.Footer>
    </Card>
  )
}

export default Note
