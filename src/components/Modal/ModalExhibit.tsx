import React, { useEffect, useState } from 'react'
import { staticHost } from '../..'
import EditText from '../EditText/EditText'
import ImageDropzone from '../Dropzones/ImageDropzone'
import { ModalInfoType } from '../../store/modalSlice'


type Props = {
	edit: boolean
	modalId: number
	modalInfo: ModalInfoType
	modalName: string
}

const ModalExhibit = ({ edit, modalId, modalInfo, modalName }: Props) => {
	const [editMode, setEditMode] = useState(false)
	const [prevImage, setPrevImage] = useState(modalInfo.image!)	

	useEffect(() => {
		if (prevImage !== modalInfo.image) {
			setEditMode(false)
		}
	}, [modalInfo.image, prevImage])

	useEffect(() => {
		setEditMode(modalInfo.image?.trim() === '')
	}, [modalInfo.image])

	return (
		<div className='modal-instance'>
			{edit && editMode ? (
				<div
					style={{
						width: '30%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<ImageDropzone
						modalId={modalId}
						modalName={modalName}
						exhibit={true}
					/>
				</div>
			) : (
				<>
					{edit && (
						<span style={{ zIndex: 6 }} onClick={() => setEditMode(true)}>
							&#9998;
						</span>
					)}
					<img
						className='modal-image'
						src={`${staticHost}/${modalInfo.image}`}
						draggable='false'
						alt={modalInfo.title}
					/>
				</>
			)}

			<div className='modal-block'>
				<div>
					<div className='room-title-block'>
						<EditText
							text={modalInfo.title}
							modalName={modalName}
							textStyle={'room-title'}
							editType={'room-title'}
							edit={edit}
						/>
					</div>
					<div className='modal-instance__text'>
						<EditText
							text={modalInfo.text}
							modalName={modalName}
							textStyle={'text-paragraph'}
							editType={'room-text'}
							edit={edit}
						/>
					</div>
				</div>
				<EditText
					text={modalInfo.copyrightText}
					modalName={modalName}
					textStyle={'text-bottom'}
					editType={'copyright'}
					edit={edit}
					exhibit={true}
				/>
			</div>
		</div>
	)
}

export default ModalExhibit
