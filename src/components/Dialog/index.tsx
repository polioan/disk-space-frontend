import cl from './Dialog.module.scss'
import { Dialog as HeadlessDialog } from '@headlessui/react'
import { AnimatePresence, motion as m } from 'framer-motion'

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string | undefined
  children?: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {open ? (
        <HeadlessDialog open={open} onClose={onClose}>
          <div className={cl.dialog}>
            <HeadlessDialog.Panel>
              <m.div
                initial={{ opacity: 0.1, transform: 'scale(0.1)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0.1)' }}
                transition={{ duration: 0.2 }}
                className={cl.dialog_panel}
              >
                {title ? (
                  <HeadlessDialog.Title className={cl.title}>
                    {title}
                  </HeadlessDialog.Title>
                ) : null}
                {children}
              </m.div>
            </HeadlessDialog.Panel>
          </div>
        </HeadlessDialog>
      ) : null}
    </AnimatePresence>
  )
}
