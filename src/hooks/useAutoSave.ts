import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash/debounce'

interface AutoSaveState {
	isSaving: boolean
	lastSaved: Date | null
}

export const useAutoSave = (value: unknown, onSave: () => void, delay: number = 1000) => {
	const [saveState, setSaveState] = useState<AutoSaveState>({
		isSaving: false,
		lastSaved: null,
	})
	const savedValue = useRef(value)

	const debouncedSave = debounce(async () => {
		if (value !== savedValue.current) {
			setSaveState({ ...saveState, isSaving: true })
			await onSave()
			savedValue.current = value
			setSaveState({
				isSaving: false,
				lastSaved: new Date(),
			})
		}
	}, delay)

	useEffect(() => {
		debouncedSave()
		return () => {
			debouncedSave.cancel()
		}
	}, [debouncedSave, value])

	return saveState
}
