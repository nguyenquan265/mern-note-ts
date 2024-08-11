import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { ISignUpCredentials, signUp } from '../apis/notes_api'
import { Button, Form, Modal } from 'react-bootstrap'
import TextInputField from './form/TextInputField'
import styleUtils from '../style/utils.module.css'

interface SignUpModalProps {
  onDismiss: () => void
  onSignUpSuccessful: (user: User) => void
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ISignUpCredentials>()

  const onSubmit = async (data: ISignUpCredentials) => {
    try {
      const user = await signUp(data)

      onSignUpSuccessful(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
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
            name='email'
            label='Email'
            type='email'
            placeholder='Enter your email'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.email}
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
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal
