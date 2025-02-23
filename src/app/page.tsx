'use client'

import React, { useEffect, useState } from 'react'

import NoteList from '../components/NoteList'
import Editor from '../components/Editor'
import Preview from '../components/Preview'

export interface Note {
	id: string
	title: string
	content: string
	lastModified: number
}

function isMobileDevice(): boolean {
	if (typeof window === 'undefined') {
		return false
	}

	const opera = (window as Window & { opera?: string }).opera ?? ''
	const userAgent: string = navigator.userAgent || navigator.vendor || opera
	const uaCheck: boolean = /android|iPad|iPhone|iPod|blackberry|iemobile|opera mini/i.test(userAgent)
	const mql: boolean = window.matchMedia('(max-width: 767px)').matches

	return uaCheck || mql
}

const Page: React.FC = () => {
	const [notes, setNotes] = useState<Note[]>([])
	const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
	const [currentTitle, setCurrentTitle] = useState<string>('')
	const [currentContent, setCurrentContent] = useState<string>('')
	const [isViewMode, setIsViewMode] = useState<boolean>(false)

	useEffect(() => {
		const savedNotes = localStorage.getItem('notes')
		if (savedNotes) {
			const parsedNotes: Note[] = JSON.parse(savedNotes)
			setNotes(parsedNotes)
			if (parsedNotes.length > 0) {
				setSelectedNoteId(parsedNotes[0].id)
				setCurrentTitle(parsedNotes[0].title)
				setCurrentContent(parsedNotes[0].content)
			}
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes))
	}, [notes])

	const handleAddNote = () => {
		const newNote: Note = {
			id: Date.now().toString(),
			title: 'Untitled',
			content: '',
			lastModified: Date.now(),
		}
		const updatedNotes = [newNote, ...notes]
		setNotes(updatedNotes)
		setSelectedNoteId(newNote.id)
		setCurrentTitle(newNote.title)
		setCurrentContent(newNote.content)
	}

	const handleSelectNote = (id: string) => {
		setSelectedNoteId(id)
		const note = notes.find((n) => n.id === id)
		if (note) {
			setCurrentTitle(note.title)
			setCurrentContent(note.content)
		}
	}

	const handleDeleteNote = (id: string) => {
		const updatedNotes = notes.filter((n) => n.id !== id)
		setNotes(updatedNotes)
		if (selectedNoteId === id) {
			if (updatedNotes.length > 0) {
				const firstNote = updatedNotes[0]
				setSelectedNoteId(firstNote.id)
				setCurrentTitle(firstNote.title)
				setCurrentContent(firstNote.content)
			} else {
				setSelectedNoteId(null)
				setCurrentTitle('')
				setCurrentContent('')
			}
		}
	}

	const handleSaveNote = () => {
		if (!selectedNoteId) {
			const newNote: Note = {
				id: Date.now().toString(),
				title: currentTitle || 'Untitled',
				content: currentContent,
				lastModified: Date.now(),
			}
			const updatedNotes = [newNote, ...notes]
			setNotes(updatedNotes)
			setSelectedNoteId(newNote.id)
		} else {
			const updatedNotes = notes.map((note) =>
				note.id === selectedNoteId
					? {
						...note,
						title: currentTitle,
						content: currentContent,
						lastModified: Date.now(),
					  }
					: note
			)
			setNotes(updatedNotes)
		}
	}

	return (
		<body className={`body ${isViewMode ? 'viewMode' : ''}`}>
			{isViewMode ? null : (
				<div className='logo'>
					<svg width='150' height='150' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<g clipPath='url(#clip0_4_2)'>
							<path
								d='M135 0H15C6.71573 0 0 6.71573 0 15V135C0 143.284 6.71573 150 15 150H135C143.284 150 150 143.284 150 135V15C150 6.71573 143.284 0 135 0Z'
								fill='#2B2B2B'
							/>
							<path d='M105 0H150V45L105 0Z' fill='#444444' />
							<path
								d='M62.6016 45.125V102H49.9062L28.4219 65.2422V102H15.6875V45.125H28.4219L49.9453 81.8828V45.125H62.6016ZM78.1094 45.125H88.6562L102.328 85.7891L115.961 45.125H126.508L106.586 102H98.0312L78.1094 45.125ZM72.0156 45.125H82.7578L84.75 87.2734V102H72.0156V45.125ZM121.859 45.125H132.641V102H119.867V87.2734L121.859 45.125Z'
								fill='white'
							/>
						</g>
						<defs>
							<clipPath id='clip0_4_2'>
								<rect width='150' height='150' fill='white' />
							</clipPath>
						</defs>
					</svg>
				</div>
			)}
			{isViewMode ? null : (
				<aside className='aside'>
					<NoteList
						notes={notes}
						selectedNoteId={selectedNoteId}
						onAddNote={handleAddNote}
						onSelectNote={handleSelectNote}
						onDeleteNote={handleDeleteNote}
					/>
				</aside>
			)}
			<main className='main'>
				{isViewMode ? null : (
					<Editor
						title={currentTitle}
						content={currentContent}
						onTitleChange={setCurrentTitle}
						onContentChange={setCurrentContent}
						handleSaveNote={handleSaveNote}
					/>
				)}
				{isViewMode || !isMobileDevice() ? <Preview content={currentContent} /> : null}
			</main>
			<button className='modeButton' onClick={() => setIsViewMode(!isViewMode)}>
				{isViewMode ? 'Editing Mode' : 'View Mode'}
			</button>
		</body>
	)
}

export default Page
