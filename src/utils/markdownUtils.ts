export const applyMarkdownFormat = (content: string, action: string, selection: { start: number; end: number }): string => {
	const selectedText = content.slice(selection.start, selection.end)
	let replacement = ''

	switch (action) {
	case 'bold':
		replacement = `**${selectedText}**`
		break
	case 'italic':
		replacement = `*${selectedText}*`
		break
	case 'link':
		replacement = `[${selectedText}](url)`
		break
	case 'heading':
		replacement = `# ${selectedText}`
		break
	case 'bullet-list':
		replacement = selectedText
			.split('\n')
			.map((line) => `- ${line}`)
			.join('\n')
		break
	case 'numbered-list':
		replacement = selectedText
			.split('\n')
			.map((line, i) => `${i + 1}. ${line}`)
			.join('\n')
		break
	case 'code-block':
		replacement = `\`\`\`\n${selectedText}\n\`\`\``
		break
	case 'task-list':
		replacement = selectedText
			.split('\n')
			.map((line) => `- [ ] ${line}`)
			.join('\n')
		break
	case 'table':
		replacement = '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |'
		break
	default:
		replacement = selectedText
	}

	return content.slice(0, selection.start) + replacement + content.slice(selection.end)
}
