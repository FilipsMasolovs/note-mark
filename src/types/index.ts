export interface Note {
	id: string
	title: string
	content: string
	lastModified: number
	tags?: string[]
	category?: string
}

export interface EditorProps {
	note: Note
	onUpdate: (updatedNote: Note) => void
	isMobile: boolean
}

export interface NoteListProps {
	notes: Note[]
	selectedNoteId: string | null
	onSelectNote: (id: string) => void
	onDeleteNote: (id: string) => void
	searchTerm?: string
	onSearchChange?: (term: string) => void
}

export interface PreviewProps {
	content: string
	isDarkMode?: boolean
}
