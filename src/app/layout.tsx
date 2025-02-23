import { NotificationProvider } from '@/contexts/NotificationContext'
import '@/styles/globals.scss'

export const metadata = {
	title: 'NoteMark',
	description: 'A Modern Markdown Note-Taking App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<NotificationProvider>{children}</NotificationProvider>
			</body>
		</html>
	)
}
