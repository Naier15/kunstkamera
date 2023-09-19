import { ExampleDataType, ModalInfoType } from '../../store/modalSlice'
import EditText from '../EditText/EditText'
import ModalContent from './ModalContent/ModalContent'
import ModalExhibit from './ModalExhibit'


type Props = {
	modalId: number
	content: ExampleDataType[]
	modalName: string
	modalInfo: ModalInfoType
	cupboard: boolean
	edit: boolean
}

const SwitchModal = ({
	modalId,
	content,
	modalName,
	modalInfo,
	cupboard = true,
	edit,
}: Props) => {
	return (
		<>
			{cupboard ? (
				<>
					<div className='room-modal__title'>
						<EditText
							text={modalInfo.title}
							modalName={modalName}
							textStyle={'modal-title'}
							editType={'title'}
							edit={edit}
						/>
						<EditText
							text={modalInfo.text}
							modalName={modalName}
							textStyle={'modal-text'}
							editType={'text'}
							edit={edit}
						/>
					</div>
					<ModalContent
						modalId={modalId}
						content={content}
						modalName={modalName}
						modalInfo={modalInfo}
						edit={edit}
					/>
				</>
			) : (
				<ModalExhibit
					edit={edit}
					modalId={modalId}
					modalInfo={modalInfo}
					modalName={modalName}
				/>
			)}
		</>
	)
}

export default SwitchModal
