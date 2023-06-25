import cl from './PlainLink.module.scss'
import cn from 'classnames'
import { forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

interface PlainLinkProps extends LinkProps {
  children?: React.ReactNode
  className?: string | undefined
}

const PlainLink = forwardRef<HTMLAnchorElement, PlainLinkProps>(
  (props, ref) => {
    const { className, children, to, ...otherProps } = props
    return (
      <Link
        to={to}
        ref={ref}
        className={cn(cl.link, className)}
        {...otherProps}
      >
        {children}
      </Link>
    )
  }
)

PlainLink.displayName = 'PlainLink'

export { PlainLink }
