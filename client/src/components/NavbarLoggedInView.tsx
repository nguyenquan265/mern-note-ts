import { User } from '../models/user'
import * as NotesApi from '../apis/notes_api'
import { Button, Navbar } from 'react-bootstrap'

interface NavbarLoggedInViewProps {
  user: User
  onLogoutSuccessful: () => void
}

const NavbarLoggedInView = ({ user, onLogoutSuccessful }: NavbarLoggedInViewProps) => {
  const logout = async () => {
    try {
      await NotesApi.logout()

      onLogoutSuccessful()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar.Text className='me-2'>Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Logout</Button>
    </>
  )
}

export default NavbarLoggedInView
