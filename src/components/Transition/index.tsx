import cl from './Transition.module.scss'
import { Transition as HeadlessTransition } from '@headlessui/react'
import { Fragment } from 'react'

export const Transition: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <HeadlessTransition
      as={Fragment}
      enter={cl.transition_enter!}
      enterFrom={cl.transition_from!}
      enterTo={cl.transition_to!}
      leave={cl.transition_enter!}
      leaveFrom={cl.transition_to!}
      leaveTo={cl.transition_from!}
    >
      {children}
    </HeadlessTransition>
  )
}
