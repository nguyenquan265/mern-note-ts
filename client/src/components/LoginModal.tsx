import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { ILoginCredentials, login } from '../apis/notes_api'
import { Button, Form, Modal } from 'react-bootstrap'
import TextInputField from './form/TextInputField'
import styleUtils from '../style/utils.module.css'

interface LoginModalProps {
  onDismiss: () => void
  onLoginSuccessful: (user: User) => void
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ILoginCredentials>()

  const onSubmit = async (data: ILoginCredentials) => {
    try {
      const user = await login(data)
      console.log(user)

      onLoginSuccessful(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='username'
            label='Username'
            type='text'
            placeholder='Enter your username'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.username}
          />
          <TextInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Enter your password'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />

          <Button type='submit' disabled={isSubmitting} className={styleUtils.width100}>
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
