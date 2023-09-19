import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ExampleDataType, changePosition } from '../../../store/modalSlice'
import '../Modal.scss'
import { staticHost } from '../../..'
import './style.scss'
import ImageDropzone from '../../Dropzones/ImageDropzone'
import EditText from '../../EditText/EditText'
import ToggleButton from '../../ToggleButton/ToggleButton'

type Props = {
	id: number
	item: ExampleDataType
	modalName: string
	edit: boolean
}

export type OrientaionType = {
	orientation: boolean
	modalName: string
	itemId: number
}

const ModalImage = ({ id, item, modalName, edit }: Props) => {
	const dispatch = useDispatch()
	const [editMode, setEditMode] = useState(false)
	const [gorizontalPos, setGorizontalPos] = useState(
		item?.content?.gorizontalPos
	)

	const [prevImage, setPrevImage] = useState(item.content.childImage!)

	useEffect(() => {
		if (prevImage !== item?.content?.childImage) {
			setEditMode(false)
		}
	}, [item?.content?.childImage, setEditMode, prevImage])

	useEffect(() => {
		if (item?.content?.childImage?.trim() === '') {
			setEditMode(true)
		} else {
			setEditMode(false)
		}
	}, [item?.content?.childImage, setEditMode])

	useEffect(() => {
		dispatch(changePosition({
			orientation: gorizontalPos,
			modalName,
			itemId: item?.id,
		} as OrientaionType))
	}, [gorizontalPos])

	return (
		<div
			className={`image-block ${
				item?.content?.gorizontalPos ? 'gorizontal' : ''
			}`}
		>
			<div className='image-full' onContextMenu={e => e.preventDefault()}>
				{edit && editMode ? (
					<div className='drop-block'>
						<ImageDropzone
							itemId={item?.id}
							modalId={id}
							modalName={modalName}
						/>
					</div>
				) : (
					<div className='image-wrap'>
						{edit && (
							<div className='edit-controls'>
								<span className='edit-btn' onClick={() => setEditMode(true)}>
									&#9998;
								</span>
								<ToggleButton
									label='Горизонтальное положение контента'
									toggled={gorizontalPos}
									onClick={setGorizontalPos}
								/>
							</div>
						)}
						<img
							className={`${item?.content?.imageBorder ? 'image-border' : ''}`}
							src={`${staticHost}/${item?.content?.childImage}`}
							draggable='false'
							alt={item?.content?.childTitle}
						/>
					</div>
				)}
			</div>
			{(item?.content?.childTitle || item?.content?.childSubtitle) && (
				<div className='image-text-block'>
					<div>
						<div>
							<EditText
								text={item.content.childTitle}
								modalName={modalName}
								textStyle={'image-title'}
								editType={'modal-title'}
								edit={edit}
								itemId={item.id}
							/>
							<EditText
								text={item.content.childSubtitle}
								modalName={modalName}
								textStyle={'image-subtitle'}
								editType={'modal-subtitle'}
								edit={edit}
								itemId={item.id}
							/>
						</div>

						<div className='image-text-content'>
							<EditText
								text={item.content.childInfoText}
								modalName={modalName}
								textStyle={'image-info-text'}
								editType={'modal-text-info'}
								edit={edit}
								itemId={item.id}
							/>
							<EditText
								text={item.content.childText}
								modalName={modalName}
								textStyle={'image-text'}
								editType={'modal-text'}
								edit={edit}
								itemId={item.id}
							/>
						</div>
					</div>
					<EditText
						text={item.content.copyrightText}
						modalName={modalName}
						textStyle={'text-bottom'}
						editType={'copyright'}
						edit={edit}
						itemId={item.id}
					/>
				</div>
			)}
		</div>
	)
}

export default ModalImage
