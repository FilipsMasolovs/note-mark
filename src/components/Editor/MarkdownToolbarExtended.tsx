import React from 'react'
import styles from '@/styles/components/MarkdownToolbar.module.scss'

interface MarkdownAction {
	icon: string
	label: string
	action: string
	shortcut?: string
}

export const MARKDOWN_ACTIONS: MarkdownAction[] = [
	{ icon: '𝐁', label: 'Bold', action: 'bold', shortcut: 'Ctrl+B' },
	{ icon: '𝐼', label: 'Italic', action: 'italic', shortcut: 'Ctrl+I' },
	{ icon: '🔗', label: 'Link', action: 'link', shortcut: 'Ctrl+K' },
	{ icon: '# ', label: 'Heading', action: 'heading' },
	{ icon: '•', label: 'Bullet List', action: 'bullet-list' },
	{ icon: '1.', label: 'Numbered List', action: 'numbered-list' },
	{ icon: '```', label: 'Code Block', action: 'code-block' },
	{ icon: '📝', label: 'Task List', action: 'task-list' },
	{ icon: '│', label: 'Table', action: 'table' },
]

interface MarkdownToolbarProps {
	onAction: (action: string) => void
}

export const MarkdownToolbarExtended: React.FC<MarkdownToolbarProps> = ({ onAction }) => {
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
