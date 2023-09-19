import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { serverHost } from '..'
import { ModalHistory } from '../components/Tour'
import { saveImageType } from '../components/Dropzones/ImageDropzone'
import { saveModelType } from '../components/Dropzones/ModelDropzone'
import { OrientaionType } from '../components/Modal/ModalFull/ModalImage'

type ModalContentType = {
	modalName: string
	itemId?: number | undefined
	text: string
	editType: string
	exhibit?: boolean
}

export type RoomModalType = {
	id: number
	roomName: string
	modals: ModalDataType[]
}

export type ModalDataType = {
	id: number
	roomId?: number
	modalType: string
	modalName: string
	cupboard: boolean
	info: ModalInfoType
	content: ExampleDataType[]
}

export type ExampleDataType = {
	id?: number
	title?: string
	text?: string
	content: ExampleContentType
}

export type ExampleContentType = {
	image?: string
	model?: string
	video?: string
	title?: string
	text?: string
	childTitle?: string
	childSubtitle?: string
	childInfoText?: string
	childText?: string
	copyrightText?: string
	childImage?: string
	slides?: string[]
	gorizontalPos?: boolean
	imageBorder?: boolean
}

export type ModalInfoType = {
	title: string
	text: string
	image?: string
	copyrightText?: string
}

export type Modal = {
	show: boolean
	id: number
	modalType: string
	modalName: string
	cupboard: boolean
	info: ModalInfoType
	data: ExampleDataType[]
}

export type ModalType = {
	id: number
	type: string
}

export const getRoomModals = createAsyncThunk(
	'modal/changeModalData',
	async (id: number) => {
		const response = await fetch(`${serverHost}/modal/?id=${id}`)
		if (!response.ok) throw new Error("Can't add modal. Server error.")
		const data = await response.json()
		return data as RoomModalType
	}
)

export const fetchModalData = createAsyncThunk(
	'modal/addModalData',
	async (modal: RoomModalType) => {
		const response = await fetch(`${serverHost}/modal/?id=${modal.id}`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
			body: JSON.stringify(modal),
		})
		if (!response.ok) throw new Error("Can't add modal. Server error.")
		const data = await response.json()
		return data as RoomModalType
	}
)

