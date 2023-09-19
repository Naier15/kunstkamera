import { Link } from 'react-router-dom'
import './Logo.scss'
import { useState } from 'react'

const Logo = () => {

    const [isHover, setIsHover] = useState(false)

    return (
        <Link
            to='https://www.kunstkamera.ru/'
            className={`logo logo-${isHover && 'hover'}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className='logo__wrapper'>
                <img src='assets/images/png/logo.png' alt='logo' />
            </div>
        </Link>
    )
}

export default Logo