import React from 'react'
import { useNoteStore } from '@/store/noteStore'

import styles from '../../styles/layout/Layout.module.scss'

interface LayoutProps {
	children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const isDarkMode = useNoteStore((state) => state.isDarkMode)

	return (
		<div className={`${styles.layoutContainer} ${isDarkMode ? styles.dark : styles.light}`}>
			<div className={styles.logo}>
				<svg width='100%' height='100%' viewBox='0 0 150 150' fill='none'>
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
			{children}
		</div>
	)
}
