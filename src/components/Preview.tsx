import React from 'react'
import ReactMarkdown from 'react-markdown'

interface PreviewProps {
	content: string
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
	return (
		<>
			<h2 className='heading'>Preview</h2>
			<div className='preview'>
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
		</>
	)
}

export default Preview
