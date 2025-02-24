export const LOCAL_STORAGE_KEYS = {
	NOTES: 'notemark-notes',
	THEME: 'notemark-theme',
	SETTINGS: 'notemark-settings',
} as const

export const DEFAULT_NOTE = {
	title: 'Untitled',
	content: '',
} as const

export const FIRST_NOTE = {
	id: 'first-note',
	title: 'Welcome to NoteMark!',
	content: `This is your first note in NoteMark!
  
  Use **Markdown** to format your notes. Here are some examples:
  
  - **Bold text**
  - *Italic text*
  - [A link](https://example.com)
  
  Get started by editing or deleting this note, and then add your own!`,
	lastModified: Date.now(),
	tags: [],
}

export const BREAKPOINTS = {
	MOBILE: 768,
	TABLET: 1024,
} as const
