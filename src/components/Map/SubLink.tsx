import { Link } from 'react-router-dom'
import { handleHover, handleUnhover } from './MapLink'
import './styles.scss'
import { useLargeText } from '../../hooks'

type Props = {
    to: string
    link: React.RefObject<HTMLAnchorElement>
    sub: React.RefObject<HTMLAnchorElement> 
    pins: React.RefObject<HTMLDivElement>[]
    title: string
    symbol: string
}

const MapLink = ({to, link, sub, pins, title, symbol}: Props) => {

    const isLargeText = useLargeText()

	return <Link 
        to={to} 
        className={`sub ${isLargeText && 'sub-large-text'}`} 
        ref={sub} 
        onMouseEnter={() => handleHover(sub, link, pins)} 
        onMouseLeave={() => handleUnhover(sub, link, pins)}
    >
        <span className='ll'>{title}</span>
        <span className='rr'>{symbol}</span>   
    </Link>
}

export default MapLink