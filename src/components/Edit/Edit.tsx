import React, { useEffect, useState } from 'react'
import {
	Modal,
	ModalDataType,
	addModal,
	deleteModal,
	fetchModalData,
	getRoomModals,
	setHistory,
	showModal,
} from '../../store/modalSlice'
import './style.scss'
import EditText from '../EditText/EditText'
import { serverHost } from '../..'
import ModalOption from '../ModalOption/ModalOption'
import ModalContainer from '../Modal/ModalContainer'
import { useAppDispatch, useAppSelector, useAuthorize } from '../../hooks'
import { Link } from 'react-router-dom'

const roomCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Edit = () => {
	const authorize = useAuthorize()
	const dispatch = useAppDispatch()
	const roomModals = useAppSelector(state => state.modal.roomModals)
	const [roomCount, setRoomCount] = useState(1)

	// Создание папки в imgs с id модалки
	const getLastModalDirectory = async () => {
		const result = await fetch(`${serverHost}/new-modal/`)
		const data = await result.json()
		return data.new_modal_number
	}

	// Удаление папки в imgs с id модалки
	const deleteLastModalDirectory = async (id: number) => {
		await fetch(`${serverHost}/new-modal/?num=${id}`, {
			method: 'DELETE',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
		})
	}

	useEffect(() => {
		authorize()
		dispatch(getRoomModals(roomCount))
	}, [roomCount])

	// Ф-ия открытия модального окна
	const openModal = (item: ModalDataType) => {
		dispatch(
			showModal({
				id: item.id,
				cupboard: item.cupboard,
				show: true,
				modalType: item.modalType,
				modalName: item.modalName,
				data: item.content,
				info: item.info,
			} as Modal)
		)
		dispatch(
			setHistory({
				modalType: item?.modalType,
				data: item?.content,
				info: item?.info,
			})
		)
	}

	return (
		<div className='edit-content'>
			<div className='edit-modals'>
				<div className='room-counts'>
					<p style={{ marginBottom: '15px' }}>Номера комнат кунтскамеры</p>
					{roomCounts.map((item: number, idx: number) => (
						<button
							key={idx}
							onClick={() => setRoomCount(item)}
							className={`room-count ${roomModals.id === item && 'active'}`}
						>
							{' '}
							{item}{' '}
						</button>
					))}
				</div>
				<div className='room-modals'>
					{roomModals.modals &&
						roomModals.modals.map((item: ModalDataType, idx: number) => (
							<React.Fragment key={idx}>
								<p>{item.info.title}</p>
								<div key={item.modalName} className='edit-modal'>
									<EditText
										text={item.modalName}
										modalName={item.modalName}
										textStyle={'modal-name'}
										editType={'modal-name'}
										edit={true}
									/>
									{item.id > 38 && (
										<ModalOption id={item.id} modalType={item.modalType} />
									)}
									<div>
										<button onClick={() => openModal(item)}>&#9998;</button>
										<button
											onClick={() => {
												const result = window.confirm(
													'Вы действительно хотите удалить модальное окно?'
												)
												deleteLastModalDirectory(item.id)
												result && dispatch(deleteModal(item.id))
											}}
										>
											&#10005;
										</button>
									</div>
								</div>
							</React.Fragment>
						))}
				</div>
				<div className='buttons-block'>
					<button
						className='add-modal'
						onClick={async () => {
							const newModalNumber = await getLastModalDirectory()
							dispatch(
								addModal({
									id: roomCount,
									modal: {
										id: newModalNumber,
										modalName: `${roomModals.roomName}-${newModalNumber}`,
										modalType: '',
										cupboard: true,
										info: {
											image: '',
											title: 'Заголовок',
											text: 'Описание',
											copyrightText: 'Копирайт',
										},
										content: [],
									} as ModalDataType,
								})
							)
						}}
					>
						Добавить новое модальное окно
					</button>
					<button
						className='save-modal'
						onClick={() => {
							if (roomModals.id === roomCount) {
								dispatch(fetchModalData(roomModals))
							}
						}}
					>
						Сохранить изменения
					</button>
				</div>
			</div>
			<ModalContainer />
			<Link to='/admin'>
				<svg
					className='logo-btn'
					viewBox='0 0 55 55'
					xmlns='http://www.w3.org/2000/svg'
				>
					<circle opacity='0.7' cx='27.8652' cy='27.2891' r='27' />
					<path
						className='logo-path'
						fillRule='evenodd'
						clipRule='evenodd'
						d='M27.985 19.9582C28.0651 20.1449 28.0604 20.3498 28.2809 20.3746C28.2254 20.491 28.2404 20.5117 28.2357 20.5197C28.2317 20.5253 28.2166 20.5237 28.15 20.5508V20.8587H28.3253C28.1334 21.2614 28.5974 21.4218 28.7005 21.7847C28.7783 22.059 28.7616 22.398 28.764 22.6628H28.8988V24.7309L29.988 25.1568V25.4686H29.7397V27.6611L29.9094 27.8549V29.3504H31.0104V29.927L31.9385 28.9348L33.1823 28.2936H41.8176L42.6323 28.4778L44.8652 30.053L44.5154 30.4933V34.2331L44.7343 35.2891H10.9961L11.2151 34.1892V30.4933L10.8652 30.053L11.572 29.7077L13.0173 28.477L13.97 28.2928H22.5061L23.7673 28.9141L24.6478 29.9206V29.3488H25.7846V27.8533L25.9607 27.6595V25.467H25.7425V25.1552L26.8348 24.7293V22.6612H26.9689C26.9831 22.2169 26.949 22.0431 27.0323 21.7831C27.1592 21.3843 27.5464 21.2742 27.4052 20.8571H27.5805V20.5492C27.5067 20.5197 27.4956 20.5245 27.494 20.5165C27.4916 20.5069 27.5011 20.4814 27.4496 20.3738C27.7026 20.3458 27.6852 20.1768 27.7486 19.959C27.6162 19.9112 27.5218 19.7836 27.5218 19.6344C27.5218 19.4438 27.6756 19.2891 27.8652 19.2891C28.0548 19.2891 28.2087 19.4438 28.2087 19.6344C28.2087 19.7828 28.1159 19.9088 27.9858 19.9582H27.985ZM27.8779 25.4678V34.7236H44.0411L43.9514 34.2913V30.2955L44.0506 30.1711L42.3982 29.0058L41.7525 28.8599H33.3156L32.2788 29.3942L30.4457 31.3531V29.9158H29.2994V28.0216L29.1749 27.8278V25.4686H27.8763L27.8779 25.4678Z'
					/>
				</svg>
			</Link>
		</div>
	)
}

export default Edit
