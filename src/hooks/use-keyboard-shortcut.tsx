import { useEffect } from 'react'

export function useKeyboardShortcut(key: string, callback: () => void, options?: {
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
  alt?: boolean
}) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      // Check if the key matches
      const keyMatch = event.key.toLowerCase() === key.toLowerCase()
      
      // Check modifiers
      const ctrlMatch = options?.ctrl ? event.ctrlKey : !event.ctrlKey
      const metaMatch = options?.meta ? event.metaKey : !event.metaKey
      const shiftMatch = options?.shift ? event.shiftKey : !event.shiftKey
      const altMatch = options?.alt ? event.altKey : !event.altKey
      
      // For Cmd+K / Ctrl+K shortcut, we want either Ctrl or Meta
      if (options?.ctrl && options?.meta) {
        if (keyMatch && (event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey) {
          event.preventDefault()
          callback()
        }
        return
      }
      
      if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
        event.preventDefault()
        callback()
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [key, callback, options])
}

