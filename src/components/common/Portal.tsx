import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
	children: React.ReactNode
	containerId?: string
}

export const Portal: React.FC<PortalProps> = ({ children, containerId = 'portal-root' }) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		return () => setMounted(false)
	}, [])

	if (!mounted) return null

	let container = document.getElementById(containerId)
	if (!container) {
		container = document.createElement('div')
		container.id = containerId
		document.body.appendChild(container)
	}

	return createPortal(children, container)
}
