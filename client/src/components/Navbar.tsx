import { Container, Nav, Navbar as NavbarComp } from 'react-bootstrap'
import { User } from '../models/user'
import NavbarLoggedInView from './NavbarLoggedInView'
import NavbarLoggedOutView from './NavbarLoggedOutView'

interface NavbarProps {
  loggedInUser: User | null
  onSignUpClicked: () => void
  onLoginClicked: () => void
  onLogoutSuccessful: () => void
}

const Navbar = ({ loggedInUser, onLoginClicked, onLogoutSuccessful, onSignUpClicked }: NavbarProps) => {
  return (
    <NavbarComp bg='primary' variant='dark' expand='lg' sticky='top'>
      <Container>
        <NavbarComp.Brand>Notes App</NavbarComp.Brand>
        <NavbarComp.Toggle aria-controls='main-navbar' />
        <NavbarComp.Collapse id='main-navbar'>
          <Nav className='ms-auto'>
            {loggedInUser ? (
              <NavbarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
            ) : (
              <NavbarLoggedOutView onSignUpClicked={onSignUpClicked} onLoginClicked={onLoginClicked} />
            )}
          </Nav>
        </NavbarComp.Collapse>
      </Container>
    </NavbarComp>
  )
}

export default Navbar
