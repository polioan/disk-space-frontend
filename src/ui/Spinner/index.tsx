import cl from './Spinner.module.scss'
import cn from 'classnames'
import { VisuallyHidden } from '../VisuallyHidden'

interface SpinnerProps {
  className?: string | undefined
  withBox?: boolean | undefined
  text?: string | undefined
}

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  withBox,
  text,
}) => {
  const commonAttributes = {
    role: 'status',
    children: (
      <VisuallyHidden>
        {typeof text === 'string' ? text : 'Загрузка'}
      </VisuallyHidden>
    ),
  }

  if (withBox) {
    return (
      <div className={cn(cl.spinner_wrap, className)}>
        <div className={cl.spinner} {...commonAttributes}></div>
      </div>
    )
  }
  return <div className={cn(cl.spinner, className)} {...commonAttributes}></div>
}
