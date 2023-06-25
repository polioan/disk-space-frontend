import cl from './UserIconButtonMenu.module.scss'
import { Button } from '../../ui'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { UserIcon } from '../../icons'
import { Popup } from '../Popup'

export const UserIconButtonMenu: React.FC = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  function onLeave() {
    window.localStorage.removeItem('token')
    queryClient.clear()
    navigate('/login')
  }

  return (
    <Popup
      className={cl.popup}
      triggerElement={
        <Button
          className={cl.btn}
          aria-label='Пользователь'
          title='Пользователь'
        >
          <UserIcon />
        </Button>
      }
      items={[
        {
          render: ({ active }) => (
            <Button focused={active} onClick={onLeave}>
              Выйти
            </Button>
          ),
          key: '1',
        },
      ]}
    />
  )
}
