import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { staticHost } from '../../..'
import { ExampleDataType, ModalInfoType, deleteModalItem } from '../../../store/modalSlice'
import EditText from '../../EditText/EditText'
import ImageDropzone from '../../Dropzones/ImageDropzone'
import './style.scss'

type Props = {
	item: ExampleDataType
	id: number | undefined
	modalId: number
	openModal: (
		show: boolean,
		modalType: string,
		modalName: string,
		data: ExampleDataType[],
		modalInfo: ModalInfoType,
		modalId: number
	) => void
	modalName: string
	modalType: string
	modalInfo: ModalInfoType
	edit: boolean
}

const ModalContentItem = ({
	item,
	id,
	modalId,
	openModal,
	modalName,
	modalType,
	modalInfo,
	edit,
}: Props) => {
	const dispatch = useDispatch()
	const [editMode, setEditMode] = useState(false)
	const [prevImage, setPrevImage] = useState(item.content.image!)

	useEffect(() => {
		if (prevImage !== item.content.image) {
			setEditMode(false)
		}
	}, [item.content.image, setEditMode, prevImage])


	return (
		<div
			className='content-item'
			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				if (
					(e.target as Element).className === 'content-item' ||
					(e.target as Element).className === 'content-item__img-wrap'
				) {
					openModal(true, modalType, modalName, [item], modalInfo, modalId)
				}
			}}
		>
			{edit && editMode ? (
				<ImageDropzone
					itemId={id}
					modalId={modalId}
					modalName={modalName}
					preview={true}
				/>
			) : (
				<div className='content-item__img-wrap'>
					{edit && <span onClick={() => setEditMode(true)}>&#9998;</span>}
					<img
						className='content-item__img'
						src={`${staticHost}/${item?.content?.image}`}
						draggable='false'
						alt={item?.title}
					/>
				</div>
			)}
			<div className='content-item__block'>
				<EditText
					text={item.title}
					modalName={modalName}
					textStyle={'content-item__title'}
					editType={'modal-item'}
					edit={edit}
					itemId={id}
				/>
			</div>
			{edit && (
				<button
					onClick={() => {
						const result: boolean = window.confirm(
							'Вы действительно хотите удалить экспонат?'
						)
						result && dispatch(deleteModalItem({ id, modalName }))
					}}
				>
					&#10005;
				</button>
			)}
		</div>
	)
}

export default ModalContentItem
