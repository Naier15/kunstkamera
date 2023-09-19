import { ModalInfoType } from '../../store/modalSlice'
import TextParagraph from '../TextParagraph/TextParagraph'
import './Modal.scss'


type Props = {
	info: ModalInfoType
}

const ModalInfo = ({ info }: Props) => {
	return (
		<div className={info.text ? 'modal-info' : 'modal-info row'}>
			<h3 className='modal-title'>{info.title}</h3>
			{info.text && <TextParagraph text={info.text} style='modal-text' />}
		</div>
	)
}

export default ModalInfo
