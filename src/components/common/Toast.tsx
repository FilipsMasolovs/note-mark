import React, { useEffect } from 'react'
import { Portal } from './Portal'
import styles from '@/styles/components/Toast.module.scss'

interface ToastProps {
	message: string
	type?: 'success' | 'error' | 'info'
	duration?: number
	onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(onClose, duration)
		return () => clearTimeout(timer)
	}, [duration, onClose])

	return (
		<Portal containerId='toast-root'>
			<div className={`${styles.toast} ${styles[type]}`}>
				<span>{message}</span>
				<button onClick={onClose}>&times;</button>
			</div>
		</Portal>
	)
}
