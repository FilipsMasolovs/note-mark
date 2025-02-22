import React from 'react'

import styles from '../globals.module.css'

export const metadata = {
	title: 'NoteMark',
	description: 'A Minimal Markdown Note-Taker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={styles.body}>
				{children}
			</body>
		</html>
	)
}
