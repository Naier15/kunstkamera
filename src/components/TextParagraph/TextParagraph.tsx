import React from 'react'

type Props = {
	text: string
	style: string
	activateEditMode: () => void
}

const TextParagraph = ({ text, style, activateEditMode }: any) => {
	let paragraphs
	if (typeof text === 'string') {
		paragraphs = text.split('\n')
	}

	return (
		text &&
		paragraphs?.map((text: string, index: number) => {
			const cleanText = text
				// .replace(/&nbsp;/g, ' ')
				.replace(/&quot;/g, '«')
				.replace(/&laquo;/g, '»')
				.replace(/&mdash;/g, '–')
				.replace(/&copy;/g, '©')
				.replace(/&frac12;/g, '½')
				.replace(/&rsquo;/g, '’')
				.replace(/&deg;/g, '°')
				.replace(/&Prime;/g, '″')

			return (
				<p key={index} className={style} onDoubleClick={activateEditMode}>
					{cleanText || 'no text'}
				</p>
			)
		})
	)
}

export default TextParagraph
