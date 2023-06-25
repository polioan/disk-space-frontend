import cl from './VisuallyHidden.module.scss'

interface VisuallyHiddenProps {
  children: string
}

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ children }) => {
  return <span className={cl.visually_hidden}>{children}</span>
}
