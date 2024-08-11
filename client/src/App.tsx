import 'bootstrap/dist/css/bootstrap.min.css'
import style from './style/NotesPage.module.css'
import { Container } from 'react-bootstrap'
import SignUpModal from './components/SignUpModal'
import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'
import NotesPageLoggedInView from './components/NotesPageLoggedInView'
import { useEffect, useState } from 'react'
import { User } from './models/user'
import * as NotesApi from './apis/notes_api'
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView'

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [signUpModalVisible, setSignUpModalVisible] = useState(false)
  const [loginModalVisible, setLoginModalVisible] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await NotesApi.fetchUser()

        setLoggedInUser(user)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser()
  }, [])

  return (
    <div>
      <Navbar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setLoginModalVisible(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
        onSignUpClicked={() => setSignUpModalVisible(true)}
      />
      <Container className={style.notesPage}>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </Container>

      {signUpModalVisible && (
        <SignUpModal
          onDismiss={() => setSignUpModalVisible(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user)
            setSignUpModalVisible(false)
          }}
        />
      )}

      {loginModalVisible && (
        <LoginModal
          onDismiss={() => setLoginModalVisible(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user)
            setLoginModalVisible(false)
          }}
        />
      )}
    </div>
  )
}

export default App
