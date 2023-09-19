import './SliderPointer.scss'
import { useEffect, useState } from 'react'

type Props = {
    targetArchitecture: boolean
    targetExposition: boolean
}

const SliderPointer = ({ targetArchitecture, targetExposition }: Props) => {

    const [side, isSide] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            if (targetExposition) {
                isSide('left')
            } else if (targetArchitecture) {
                isSide('right')
            } else {
                isSide('')
            }
        }, 350)
    }, [targetArchitecture, targetExposition])

    return (
        <div className={`sliderPointer sliderPointer-${side}-${(!targetArchitecture && !targetExposition) && 'start'}`}>
            <div className={`sliderPointer__position
                ${targetArchitecture && 'sliderPointer__position-architecture'}
                ${targetExposition && 'sliderPointer__position-exposition'}
            `}>
                <div className='pointer__wrapper'>
                    <div className='pointer__column'></div>
                    <div className='pointer__body'>
                        <img 
                            className='pointer__pointerArrows'
                            src='assets/images/svg/PointerArrows.svg' 
                            alt='pointerArrows' 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderPointer