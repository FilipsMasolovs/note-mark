import React from 'react'
import styles from '@/styles/components/SortingMenu.module.scss'

export type SortOption = 'modified' | 'created' | 'alphabetical'

interface SortingMenuProps {
	currentSort: SortOption
	onSortChange: (option: SortOption) => void
}

export const SortingMenu: React.FC<SortingMenuProps> = ({ currentSort, onSortChange }) => {
	return (
		<div className={styles.sortingMenu}>
			<select value={currentSort} onChange={(e) => onSortChange(e.target.value as SortOption)} className={styles.select}>
				<option value='modified' className={styles.selectOption}>
					Last Modified
				</option>
				<option value='created' className={styles.selectOption}>
					Date Created
				</option>
				<option value='alphabetical' className={styles.selectOption}>
					Alphabetical
				</option>
			</select>
		</div>
	)
}
