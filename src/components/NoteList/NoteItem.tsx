import React from 'react'
import { Note } from '@/types'
import { formatDate } from '@/utils/dateUtils'
import styles from '@/styles/components/NoteItem.module.scss'

interface NoteItemProps {
	note: Note
	isSelected: boolean
	onSelect: (id: string) => void
	onDelete: (id: string) => void
	isMobile?: boolean
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, isSelected, onSelect, onDelete, isMobile }) => {
	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation()
		onDelete(note.id)
	}

	return (
		<li
			className={`
        ${styles.noteItem} 
        ${isSelected ? styles.selected : ''} 
        ${isMobile ? styles.mobile : ''}
      `}
			onClick={() => onSelect(note.id)}
		>
			<div className={styles.noteContent}>
				<h3 className={styles.noteTitle}>{note.title || 'Untitled'}</h3>
				<p className={styles.notePreview}>
					{note.content.slice(0, isMobile ? 30 : 50)}
					{note.content.length > (isMobile ? 30 : 50) ? '...' : ''}
				</p>
				<span className={styles.noteDate}>{formatDate(new Date(note.lastModified))}</span>
			</div>
			<button className={styles.deleteButton} onClick={handleDelete} aria-label='Delete note'>
				<svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
					{/* Your SVG code */}
				</svg>
			</button>
		</li>
	)
}
