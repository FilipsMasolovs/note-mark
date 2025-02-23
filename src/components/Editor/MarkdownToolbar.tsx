import React from 'react'

interface MarkdownToolbarProps {
	onAction: (action: string) => void
}

import styles from '@/styles/components/MarkdownToolbar.module.scss'
import { MARKDOWN_ACTIONS } from './MarkdownToolbarExtended'

export const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ onAction }) => {
	return (
		<div className={styles.toolbar}>
			{MARKDOWN_ACTIONS.map((action) => (
				<button
					key={action.action}
					onClick={() => onAction(action.action)}
					className={styles.toolbarButton}
					title={`${action.label}${action.shortcut ? ` (${action.shortcut})` : ''}`}
				>
					{action.icon}
				</button>
			))}
		</div>
	)
}
