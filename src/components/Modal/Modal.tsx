import { useEffect, useRef } from 'react'
import { useEscapeKey } from '../../hooks'
import './Modal.scss'


type Props = {
	modalStyle?: any
	children: any
	showModal: boolean
	onClose: () => void
	backdropStyle?: any
}

const Modal = ({
	modalStyle,
	children,
	showModal,
	onClose,
	backdropStyle,
}: Props) => {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (showModal) {
			if (null !== modalRef.current) modalRef.current.classList.add('visible')
		} else {
			if (null !== modalRef.current)
				modalRef.current.classList.remove('visible')
		}
	}, [showModal])

	useEscapeKey(onClose)

	return (
		<>
			<div
				ref={modalRef}
				style={backdropStyle}
				className='modal__wrap'
				onClick={e => e.currentTarget === e.target && onClose()}
			>
				<div
					style={modalStyle}
					className={`room-modal ${modalStyle.full ? 'full' : ''} ${
						modalStyle.roomInfo ? 'room' : ''
					} ${modalStyle.contentInfo ? 'content' : ''}`}
				>
					<div
						className={`room-modal__wrap ${
							modalStyle.cupboard ? 'column-center' : 'row-center'
						}`}
					>
						{children}
					</div>
					<div onClick={onClose} className='button-close'>
						<svg
							width='54'
							height='54'
							viewBox='0 0 54 54'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle cx='27' cy='27' r='27' />
							<path
								d='M17 16L27 26.7442M37 38L27 26.7442M27 26.7442L37 16M27 26.7442L17 38'
								strokeWidth='2'
							/>
						</svg>
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal
