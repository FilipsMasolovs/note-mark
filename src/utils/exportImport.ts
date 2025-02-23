// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Note } from '@/types'

export const exportNotes = (notes: Note[], format: 'json' | 'md' = 'json') => {
	switch (format) {
	case 'json':
		const jsonData = JSON.stringify(notes, null, 2)
		downloadFile(jsonData, 'notes.json', 'application/json')
		break
	case 'md':
		const markdownData = notes
			.map((note) => `# ${note.title}\n\n${note.content}\n\n---\n\nLast modified: ${new Date(note.lastModified).toLocaleString()}\n\n`)
			.join('\n')
		downloadFile(markdownData, 'notes.md', 'text/markdown')
		break
	}
}

export const importNotes = async (file: File): Promise<{ notes: Note[]; error?: string }> => {
	try {
		const content = await file.text()

		if (file.name.endsWith('.json')) {
			const notes = JSON.parse(content)
			if (!Array.isArray(notes)) {
				throw new Error('Invalid JSON format')
			}
			return { notes }
		}

		if (file.name.endsWith('.md')) {
			const notes = parseMdToNotes(content)
			return { notes }
		}

		throw new Error('Unsupported file format')
	} catch (error) {
		return { notes: [], error: error.message }
	}
}

const downloadFile = (content: string, filename: string, contentType: string) => {
	const blob = new Blob([content], { type: contentType })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = filename
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}

const parseMdToNotes = (content: string): Note[] => {
	const noteBlocks = content.split('\n---\n')
	return noteBlocks
		.map((block) => {
			const titleMatch = block.match(/^# (.*)/)
			if (!titleMatch) return null

			const title = titleMatch[1]
			const contentStart = block.indexOf('\n\n') + 2
			const contentEnd = block.lastIndexOf('\n\nLast modified:')
			const content = contentEnd > contentStart ? block.slice(contentStart, contentEnd) : block.slice(contentStart)

			return {
				id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
				title,
				content,
				lastModified: Date.now(),
			}
		})
		.filter((note): note is Note => note !== null)
}
