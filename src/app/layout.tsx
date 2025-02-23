import React from 'react'

import '../globals.css'

export const metadata = {
	title: 'NoteMark',
	description: 'A Minimal Markdown Note-Taker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <html lang='en'>{children}</html>
}
