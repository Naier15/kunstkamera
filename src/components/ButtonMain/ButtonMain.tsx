import './ButtonMain.scss'
import { useCallback, useContext, useState } from 'react'
import { RouteShiftingContext } from '../../context'
import { useAppSelector, useLocalText } from '../../hooks'


type Props = {
    currentTime: number
}

const ButtonMain = ({ currentTime }: Props) => {

    const [isHover, setIsHover] = useState(false)
    const routeShifting = useContext(RouteShiftingContext)

    const handleClick = useCallback(() => {
        routeShifting?.('/print')
    }, [routeShifting])

    const text = useLocalText(
        useAppSelector(state => state.lang.appText.startingPageText.mainButtonText)
    )

    return (
        <div className='buttonMainWrapper' onClick={handleClick} >
            {currentTime >= 9.8 &&
                <button
                    className={`buttonMain buttonMain-next-${isHover && 'hover'}`}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    { text }
                </button>
            }
        </div>
    )
};

export default ButtonMain