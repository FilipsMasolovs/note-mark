import { useEffect, useCallback } from 'react'

interface ShortcutConfig {
	key: string
	ctrl?: boolean
	shift?: boolean
	alt?: boolean
	action: () => void
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			shortcuts.forEach((shortcut) => {
				const ctrlMatch = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey
				const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey
				const altMatch = shortcut.alt ? event.altKey : !event.altKey
				const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()

				if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
					event.preventDefault()
					shortcut.action()
				}
			})
		},
		[shortcuts]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])
}
