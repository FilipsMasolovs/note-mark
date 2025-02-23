import React from 'react'
import styles from '@/styles/components/EmptyState.module.scss'

interface EmptyStateProps {
	message: string
	subMessage?: string
	icon?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, subMessage, icon = '📝' }) => {
	return (
		<div className={styles.emptyState}>
			<span className={styles.icon}>{icon}</span>
			<h3 className={styles.message}>{message}</h3>
			{subMessage && <p className={styles.subMessage}>{subMessage}</p>}
		</div>
	)
}
