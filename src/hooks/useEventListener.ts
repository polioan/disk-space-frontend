import { useEffect, useRef, useLayoutEffect } from 'react'

function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K | K[],
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: React.RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions
): void

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K | K[],
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void

function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventName: K | K[],
  handler: (event: HTMLElementEventMap[K]) => void,
  element: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions
): void

function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K | K[],
  handler: (event: DocumentEventMap[K]) => void,
  element: React.RefObject<Document>,
  options?: boolean | AddEventListenerOptions
): void

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | void = void
>(
  eventName: (KW | KH | KM) | (KW | KH | KM)[],
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event
  ) => void,
  element?: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions
) {
  const savedHandler = useRef(handler)

  useLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement: T | Window = element?.current ?? window

    if (!(targetElement && targetElement.addEventListener)) return

    const listener: typeof handler = event => savedHandler.current(event)

    const eventNames = Array.isArray(eventName) ? eventName : [eventName]

    eventNames.forEach(e => {
      targetElement.addEventListener(e, listener, options)
    })

    return () => {
      eventNames.forEach(e => {
        targetElement.removeEventListener(e, listener, options)
      })
    }
  }, [eventName, element, options])
}

export { useEventListener }
