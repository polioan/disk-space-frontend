import cl from './ContextMenu.module.scss'
import { AnimatePresence, motion as m } from 'framer-motion'
import {
  Root as ContextMenuRoot,
  Trigger as ContextMenuTrigger,
  Portal as ContextMenuPortal,
  Content as ContextMenuContent,
  Item as ContextMenuItem,
} from '@radix-ui/react-context-menu'
import { useState } from 'react'
import { useEventListener } from '../../hooks'

interface ContextMenuItemProps {
  element: React.ReactNode
  key: React.Key
  hidden?: boolean
}

interface ContextMenuProps {
  triggerElement: React.ReactElement
  items: ContextMenuItemProps[]
  busy?: boolean | undefined
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  triggerElement,
  items,
  busy,
}) => {
  const [open, setOpen] = useState(false)

  useEventListener(['resize', 'scroll'], () => setOpen(false))

  return (
    <ContextMenuRoot modal={false} onOpenChange={setOpen}>
      <ContextMenuTrigger
        asChild
        aria-haspopup='menu'
        aria-busy={busy ? true : undefined}
        aria-expanded={busy ? false : open}
      >
        {triggerElement}
      </ContextMenuTrigger>
      {!busy ? (
        <ContextMenuPortal forceMount>
          <>
            <AnimatePresence>
              {open ? (
                <ContextMenuContent className={cl.content} asChild>
                  <m.div
                    initial={{ opacity: 0.1, transform: 'scale(0.1)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0.1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {items
                      .filter(item => !item.hidden)
                      .map(item => {
                        return (
                          <ContextMenuItem
                            className={cl.item}
                            key={item.key}
                            asChild
                          >
                            {item.element}
                          </ContextMenuItem>
                        )
                      })}
                  </m.div>
                </ContextMenuContent>
              ) : null}
            </AnimatePresence>
          </>
        </ContextMenuPortal>
      ) : null}
    </ContextMenuRoot>
  )
}
