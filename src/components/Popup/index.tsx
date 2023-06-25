import cl from './Popup.module.scss'
import cn from 'classnames'
import { Menu } from '@headlessui/react'
import { Transition } from '../Transition'
import { Fragment } from 'react'

interface ItemRenderPropArg {
  active: boolean
  disabled: boolean
  close: () => void
}

interface PopupItemProps {
  render: React.ReactNode | ((props: ItemRenderPropArg) => React.ReactElement)
  key: React.Key
  hidden?: boolean
}

interface PopupProps {
  triggerElement: React.ReactNode
  items: PopupItemProps[]
  className?: string | undefined
}

export const Popup: React.FC<PopupProps> = ({
  triggerElement,
  items,
  className,
}) => {
  return (
    <Menu as='div' className={cn(cl.menu, className)}>
      <Menu.Button as={Fragment}>{triggerElement}</Menu.Button>
      <Transition>
        <Menu.Items className={cl.popup}>
          {items
            .filter(item => !item.hidden)
            .map(item => {
              return <Menu.Item key={item.key}>{item.render}</Menu.Item>
            })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
