import cl from './Button.module.scss'
import cn from 'classnames'
import { forwardRef } from 'react'
import { Spinner } from '../Spinner'

interface ButtonProps extends React.ComponentProps<'button'> {
  className?: string | undefined
  children?: React.ReactNode
  isLoading?: boolean | undefined
  hovered?: boolean | undefined
  focused?: boolean | undefined
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, isLoading, hovered, focused, ...otherProps } =
    props
  return (
    <button
      ref={ref}
      {...otherProps}
      className={cn(
        cl.button,
        className,
        hovered ? cl.hovered : '',
        focused ? cl.focused : ''
      )}
    >
      {isLoading ? <Spinner withBox /> : children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }
