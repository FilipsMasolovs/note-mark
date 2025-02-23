import React, { ChangeEvent } from 'react'

interface EditorProps {
	title: string
	content: string
	onTitleChange: (newTitle: string) => void
	onContentChange: (newContent: string) => void
	handleSaveNote: () => void
	calculatedHeight: string
}

const Editor: React.FC<EditorProps> = ({ title, content, onTitleChange, onContentChange, handleSaveNote, calculatedHeight }) => {
	return (
		<>
			<h2 className='heading'>Editor</h2>
			<div className='editor' style={{ height: calculatedHeight}}>
				<div className='noteTitle'>
					Note Title:{' '}
					<input
						type='text'
						value={title}
						placeholder='Note Title'
						onChange={(e: ChangeEvent<HTMLInputElement>) => onTitleChange(e.target.value)}
						className='noteTitleInput'
					/>
				</div>
				<textarea
					value={content}
					placeholder='Start writing your note...'
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onContentChange(e.target.value)}
					className='editingArea'
				/>
				<button onClick={handleSaveNote} className='saveNote'>
					SAVE NOTE
				</button>
			</div>
		</>
	)
}

export default Editor
