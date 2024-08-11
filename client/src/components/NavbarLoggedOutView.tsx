import { Button } from 'react-bootstrap'

interface NavbarLoggedOutViewProps {
  onSignUpClicked: () => void
  onLoginClicked: () => void
}

const NavbarLoggedOutView = ({ onLoginClicked, onSignUpClicked }: NavbarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign up</Button>
      <Button onClick={onLoginClicked}>Login</Button>
    </>
  )
}

export default NavbarLoggedOutView
