import React, { useState } from 'react'
import { staticHost } from '../../..'
import './style.scss'
import EditText from '../../EditText/EditText'
import ModelDropzone from '../../Dropzones/ModelDropzone'
import { ExampleDataType } from '../../../store/modalSlice'


type Props = {
	id: number
	item?: ExampleDataType
	modalName: string
	edit: boolean
}

const Modal3DModel = ({ id, item, modalName, edit }: Props) => {
	const [editMode, setEditMode] = useState(false)

	return (
		<div className='block'>
			{edit && editMode ? (
				<ModelDropzone itemId={item?.id} modalId={id} modalName={modalName} />
			) : (
				<>
					{edit && (
						<span className='edit-btn' onClick={() => setEditMode(true)}>
							&#9998;
						</span>
					)}
					<iframe
						title='frame'
						src={`${staticHost}${item?.content?.model}`}
						className='model'
					/>
				</>
			)}

			{item && (
				<div className='text-block'>
					<div>
						<EditText
							text={item.content.childTitle}
							modalName={modalName}
							textStyle={'text-block__title'}
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
								textStyle={'text-block__text'}
								editType={'modal-text'}
								edit={edit}
								itemId={item.id}
							/>
						</div>
					</div>
					<EditText
						text={item?.content?.copyrightText}
						modalName={modalName}
						textStyle={'text-bottom'}
						editType={'copyright'}
						edit={edit}
						itemId={item?.id}
					/>
				</div>
			)}
		</div>
	)
}

export default Modal3DModel
