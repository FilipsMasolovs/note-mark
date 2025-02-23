import React from 'react'
import styles from '@/styles/components/SearchBar.module.scss'

interface SearchBarProps {
	value: string
	onChange?: (term: string) => void
	isMobile?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, isMobile }) => {
	return (
		<div className={`${styles.searchContainer} ${isMobile ? styles.mobile : ''}`}>
			<input type='text' value={value} onChange={(e) => onChange?.(e.target.value)} placeholder='Search notes...' className={styles.searchInput} />
			<span className={styles.searchIcon}>🔍</span>
		</div>
	)
}
