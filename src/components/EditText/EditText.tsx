import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	changeModalName,
	changeModalInfo,
	changeModalItemName,
	changeModalTitle,
	changeModalText,
	changeModalCopyright,
} from '../../store/modalSlice'
import TextParagraph from '../TextParagraph/TextParagraph'
import './styles.scss'


type Props = {
	text: string | undefined
	modalName: string
	textStyle: string
	editType: string
	edit?: boolean | null
	itemId?: number
	exhibit?: boolean
}

const EditText = ({
	text,
	modalName,
	textStyle,
	editType,
	edit,
	itemId,
	exhibit = false,
}: Props) => {
	const [editMode, setEditMode] = useState(false)
	const [textContent, setTextContent] = useState(text)
	const [position, setPosition] = useState<number | null>(0)
	const textareaRef: any = React.useRef<HTMLInputElement>(null)
	const dispatch = useDispatch()

	useEffect(() => {
		setTextContent(text)
	}, [text])

	const activateEditMode = () => setEditMode(edit!)

	const deactivateEditMode = () => {
		setEditMode(false)
		const changeData = { modalName, text: textContent || '', editType }
		if (editType === 'modal-name') {
			dispatch(changeModalName(changeData))
		} else if (editType === 'modal-item') {
			dispatch(changeModalItemName({ ...changeData, itemId }))
		} else if (editType === 'modal-title' || editType === 'modal-subtitle') {
			dispatch(changeModalTitle({ ...changeData, itemId }))
		} else if (editType === 'modal-text-info' || editType === 'modal-text') {
			dispatch(changeModalText({ ...changeData, itemId }))
		} else if (editType === 'copyright') {
			dispatch(changeModalCopyright({ ...changeData, itemId, exhibit }))
		} else {
			dispatch(changeModalInfo(changeData))
		}
	}

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const value = e.target.value
			const newValue =
				value.length <= 10 ? value + ''.repeat(10 - value.length) : value
			setTextContent(newValue)
			setPosition(e.target.selectionEnd)
		},
		[]
	)

	useEffect(() => {
		if (textareaRef.current !== null) {
			textareaRef.current.selectionStart = position
			textareaRef.current.selectionEnd = position
		}
	}, [position])

	const EditField = ({ fieldStyle, inputField }: {fieldStyle: string, inputField: boolean}) => {
		return (
			<div className={fieldStyle}>
				{inputField ? (
					<input
						onChange={e => handleChange(e)}
						autoFocus={true}
						onBlur={deactivateEditMode}
						value={textContent}
					/>
				) : (
					<textarea
						onChange={e => handleChange(e)}
						autoFocus={true}
						onBlur={deactivateEditMode}
						value={textContent}
						ref={textareaRef}
					/>
				)}
			</div>
		)
	}

	return (
		<div>
			{editMode ? (
				editType === 'title' ? (
					<EditField fieldStyle={'cupboard-title'} inputField={true} />
				) : editType === 'text' ? (
					<EditField fieldStyle={'cupboard-text'} inputField={false} />
				) : editType === 'modal-name' ? (
					<EditField fieldStyle={'modal-name'} inputField={true} />
				) : editType === 'room-title' || editType === 'copyright' ? (
					<EditField fieldStyle={'room-title'} inputField={true} />
				) : editType === 'room-text' || editType === 'modal-text' ? (
					<EditField fieldStyle={'room-text'} inputField={false} />
				) : (
					<EditField fieldStyle={'item-name'} inputField={false} />
				)
			) : (
				<TextParagraph
					text={textContent}
					style={textStyle}
					activateEditMode={activateEditMode}
				/>
			)}
		</div>
	)
}

export default EditText
