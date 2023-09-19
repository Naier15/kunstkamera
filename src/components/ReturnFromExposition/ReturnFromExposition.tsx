import './ReturnFromExposition.scss'
import ControlButton from '../UI/ControlButton/ControlButton'
import { Link } from 'react-router-dom'

const ReturnFromExposition = () => {

    return (
        <div className='returnButton'>
            <Link to='/print'>
                <ControlButton
                    name={'return'}
                    img={'assets/images/svg/iconClose.svg'}
                />
            </Link>
        </div>
    )
}

export default ReturnFromExposition