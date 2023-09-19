import { ModalInfoType } from '../../store/modalSlice'
import EditText from '../EditText/EditText'
import './Modal.scss'


interface Props {
	content: ModalInfoType
	modalName: string
	edit: boolean
}

const ModalRoomInfo = ({ content, modalName, edit }: Props) => {
	return (
		<div className='room-info'>
			<div className='room-title-block'>
				<EditText
					text={content.title}
					modalName={modalName}
					textStyle={'room-title'}
					editType={'room-title'}
					edit={edit}
				/>
			</div>
			<div className='room-text'>
				<EditText
					text={content.text}
					modalName={modalName}
					textStyle={'text-paragraph'}
					editType={'room-text'}
					edit={edit}
				/>
			</div>
		</div>
	)
}

export default ModalRoomInfo
