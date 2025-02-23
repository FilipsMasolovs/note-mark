import React from 'react'
import { formatDate } from '@/utils/dateUtils'
import styles from '@/styles/components/SaveIndicator.module.scss'

interface SaveIndicatorProps {
	isSaving: boolean
	lastSaved: Date | null
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({ isSaving, lastSaved }) => {
	return (
		<div className={styles.saveIndicator}>
			{isSaving ? (
				<span className={styles.saving}>Saving...</span>
			) : lastSaved ? (
				<span className={styles.saved}>Last saved {formatDate(lastSaved)}</span>
			) : null}
		</div>
	)
}
