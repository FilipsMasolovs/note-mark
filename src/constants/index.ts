export const LOCAL_STORAGE_KEYS = {
	NOTES: 'notemark-notes',
	SETTINGS: 'notemark-settings',
} as const

export const DEFAULT_NOTE = {
	title: 'Untitled',
	content: '',
	tags: [],
} as const

export const BREAKPOINTS = {
	MOBILE: 768,
	TABLET: 1024,
} as const
