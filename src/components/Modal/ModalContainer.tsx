import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Modal as ModalType, ModalInfoType, removeHistory, showModal } from '../../store/modalSlice'
import Slider from '../Slider/Slider'
import Modal from './Modal'
import Modal3DModel from './ModalFull/Modal3DModel'
import ModalImage from './ModalFull/ModalImage'
import ModalVideo from './ModalFull/ModalVideo'
import ModalRoomInfo from './ModalRoomInfo'
import SwitchModal from './SwitchModal'
import { useAppSelector } from '../../hooks'

export interface ModalPropsType {
	show: boolean
	id: number
	modalType: string
	modalName: string
	cupboard: boolean
	info: ModalInfoType
	data: any
}

const ModalContainer = () => {
	const dispatch = useDispatch()
	const location = useLocation()

	const [edit, setEdit] = useState<boolean>(false)

	// Получение данных открытой модалки
	const visibleModal = useAppSelector(state => state.modal.modal)

	// Получение типов модалки, сохраненных в очередности открытия
	const modalNameHistory = useAppSelector(state => state.modal.modalHistory)

	// Получение данных модалки, сохраненных в очередности открытия
	const modalDataHistory = useAppSelector(state => state.modal.modalDataHistory)

	// Получение текстовой информации модалки, сохраненных в очередности открытия
	const modalInfoHistory = useAppSelector(state => state.modal.modalInfoHistory)

	const [showContent, setShowContent] = useState(false)

	useEffect(() => {
		if (visibleModal.show) {
			setShowContent(true)
		} else {
			setTimeout(() => {
				setShowContent(false)
			}, 100)
		}
	}, [visibleModal.show])

	useEffect(() => {
		window.addEventListener('popstate', closeModal, false)
		return () => window.removeEventListener('popstate', closeModal, false)
	}, [])

	useEffect(() => {
		setEdit(location.pathname === '/edit')
	}, [location])

	const renderModalData = useCallback(
		(
			edit: boolean,
			id: number,
			type: string,
			name: string,
			cupboard: boolean,
			modalInfo: ModalInfoType,
			data?: any
		) => {
			switch (type) {
				case 'room':
					return (
						<ModalRoomInfo content={modalInfo} modalName={name} edit={edit} />
					)
				case 'content':
					return (
						<SwitchModal
							modalId={id}
							content={data}
							modalName={name}
							cupboard={cupboard}
							modalInfo={modalInfo}
							edit={edit}
						/>
					)
				case 'model':
					return (
						<Modal3DModel item={data[0]} modalName={name} edit={edit} id={id} />
					)
				case 'image':
					return (
						<ModalImage item={data[0]} modalName={name} edit={edit} id={id} />
					)
				case 'video':
					return (
						<ModalVideo item={data[0]} modalName={name} edit={edit} id={id} />
					)
				case 'slider':
					return <Slider item={data[0]} modalName={name} edit={edit} id={id} />
				default:
					return null
			}
		},
		[]
	)

	// Ф-ия закрытия модалки, и открытия предыдущей модалки, если такая была
	const closeModal = () => {
		dispatch(
			showModal({
				show: false,
				modalType: visibleModal.modalType,
				data: {},
				info: visibleModal.info,
			} as ModalType)
		)
		dispatch(removeHistory())
		if (modalNameHistory.length > 1) {
			const modalType = modalNameHistory[modalNameHistory.length - 2]
			const modalData = modalDataHistory[modalDataHistory.length - 2]
			const modalInfo = modalInfoHistory[modalInfoHistory.length - 2]

			dispatch(
				showModal({
					id: visibleModal.id,
					show: true,
					modalType: modalType,
					modalName: visibleModal.modalName,
					data: modalData,
					info: modalInfo,
				} as ModalType)
			)
		}
	}

	const SwitchModalWidth = useCallback(
		(type: string, cupboard: boolean = true) => {
			switch (type) {
				case 'room':
					return {
						roomInfo: true,
						full: false,
						cupboard: false,
					}
				case 'info':
					return {
						roomInfo: true,
						full: false,
						cupboard: false,
					}
				case 'content':
					return cupboard ? 
						{
							contentInfo: true,
							full: false,
							cupboard: true,
						} : {
							contentInfo: true,
							full: false,
							cupboard: false,
						}
				case 'model':
					return {
						full: true,
						cupboard: false,
					}
				default:
					return { full: true, cupboard: true }
			}
		}, []
	)

	return (
		<Modal
			showModal={visibleModal.show}
			onClose={closeModal}
			modalStyle={SwitchModalWidth(
				visibleModal.modalType,
				visibleModal.cupboard
			)}
		>
			{showContent &&
				renderModalData(
					edit,
					visibleModal.id,
					visibleModal.modalType,
					visibleModal.modalName,
					visibleModal.cupboard,
					visibleModal.info,
					visibleModal.data
				)
			}
		</Modal>
	)
}

export default ModalContainer