const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		modal: {
			show: false,
			id: 0,
			modalType: '',
			modalName: '',
			cupboard: false,
			info: {
				title: '',
				text: '',
				image: '',
				copyrightText: '',
			},
			data: [],
		} as Modal,
		roomModals: {
			id: 0,
			roomName: '',
			modals: [],
		} as RoomModalType,
		modalHistory: [] as string[],
		modalDataHistory: [] as ExampleDataType[][],
		modalInfoHistory: [] as ModalInfoType[],
	},
	reducers: {
		showModal(state, action: PayloadAction<Modal>) {
			state.modal = action.payload
		},
		setHistory(state, action: PayloadAction<ModalHistory>) {
			state.modalHistory.push(action.payload.modalType)
			state.modalDataHistory.push(action.payload.data)
			state.modalInfoHistory.push(action.payload.info)
		},
		removeHistory(state) {
			state.modalHistory.pop()
			state.modalDataHistory.pop()
			state.modalInfoHistory.pop()
		},
		changeModalName(state, action: PayloadAction<ModalContentType>) {
			// Обновляем название модалки в общем state всех модалок
			state.roomModals.modals.forEach((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					modal.modalName = action.payload.text
				}
			})
		},
		changeModalInfo(state, action: PayloadAction<ModalContentType>) {
			const editType = action.payload.editType
			// Обновляем информацию о модалке в истории открытых модалок
			state.modalInfoHistory.forEach((modalInfo: ModalInfoType) => {
				if (editType === 'title' || editType === 'room-title') {
					modalInfo.title = action.payload.text
				} else {
					modalInfo.text = action.payload.text
				}
			})

			// Обновляем информацию о модалке в общем state всех модалок
			state.roomModals.modals.forEach((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					if (editType === 'title' || editType === 'room-title') {
						modal.info.title = action.payload.text
					} else {
						modal.info.text = action.payload.text
					}
				}
			})
		},
		changeModalItemName(state, action: PayloadAction<ModalContentType>) {
			// Обновляем название экспоната модалки в истории открытых модалок
			state.modalDataHistory[0].forEach((modalItem: ExampleDataType) => {
				if (modalItem.id === action.payload.itemId) {
					modalItem.title = action.payload.text
				}
			})

			// Обновляем название экспоната модалки в общем state всех модалок
			state.roomModals.modals.map((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					modal.content.forEach((modalItem: ExampleDataType) => {
						if (modalItem.id === action.payload.itemId) {
							modalItem.title = action.payload.text
						}
					})
				}
				return modal
			})
		},
		changeModalTitle(state, action: PayloadAction<ModalContentType>) {
			const newTitle =
				action.payload.editType === 'modal-title'
					? { childTitle: action.payload.text }
					: { childSubtitle: action.payload.text }

			const newContent = (modalItem: ExampleDataType) => {
				return (modalItem.content = { ...modalItem.content, ...newTitle })
			}

			// Обновляем заголовок экспоната в истории открытых модалок
			state.modalDataHistory[0].forEach((modalItem: ExampleDataType) => {
				if (modalItem.id === action.payload.itemId) {
					newContent(modalItem)
				}
			})

			// Обновляем заголовок экспоната в общем state всех модалок
			state.roomModals.modals.map((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					modal.content.forEach((modalItem: ExampleDataType) => {
						if (modalItem.id === action.payload.itemId) {
							newContent(modalItem)
						}
					})
				}
				return modal
			})
		},
		changeModalText(state, action: PayloadAction<ModalContentType>) {
			const newText =
				action.payload.editType === 'modal-text'
					? { childText: action.payload.text }
					: { childInfoText: action.payload.text }

			const newContent = (modalItem: ExampleDataType) => {
				return (modalItem.content = { ...modalItem.content, ...newText })
			}

			// Обновляем текст экспоната в истории открытых модалок
			state.modalDataHistory[0].forEach((modalItem: ExampleDataType) => {
				if (modalItem.id === action.payload.itemId) {
					newContent(modalItem)
				}
			})
			// Обновляем текст экспоната в общем state всех модалок
			state.roomModals.modals.map((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					modal.content.forEach((modalItem: ExampleDataType) => {
						if (modalItem.id === action.payload.itemId) {
							newContent(modalItem)
						}
					})
				}
				return modal
			})
		},
		changeModalCopyright(state, action: PayloadAction<ModalContentType>) {
			const newContent = (modalItem: ExampleDataType) => {
				modalItem.content = {
					...modalItem.content,
					copyrightText: action.payload.text,
				}
			}

			// Обновляем копирайт экспоната в истории открытых модалок
			if (action.payload.exhibit) {
				state.modalInfoHistory.forEach((modalInfo: ModalInfoType) => {
					modalInfo.copyrightText = action.payload.text
				})
			} else {
				state.modalDataHistory[0].forEach((modalItem: ExampleDataType) => {
					if (modalItem.id === action.payload.itemId) {
						newContent(modalItem)
					}
				})
			}

			// Обновляем копирайт экспоната в общем state всех модалок
			state.roomModals.modals.forEach((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					action.payload.exhibit
						? (modal.info.copyrightText = action.payload.text)
						: modal.content.forEach((modalItem: ExampleDataType) => {
								if (modalItem.id === action.payload.itemId) {
									newContent(modalItem)
								}
						  })
				}
			})
		},
		addModalItem(
			state,
			action: PayloadAction<{ modalName: string; modalItem: any }>
		) {
			// Обновляем кол-во экспонатов модалки в истории открытых модалок
			state.modalDataHistory[0].push(action.payload.modalItem)

			// Обновляем кол-во экспонатов модалки в открытой модалке
			state.modal.data?.push(action.payload.modalItem)

			// Обновляем кол-во экспонатов модалки в общем state всех модалок
			state.roomModals.modals.forEach((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					return modal.content.push(action.payload.modalItem)
				}
			})
		},
		deleteModalItem(
			state,
			action: PayloadAction<{ id: number | undefined; modalName: string }>
		) {
			// Обновляем кол-во экспонатов модалки в истории открытых модалок
			state.modalDataHistory = state.modalDataHistory.map((modalData: any) => {
				return modalData.filter(
					(modalItem: ExampleDataType) => modalItem.id !== action.payload.id
				)
			})

			// Обновляем кол-во экспонатов модалки в открытой модалке
			state.modal.data = state.modal.data.filter(
				(modalItem: ExampleDataType) => modalItem.id !== action.payload.id
			)

			// Обновляем кол-во экспонатов модалки в общем state всех модалок
			state.roomModals.modals = state.roomModals.modals.map(
				(modal: ModalDataType) => {
					if (modal.modalName === action.payload.modalName) {
						const content = modal.content.filter(
							(modalItem: ExampleDataType) => modalItem.id !== action.payload.id
						)
						return { ...modal, content }
					}
					return modal
				}
			)
		},
		addModal(
			state,
			action: PayloadAction<{ id: number; modal: ModalDataType }>
		) {
			if (state.roomModals.id === action.payload.id) {
				state.roomModals.modals.push(action.payload.modal)
			}
		},
		deleteModal(state, action: PayloadAction<number>) {
			state.roomModals.modals = state.roomModals.modals.filter(
				(modal: ModalDataType) => modal.id !== action.payload
			)
		},
		saveImage(state, action: PayloadAction<saveImageType>) {
			const newImage = `imgs/${action.payload.modalId}/${action.payload.fileName}`
			const newSlides = action.payload.slides?.map(
				(img: string) => `imgs/${action.payload.modalId}/${img}`
			)
			const currentState = state.modal.data.find(
				data => data.id === action.payload.itemId
			) as ModalDataType
			const newModalContent = action.payload.preview
				? { ...currentState.content, image: newImage }
				: { ...currentState.content, childImage: newImage }

			// Обновляем данные модалки в истории открытых модалок
			state.modalDataHistory[0].forEach((modalItem: ExampleDataType) => {
				if (modalItem.id === action.payload.itemId) {
					modalItem.content = {
						...modalItem.content,
						...newModalContent,
					}
					if (action.payload.slides && action.payload.slides.length > 1) {
						modalItem.content = {
							...modalItem.content,
							slides: newSlides,
						}
					}
				}
				return modalItem
			})

			state.modal.data.forEach((modalItem: ExampleDataType) => {
				if (modalItem.id === action.payload.itemId) {
					modalItem.content = {
						...modalItem.content,
						...newModalContent,
					}
					if (action.payload.slides && action.payload.slides.length > 1) {
						modalItem.content = {
							...modalItem.content,
							slides: newSlides,
						}
					}
				}
				return modalItem
			})

			// Обновляем данные модалки в общем state всех модалок
			state.roomModals.modals.map((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					return modal.content.forEach((modalItem: ExampleDataType) => {
						if (modalItem.id === action.payload.itemId) {
							if (action.payload.preview) {
								modalItem.content.image = newImage
							}
							if (action.payload.slides && action.payload.slides.length > 1) {
								modalItem.content = {
									...modalItem.content,
									slides: newSlides,
								}
							}
							modalItem.content.childImage = newImage
						}
					})
				}
				return modal
			})
		},
		saveVideo(state, action) {
			const newVideo = `imgs/${action.payload.modalId}/${action.payload.fileName}`

			// Обновляем видео в истории открытых модалок
			state.modalDataHistory[0].forEach((modalItem: ExampleDataType) => {
				if (modalItem.id === action.payload.itemId) {
					modalItem.content.video = newVideo
				}
			})

			// Обновляем видео в общем state всех модалок
			state.roomModals.modals.map((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					modal.content.forEach((modalItem: ExampleDataType) => {
						if (modalItem.id === action.payload.itemId) {
							modalItem.content.video = newVideo
						}
					})
				}
				return modal
			})
		},
		saveExhibitImage(state, action: PayloadAction<saveImageType>) {
			const newImage = `imgs/${action.payload.modalId}/${action.payload.fileName}`

			// Обновляем изображение экспоната в истории открытых модалок
			state.modalInfoHistory.forEach((modalInfo: ModalInfoType) => {
				modalInfo.image = newImage
			})

			state.modal.info = {
				...state.modal.info,
				image: newImage,
			}

			// Обновляем изображение экспоната в общем state всех модалок
			state.roomModals.modals.forEach((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					modal.info.image = newImage
				}
			})
		},
		saveModel(state, action: PayloadAction<saveModelType>) {
			const newModel = `/models/${action.payload.fileName}`

			// Обновляем данные модели в истории открытых модалок
			state.modalDataHistory[0].forEach((modalItem: ExampleDataType) => {
				if (modalItem.id === action.payload.itemId) {
					modalItem.content.model = newModel
				}
			})

			// Обновляем данные модели в общем state всех модалок
			state.roomModals.modals.map((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					return modal.content.forEach((modalItem: ExampleDataType) => {
						if (modalItem.id === action.payload.itemId) {
							modalItem.content.model = newModel
						}
					})
				}
				return modal
			})
		},
		changePosition(state, action: PayloadAction<OrientaionType>) {
			// Обновляем вариант расположения контента в истории открытых модалок
			const newContent = (modalItem: ExampleDataType) => {
				return (modalItem.content = {
					...modalItem.content,
					gorizontalPos: action.payload.orientation,
				})
			}

			// Обновляем вариант расположения контента в открытой модалоке
			state.modalDataHistory[0].forEach((modalItem: ExampleDataType) => {
				if (modalItem.id === action.payload.itemId) {
					newContent(modalItem)
				}
			})

			// Обновляем вариант расположения контента в общем state всех модалок
			state.roomModals.modals.map((modal: ModalDataType) => {
				if (modal.modalName === action.payload.modalName) {
					return modal.content.forEach((modalItem: ExampleDataType) => {
						if (modalItem.id === action.payload.itemId) {
							newContent(modalItem)
						}
					})
				}
				return modal
			})
		},
		changeModalType(state, action: PayloadAction<ModalType>) {
			state.roomModals.modals = state.roomModals.modals.map(
				(modal: ModalDataType) => {
					if (modal.id === action.payload.id) {
						if (action.payload.type === 'exhibit') {
							const newInfo = {
								image: 'images/other/logo.png',
								title: 'Заголовок',
								text: 'Текст описания',
								copyrightText: 'Копирайт',
							}
							modal.modalType = 'content'
							modal.cupboard = false
							modal.info = newInfo
							modal.content = [{ title: '', text: '', content: {} }]
						} else if (action.payload.type === 'model') {
							const newContent = {
								model: '/models/model',
								childTitle: 'Заголовок',
								childText: 'Текст описания',
								copyrightText: 'Копирайт',
							}
							modal.modalType = 'model'
							modal.cupboard = false
							modal.info = { title: '', text: '' }
							modal.content = [{ title: '', text: '', content: newContent }]
						} else {
							modal.modalType = 'content'
							modal.cupboard = true
						}
					}
					return modal
				}
			)
		},
	},
	extraReducers: builder => {
		builder
			.addCase(
				getRoomModals.fulfilled,
				(state, action: PayloadAction<RoomModalType>) => {
					state.roomModals = action.payload
				}
			)
			.addCase(
				fetchModalData.fulfilled,
				(state, action: PayloadAction<RoomModalType>) => {
					state.roomModals = action.payload
				}
			)
	},
})

export default modalSlice.reducer
export const {
	showModal,
	setHistory,
	removeHistory,
	changeModalName,
	changeModalInfo,
	changeModalItemName,
	addModal,
	deleteModal,
	addModalItem,
	deleteModalItem,
	saveImage,
	saveVideo,
	saveExhibitImage,
	saveModel,
	changeModalTitle,
	changeModalText,
	changeModalCopyright,
	changePosition,
	changeModalType,
} = modalSlice.actions
