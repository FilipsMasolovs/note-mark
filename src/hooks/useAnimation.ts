import { useEffect, useState } from 'react'

export const useAnimation = (initialState: boolean = false, duration: number = 300) => {
	const [isVisible, setIsVisible] = useState(initialState)
	const [isAnimating, setIsAnimating] = useState(false)

	useEffect(() => {
		let timeout: NodeJS.Timeout

		if (isVisible) {
			setIsAnimating(true)
		} else {
			timeout = setTimeout(() => {
				setIsAnimating(false)
			}, duration)
		}

		return () => clearTimeout(timeout)
	}, [isVisible, duration])

	return {
		isVisible,
		isAnimating,
		toggle: () => setIsVisible(!isVisible),
		show: () => setIsVisible(true),
		hide: () => setIsVisible(false),
	}
}
