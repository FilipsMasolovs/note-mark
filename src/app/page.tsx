'use client'

import React, { useEffect, useRef, useState } from 'react'

import NoteList from '../components/NoteList'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import MobileNoteList from '@/components/MobileNoteList'

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
	const [showNotes, setShowNotes] = useState<boolean>(!isMobileDevice())

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
		setShowNotes(false)
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

	const handleShowNotes = () => {
		setShowNotes(!showNotes)
	}

	const asside = useRef<HTMLDivElement>(null)
	const main = useRef<HTMLDivElement>(null)
	const modeButton = useRef<HTMLButtonElement>(null)

	const calculatedHeight = isMobileDevice() ? `${window.innerHeight - 224}px` : '15%'

	return (
		<body className={`body ${isViewMode ? 'viewMode' : ''}`}>
			{isViewMode ? null : (
				<button onClick={handleAddNote} className='createNewNote'>
					<svg width='48' height='48' viewBox='0 0 24 24' fill='none'>
						<path d='M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15' stroke='#0070f3' strokeWidth='1.5' strokeLinecap='round' />
						<path
							d='M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7'
							stroke='#0070f3'
							strokeWidth='1.5'
							strokeLinecap='round'
						/>
					</svg>
				</button>
			)}
			{isMobileDevice() && !isViewMode && (
				<button onClick={handleShowNotes} className='showNotesList'>
					<svg width='48' height='48' viewBox='0 0 24 24' fill='none'>
						<path
							d='M19.5617 7C19.7904 5.69523 18.7863 4.5 17.4617 4.5H6.53788C5.21323 4.5 4.20922 5.69523 4.43784 7'
							stroke='#0070f3'
							strokeWidth='1.5'
						/>
						<path
							d='M17.4999 4.5C17.5283 4.24092 17.5425 4.11135 17.5427 4.00435C17.545 2.98072 16.7739 2.12064 15.7561 2.01142C15.6497 2 15.5194 2 15.2588 2H8.74099C8.48035 2 8.35002 2 8.24362 2.01142C7.22584 2.12064 6.45481 2.98072 6.45704 4.00434C6.45727 4.11135 6.47146 4.2409 6.49983 4.5'
							stroke='#0070f3'
							strokeWidth='1.5'
						/>
						<path d='M15 18H9' stroke='#0070f3' strokeWidth='1.5' strokeLinecap='round' />
						<path
							d='M2.38351 13.793C1.93748 10.6294 1.71447 9.04765 2.66232 8.02383C3.61017 7 5.29758 7 8.67239 7H15.3276C18.7024 7 20.3898 7 21.3377 8.02383C22.2855 9.04765 22.0625 10.6294 21.6165 13.793L21.1935 16.793C20.8437 19.2739 20.6689 20.5143 19.7717 21.2572C18.8745 22 17.5512 22 14.9046 22H9.09536C6.44881 22 5.12553 22 4.22834 21.2572C3.33115 20.5143 3.15626 19.2739 2.80648 16.793L2.38351 13.793Z'
							stroke='#0070f3'
							strokeWidth='1.5'
						/>
					</svg>
				</button>
			)}
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
				<aside ref={asside} className='aside'>
					{isMobileDevice() ? (
						showNotes ? (
							<MobileNoteList notes={notes} selectedNoteId={selectedNoteId} onSelectNote={handleSelectNote} onDeleteNote={handleDeleteNote} />
						) : null
					) : (
						<NoteList notes={notes} selectedNoteId={selectedNoteId} onSelectNote={handleSelectNote} onDeleteNote={handleDeleteNote} />
					)}
				</aside>
			)}
			{((isMobileDevice() && !showNotes) || !isMobileDevice()) && (
				<main ref={main} className='main'>
					{isViewMode ? null : (
						<Editor
							title={currentTitle}
							content={currentContent}
							onTitleChange={setCurrentTitle}
							onContentChange={setCurrentContent}
							handleSaveNote={handleSaveNote}
							calculatedHeight={calculatedHeight}
						/>
					)}
					{isViewMode || !isMobileDevice() ? <Preview content={currentContent} /> : null}
				</main>
			)}
			<button ref={modeButton} className='modeButton' onClick={() => setIsViewMode(!isViewMode)}>
				{isViewMode ? 'Editing Mode' : 'View Mode'}
			</button>
		</body>
	)
}

export default Page
