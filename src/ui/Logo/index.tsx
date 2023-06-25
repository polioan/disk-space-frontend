import cl from './Logo.module.scss'
import { Link } from 'react-router-dom'
import cn from 'classnames'

interface LogoProps {
  className?: string | undefined
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link
      to='/'
      aria-label='Disk space!'
      title='Disk space!'
      className={cn(className, cl.link)}
    >
      <img
        src='logo.png'
        alt='Лого'
        decoding='async'
        draggable={false}
        className={cl.img}
      />
    </Link>
  )
}
