import { forwardRef } from 'react'
import cl from './TextArea.module.scss'
import cn from 'classnames'

interface TextAreaProps extends React.ComponentProps<'textarea'> {
  className?: string | undefined
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { className, ...otherProps } = props
    return (
      <textarea
        ref={ref}
        {...otherProps}
        className={cn(cl.textarea, className)}
      ></textarea>
    )
  }
)

TextArea.displayName = 'TextArea'

export { TextArea }
