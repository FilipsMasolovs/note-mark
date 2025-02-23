import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { EditorProps } from '@/types'
import { useAutoSave } from '@/hooks/useAutoSave'
import { MarkdownToolbar } from './MarkdownToolbar'
import styles from '@/styles/components/Editor.module.scss'

export const Editor: React.FC<EditorProps> = ({ note, onUpdate }) => {
	const [title, setTitle] = useState(note.title)
	const [content, setContent] = useState(note.content)

	useEffect(() => {
		setTitle(note.title)
		setContent(note.content)
	}, [note.id])

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
	}

	const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value)
	}

	const handleSave = () => {
		onUpdate({ ...note, title, content, lastModified: Date.now() })
	}

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useAutoSave(JSON.stringify({ title, content }), handleSave)

	const handleToolbarAction = (action: string) => {
		if (!textareaRef.current) return
		const textarea = textareaRef.current
		const start = textarea.selectionStart
		const end = textarea.selectionEnd
		const selectedText = content.substring(start, end)

		let newText = ''
		switch (action) {
		case 'bold':
			newText = `**${selectedText}**`
			break
		case 'italic':
			newText = `*${selectedText}*`
			break
		case 'link':
			newText = `[${selectedText}](url)`
			break
		default:
			newText = selectedText
		}

		const newContent = content.substring(0, start) + newText + content.substring(end)
		setContent(newContent)
	}

	return (
		<div className={styles.editorContainer}>
			<div className={styles.editorHeader}>
				<input className={styles.titleInput} type='text' value={title} onChange={handleTitleChange} placeholder='Note Title' />
			</div>
			<MarkdownToolbar onAction={handleToolbarAction} />
			<textarea
				className={styles.contentInput}
				ref={textareaRef}
				value={content}
				onChange={handleContentChange}
				placeholder='Start writing your note...'
			/>
		</div>
	)
}
