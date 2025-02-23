/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
// @ts-nocheck

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { PreviewProps } from '@/types'

import styles from '@/styles/components/Preview.module.scss'

export const Preview: React.FC<PreviewProps> = ({ content, isDarkMode }) => {
	return (
		<div className={`${styles.previewContainer} ${isDarkMode ? styles.dark : styles.light}`}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					code({ node, inline, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || '')
						return !inline && match ? (
							<SyntaxHighlighter style={tomorrow} language={match[1]} PreTag='div' {...props}>
								{String(children).replace(/\n$/, '')}
							</SyntaxHighlighter>
						) : (
							<code className={className} {...props}>
								{children}
							</code>
						)
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	)
}
