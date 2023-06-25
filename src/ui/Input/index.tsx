import cl from './Input.module.scss'
import { forwardRef } from 'react'
import cn from 'classnames'
import type { AutoComplete } from '../../types/autocomplete'

interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'autoComplete'> {
  className?: string | undefined
  autoComplete: AutoComplete | null
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, autoComplete, ...otherProps } = props
  return (
    <input
      ref={ref}
      {...otherProps}
      className={cn(cl.input, className)}
      autoComplete={autoComplete ?? undefined}
    />
  )
})

Input.displayName = 'Input'

export { Input }
