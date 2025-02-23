import React from 'react'
import { useNotification } from '@/contexts/NotificationContext'
import { exportNotes, importNotes } from '@/utils/exportImport'
import { Note } from '@/types'
import styles from '@/styles/components/ExportImport.module.scss'

interface ExportImportToolsProps {
	notes: Note[]
	onImport: (notes: Note[]) => void
}

export const ExportImportTools: React.FC<ExportImportToolsProps> = ({ notes, onImport }) => {
	const { showNotification } = useNotification()

	const handleExport = (format: 'json' | 'md') => {
		exportNotes(notes, format)
		showNotification(`Notes exported as ${format.toUpperCase()}`, 'success')
	}

	const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		const { notes: importedNotes, error } = await importNotes(file)

		if (error) {
			showNotification(`Import failed: ${error}`, 'error')
			return
		}

		onImport(importedNotes)
		showNotification('Notes imported successfully', 'success')
		event.target.value = ''
	}

	return (
		<div className={styles.tools}>
			<div className={styles.exportTools}>
				<button onClick={() => handleExport('json')}>Export as JSON</button>
				<button onClick={() => handleExport('md')}>Export as Markdown</button>
			</div>
			<div className={styles.importTools}>
				<input type='file' accept='.json,.md' onChange={handleImport} id='import-file' className={styles.fileInput} />
				<label htmlFor='import-file'>Import Notes</label>
			</div>
		</div>
	)
}
