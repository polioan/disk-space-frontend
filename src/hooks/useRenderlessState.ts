import { useRef } from 'react'

function isFunction(payload: unknown): payload is (...args: any) => any {
  return typeof payload === 'function'
}

export function useRenderlessState<T>(initialValue: T | (() => T)) {
  const valueRef = useRef(
    isFunction(initialValue) ? initialValue() : initialValue
  )

  function get() {
    return valueRef.current
  }

  function set(value: T | ((value: T) => T)) {
    valueRef.current = isFunction(value) ? value(valueRef.current) : value
  }

  return [get, set] as const
}
