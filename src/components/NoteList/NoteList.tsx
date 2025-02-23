import React from 'react'
import { Note } from '@/types'
import { NoteItem } from './NoteItem'
import { SearchBar } from './SearchBar'
import { EmptyState } from '../common/EmptyState'
import styles from '@/styles/components/NoteList.module.scss'

interface NoteListProps {
	notes: Note[]
	selectedNoteId: string | null
	onSelectNote: (id: string) => void
	onDeleteNote: (id: string) => void
	searchTerm: string
	onSearchChange: (term: string) => void
	isMobile?: boolean
	onNoteSelect?: () => void
}

export const NoteList: React.FC<NoteListProps> = ({
	notes,
	selectedNoteId,
	onSelectNote,
	onDeleteNote,
	searchTerm,
	onSearchChange,
	isMobile,
	onNoteSelect,
}) => {
	const handleNoteSelect = (id: string) => {
		onSelectNote(id)
		if (isMobile && onNoteSelect) {
			onNoteSelect()
		}
	}

	return (
		<div className={styles.noteListContainer}>
			<SearchBar value={searchTerm} onChange={onSearchChange} isMobile={isMobile} />
			{notes.length === 0 ? (
				<EmptyState message='No notes yet' subMessage='Create your first note!' />
			) : (
				<ul className={styles.notesList}>
					{notes.map((note) => (
						<NoteItem
							key={note.id}
							note={note}
							isSelected={note.id === selectedNoteId}
							onSelect={() => handleNoteSelect(note.id)}
							onDelete={onDeleteNote}
							isMobile={isMobile}
						/>
					))}
				</ul>
			)}
		</div>
	)
}
