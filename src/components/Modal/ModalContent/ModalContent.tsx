import { useDispatch } from 'react-redux'
import { ExampleDataType, Modal, ModalInfoType, addModalItem, setHistory, showModal } from '../../../store/modalSlice'
import ModalContentItem from '../ModalContentItem/ModalContentItem'

type Props = {
	modalId: number
	content: ExampleDataType[]
	modalName: string
	modalInfo: ModalInfoType
	edit: boolean
}

const ModalContent = ({
	modalId,
	content,
	modalName,
	modalInfo,
	edit,
}: Props) => {
	const dispatch = useDispatch()

	const openModal = (
		show: boolean,
		modalType: string,
		modalName: string,
		data: ExampleDataType[],
		modalInfo: ModalInfoType,
		modalId: number
	) => {
		dispatch(showModal({ show, modalType, modalName, data, id: modalId } as Modal))
		dispatch(setHistory({ modalType, data, info: modalInfo }))
	}

	const newModalItem = {
		id: content && content.length + 1,
		title: 'Наименование экспоната',
		content: {
			childTitle: 'Заголовок экспоната',
			childInfoText: 'Информация об экспонате',
			childText: 'Текст экспоната',
			copyrightText: 'Копирайт',
			childImage: '',
			image: 'images/other/logo.png',
			model: '',
			video: '',
			gorizontalPos: false,
		},
	}

	return (
		<div className='room-modal__content'>
			{content && content.length
				? content.map((item: ExampleDataType, index: number) => {
						const modalType = item.content?.video
							? 'video'
							: item.content?.model
							? 'model'
							: item.content?.slides
							? 'slider'
							: item.content?.image
							? 'image'
							: 'undefined type'

						return (
							<ModalContentItem
								key={index}
								id={item.id}
								modalId={modalId}
								item={item}
								openModal={openModal}
								modalName={modalName}
								modalType={modalType}
								modalInfo={modalInfo}
								edit={edit}
							/>
						)
				  })
				: null}
			{edit && (
				<div
					className='new-content-item'
					onClick={() =>
						dispatch(addModalItem({ modalName, modalItem: newModalItem }))
					}
				>
					<span>&#43;</span>
				</div>
			)}
		</div>
	)
}

export default ModalContent
