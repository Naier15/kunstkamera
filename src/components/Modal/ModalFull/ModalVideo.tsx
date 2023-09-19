import { useState } from 'react'
import EditText from '../../EditText/EditText'
import ImageDropzone from '../../Dropzones/ImageDropzone'
import VideoPlayer from '../../VideoPlayer/VideoPlayer'
import { ExampleDataType } from '../../../store/modalSlice'


export type Props = {
	id: number
	item: ExampleDataType
	modalName: string
	edit: boolean
}

const ModalVideo = ({ id, item, modalName, edit }: Props) => {
	const [editMode, setEditMode] = useState(false)

	return (
		<div className='block'>
			{edit && editMode ? (
				<ImageDropzone itemId={item.id} modalId={id} modalName={modalName} />
			) : (
				<>
					{edit && (
						<span className='edit-btn' onClick={() => setEditMode(true)}>
							&#9998;
						</span>
					)}
					<VideoPlayer src={item.content.video as string} />
				</>
			)}
			<div className='text-block video'>
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
							text={item.content.childText}
							modalName={modalName}
							textStyle={'text-block__text'}
							editType={'modal-text'}
							edit={edit}
							itemId={item.id}
						/>
						<EditText
							text={item.content.childInfoText}
							modalName={modalName}
							textStyle={'image-info-text'}
							editType={'modal-text-info'}
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
		</div>
	)
}

export default ModalVideo
