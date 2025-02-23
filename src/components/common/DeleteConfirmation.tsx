import React, { useEffect } from 'react'
import { Portal } from './Portal'
import styles from '@/styles/components/DeleteConfirmation.module.scss'

interface DeleteConfirmationProps {
	isOpen: boolean
	onConfirm: () => void
	onCancel: () => void
	noteName: string
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ isOpen, onConfirm, onCancel, noteName }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<Portal>
			<div
				className={styles.overlay}
				onClick={(e) => {
					if (e.target === e.currentTarget) onCancel()
				}}
			>
				<div className={styles.modal}>
					<h3>Delete Note</h3>
					<p>Are you sure you want to delete &quot;{noteName}&quot;?</p>
					<p className={styles.warning}>This action cannot be undone.</p>
					<div className={styles.buttons}>
						<button className={styles.cancelButton} onClick={onCancel} autoFocus>
							Cancel
						</button>
						<button className={styles.deleteButton} onClick={onConfirm}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</Portal>
	)
}
