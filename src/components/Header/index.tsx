import cl from './Header.module.scss'
import { Logo } from '../../ui'
import { useMeQuery } from '../../hooks'
import { UserIconButtonMenu } from './UserIconButtonMenu'

const EmailSpan: React.FC = () => {
  const { email } = useMeQuery()

  return <span translate='no'>{email}</span>
}

export const Header: React.FC = () => {
  return (
    <header className={cl.header}>
      <Logo className={cl.logo} />
      <div className={cl.user}>
        <EmailSpan />
        <UserIconButtonMenu />
      </div>
    </header>
  )
}
