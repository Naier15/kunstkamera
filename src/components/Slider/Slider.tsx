import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { staticHost } from '../..'
import EditText from '../EditText/EditText'
import ImageDropzone from '../Dropzones/ImageDropzone'
import './style.scss'
import { ExampleDataType } from '../../store/modalSlice'


type Props = {
	id: number
	item: ExampleDataType
	modalName: string
	edit: boolean
}

const Slider = ({ id, item, modalName, edit }: Props) => {
	const images = item.content.slides || []
	const [index, setIndex] = useState(0)
	const len = images.length - 1

	const [inProp, setInProp] = useState(false)
	const nodeRef = useRef(null)

	const [editMode, setEditMode] = useState(false)

	function toggleNext() {
		if (index < len) setIndex(index + 1)
		setInProp(true)
	}
	function togglePrev() {
		if (index > 0) setIndex(index - 1)
		setInProp(true)
	}

	return (
		<div id='slider-content'>
			{edit && editMode ? (
				<div className='slides-drop-block'>
					<ImageDropzone itemId={item?.id} modalId={id} modalName={modalName} />
				</div>
			) : (
				<>
					{edit && (
						<span className='edit-btn' onClick={() => setEditMode(true)}>
							&#9998;
						</span>
					)}
					<div id='slider'>
						<div id='wrapper'>
							<button
								onClick={togglePrev}
								className='left'
								style={index === 0 ? { display: 'none' } : { display: 'block' }}
							>
								<svg
									width='55'
									height='55'
									viewBox='0 0 55 55'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<circle
										cx='27.0504'
										cy='27.0505'
										r='27'
										transform='rotate(-89.893 27.0504 27.0505)'
									/>
									<path
										d='M32 38.0205L21.0205 27L32.0411 16.0206'
										fill='none'
										strokeWidth='2'
									/>
								</svg>
							</button>
							<CSSTransition
								nodeRef={nodeRef}
								in={inProp}
								timeout={300}
								classNames='fade'
								onEnter={() => setInProp(false)}
								onExited={() => setInProp(false)}
							>
								<div ref={nodeRef} className='slide-image'>
									<img src={`${staticHost}/${images[index]}`} alt='img' />
								</div>
							</CSSTransition>
							<button
								onClick={toggleNext}
								className='right'
								style={
									index === len ? { display: 'none' } : { display: 'block' }
								}
							>
								<svg
									width='55'
									height='55'
									viewBox='0 0 55 55'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<circle
										cx='27'
										cy='27'
										r='27'
										transform='matrix(-0.00186745 -0.999998 -0.999998 0.00186745 55 54)'
									/>
									<path
										d='M23 38.0205L33.9795 27L22.9589 16.0206'
										fill='none'
										strokeWidth='2'
									/>
								</svg>
							</button>
						</div>
					</div>
				</>
			)}
			<div className='slider-text-block'>
				<div>
					<EditText
						text={item.content.childTitle}
						modalName={modalName}
						textStyle={'slide-title'}
						editType={'modal-title'}
						edit={edit}
						itemId={item.id}
					/>
					<EditText
						text={item.content.childSubtitle}
						modalName={modalName}
						textStyle={'slide-subtitle'}
						editType={'modal-subtitle'}
						edit={edit}
						itemId={item.id}
					/>
				</div>
				<div className='slider-text-content'>
					<EditText
						text={item.content.childText}
						modalName={modalName}
						textStyle={'slide-text'}
						editType={'modal-text'}
						edit={edit}
						itemId={item.id}
					/>
				</div>
			</div>
		</div>
	)
}

export default Slider
