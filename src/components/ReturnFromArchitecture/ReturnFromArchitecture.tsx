import './ReturnFromArchitecture.scss'
import { useCallback, useContext } from 'react'
import ControlButton from '../UI/ControlButton/ControlButton'
import { RouteShiftingContext } from '../../context'

const ReturnFromArchitecture = () => {

    const routeShifting = useContext(RouteShiftingContext)

    const handleClick = useCallback(() => {
        routeShifting?.('/print')
    }, [routeShifting])

    return (
        <div className='returnButton' onClick={handleClick} >
            <ControlButton
                name={'return'}
                img={'assets/images/svg/iconClose.svg'}
            />
        </div>
    )
}

export default ReturnFromArchitecture