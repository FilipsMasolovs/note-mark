export const formatDate = (date: Date): string => {
	const now = new Date()
	const diff = now.getTime() - date.getTime()
	const seconds = Math.floor(diff / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)

	if (days > 7) {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	} else if (days > 0) {
		return `${days} day${days > 1 ? 's' : ''} ago`
	} else if (hours > 0) {
		return `${hours} hour${hours > 1 ? 's' : ''} ago`
	} else if (minutes > 0) {
		return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
	} else {
		return 'Just now'
	}
}

export const sortByDate = (a: number, b: number): number => {
	return b - a
}

export const isToday = (date: Date): boolean => {
	const today = new Date()
	return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}

export const isYesterday = (date: Date): boolean => {
	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)
	return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()
}

export const getRelativeDate = (date: Date): string => {
	if (isToday(date)) {
		return 'Today'
	} else if (isYesterday(date)) {
		return 'Yesterday'
	} else {
		return formatDate(date)
	}
}
