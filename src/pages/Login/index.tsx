import cl from './Login.module.scss'
import { motion as m } from 'framer-motion'
import { Button, Input, Logo, PlainLink } from '../../ui'
import { uniqueToast } from '../../common/toast'
import { useAuthMutation, useRenderlessState } from '../../hooks'

interface LoginProps {
  isRegistration?: boolean | undefined
}

const Login: React.FC<LoginProps> = ({ isRegistration }) => {
  const [email, setInputEmail] = useRenderlessState('')
  const [password, setInputPassword] = useRenderlessState('')

  const authMutation = useAuthMutation({ isRegistration })

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    authMutation.mutate({ email: email(), password: password() })
  }

  function handleEmailInvalid(e: React.InvalidEvent<HTMLInputElement>) {
    e.preventDefault()
    uniqueToast('login-email-invalid', 'Неверный email!')
  }

  function handlePasswordInvalid(e: React.InvalidEvent<HTMLInputElement>) {
    e.preventDefault()
    uniqueToast(
      'login-password-invalid',
      'В пароле должно быть хотя бы 7 символов, но не больше 23'
    )
  }

  return (
    <m.main
      className={cl.container}
      initial={{ opacity: 0.1, transform: 'scale(0.1)' }}
      animate={{ opacity: 1, transform: 'scale(1)' }}
      transition={{ duration: 0.2 }}
      key={window.location.pathname}
    >
      <form className={cl.form} method='POST' onSubmit={onSubmit}>
        <Logo className={cl.logo} />
        <h3>{isRegistration ? 'Регистрация' : 'Авторизация'}</h3>
        <Input
          defaultValue={email()}
          onChange={e => setInputEmail(e.target.value)}
          required
          onInvalid={handleEmailInvalid}
          type='email'
          name='email'
          autoCorrect='off'
          autoCapitalize='off'
          autoComplete='email'
          placeholder='email'
          className={cl.input}
        />
        <Input
          defaultValue={password()}
          onChange={e => setInputPassword(e.target.value)}
          required
          onInvalid={handlePasswordInvalid}
          type='password'
          name='password'
          pattern='.{7,23}'
          autoCorrect='off'
          autoCapitalize='off'
          autoComplete='current-password'
          placeholder='пароль'
          className={cl.input}
        />
        <div className={cl.login_register_btns}>
          <PlainLink to={isRegistration ? '/login' : '/registration'}>
            {isRegistration ? 'Уже есть аккаунт?' : 'Создать аккаунт'}
          </PlainLink>
          <Button type='submit' isLoading={authMutation.isLoading}>
            Войти
          </Button>
        </div>
      </form>
    </m.main>
  )
}

export default Login
