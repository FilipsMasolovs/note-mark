// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Note } from '../types'
import { LOCAL_STORAGE_KEYS, DEFAULT_NOTE } from '../constants'

interface NoteState {
	notes: Note[]
	selectedNoteId: string | null
	searchTerm: string
	isDarkMode: boolean
	addNote: () => void
	updateNote: (note: Note) => void
	deleteNote: (id: string) => void
	selectNote: (id: string) => void
	setSearchTerm: (term: string) => void
}

export const useNoteStore = create(
	persist<NoteState>(
		(set) => ({
			notes: [],
			selectedNoteId: null,
			searchTerm: '',
			isDarkMode: false,

			addNote: () => {
				const newNote: Note = {
					id: Date.now().toString(),
					title: DEFAULT_NOTE.title,
					content: DEFAULT_NOTE.content,
					lastModified: Date.now(),
					tags: DEFAULT_NOTE.tags,
				}
				set((state) => ({
					notes: [newNote, ...state.notes],
					selectedNoteId: newNote.id,
				}))
			},

			updateNote: (updatedNote) => {
				set((state) => ({
					notes: state.notes.map((note) => (note.id === updatedNote.id ? { ...updatedNote, lastModified: Date.now() } : note)),
				}))
			},

			deleteNote: (id) => {
				set((state) => {
					const newNotes = state.notes.filter((note) => note.id !== id)
					return {
						notes: newNotes,
						selectedNoteId: state.selectedNoteId === id ? (newNotes.length > 0 ? newNotes[0].id : null) : state.selectedNoteId,
					}
				})
			},

			selectNote: (id) => {
				set({ selectedNoteId: id })
			},

			setSearchTerm: (term) => {
				set({ searchTerm: term })
			},
		}),
		{
			name: LOCAL_STORAGE_KEYS.NOTES,
		}
	)
)
