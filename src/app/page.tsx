'use client'

import React, { useState, useCallback } from 'react'
import { Layout } from '@/components/Layout/Layout'
import { Editor } from '@/components/Editor/Editor'
import { Preview } from '@/components/Preview/Preview'
import { NoteList } from '@/components/NoteList/NoteList'
import { DeleteConfirmation } from '@/components/common/DeleteConfirmation'
import { SortingMenu, SortOption } from '@/components/common/SortingMenu'
import { useNoteStore } from '@/store/noteStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/constants'
import styles from '@/styles/pages/Home.module.scss'

const NotePage: React.FC = () => {
	const { notes, selectedNoteId, searchTerm, isDarkMode, addNote, updateNote, deleteNote, selectNote, setSearchTerm } = useNoteStore()

	const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE}px)`)
	const [isViewMode, setIsViewMode] = useState(false)
	const [showNoteList, setShowNoteList] = useState(!isMobile)
	const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null)
	const [sortOption, setSortOption] = useState<SortOption>('modified')

	const selectedNote = notes.find((note) => note.id === selectedNoteId)

	const handleDeleteConfirm = useCallback(() => {
		if (deleteNoteId) {
			deleteNote(deleteNoteId)
			setDeleteNoteId(null)
		}
	}, [deleteNoteId, deleteNote])

	const handleNoteSelect = useCallback(
		(id: string) => {
			selectNote(id)
			if (isMobile) {
				setShowNoteList(false)
			}
		},
		[isMobile, selectNote]
	)

	const sortedNotes = [...notes].sort((a, b) => {
		switch (sortOption) {
		case 'modified':
			return b.lastModified - a.lastModified
		case 'created':
			return parseInt(b.id) - parseInt(a.id)
		case 'alphabetical':
			return a.title.localeCompare(b.title)
		default:
			return 0
		}
	})

	return (
		<Layout>
			<div className={styles.pageContainer}>
				{(!isMobile || showNoteList) && (
					<aside className={styles.sidebar}>
						<SortingMenu currentSort={sortOption} onSortChange={setSortOption} />
						<NoteList
							notes={sortedNotes}
							selectedNoteId={selectedNoteId}
							onSelectNote={handleNoteSelect}
							onDeleteNote={(id) => setDeleteNoteId(id)}
							searchTerm={searchTerm}
							onSearchChange={setSearchTerm}
							isMobile={isMobile}
						/>
					</aside>
				)}

				<main className={styles.mainContent}>
					{!isViewMode && selectedNote && <Editor note={selectedNote} onUpdate={updateNote} isMobile={isMobile} />}
					{(!isMobile || isViewMode) && selectedNote && <Preview content={selectedNote.content} isDarkMode={isDarkMode} />}
					{!selectedNote && (
						<div className={styles.noNoteSelected}>
							<h2>Select a note or create a new one</h2>
						</div>
					)}
				</main>

				<div className={styles.floatingButtons}>
					<button className={styles.addNoteBtn} onClick={addNote} aria-label='Add new note'>
						<span>+</span>
					</button>
					{isMobile && (
						<button
							className={`${styles.toggleNotesBtn} ${showNoteList ? styles.active : ''}`}
							onClick={() => setShowNoteList(!showNoteList)}
							aria-label='Toggle notes list'
						>
							{showNoteList ? '📝' : '📋'}
						</button>
					)}
					<button
						className={`${styles.toggleViewBtn} ${isViewMode ? styles.active : ''}`}
						onClick={() => setIsViewMode(!isViewMode)}
						aria-label='Toggle view mode'
					>
						{isViewMode ? '✏️' : '👁️'}
					</button>
				</div>
			</div>

			<DeleteConfirmation
				isOpen={!!deleteNoteId}
				onConfirm={handleDeleteConfirm}
				onCancel={() => setDeleteNoteId(null)}
				noteName={notes.find((n) => n.id === deleteNoteId)?.title || 'Untitled'}
			/>
		</Layout>
	)
}

export default NotePage
