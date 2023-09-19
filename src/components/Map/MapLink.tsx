import { Link } from 'react-router-dom'
import './styles.scss'

export const handleHover = (
	sub: React.RefObject<HTMLAnchorElement>,
	link: React.RefObject<HTMLAnchorElement>,
	pins: React.RefObject<HTMLDivElement>[]
) => {
	sub.current!.style.textDecoration = 'underline'
	sub.current!.style.color = '#FFE6D2'
	link.current!.style.opacity = '1'
    pins.forEach(pin => {
        if (pin.current == null) return
        pin.current.classList.add('active')
    })
}

export const handleUnhover = (
	sub: React.RefObject<HTMLAnchorElement>,
	link: React.RefObject<HTMLAnchorElement>,
	pins: React.RefObject<HTMLDivElement>[]
) => {
	sub.current!.style.textDecoration = 'none'
	sub.current!.style.color = '#c6a984'
	link.current!.style.opacity = '0'
	pins.forEach(pin => {
        if (pin.current == null) return
        pin.current.classList.remove('active')
    })
}

type Props = {
    to: string
    link: React.RefObject<HTMLAnchorElement>,
    sub: React.RefObject<HTMLAnchorElement>, 
    pins: React.RefObject<HTMLDivElement>[],
    linkView: LinkView
}

export enum LinkView {
    CENTRAL,
    UNFULL,
    DEFAULT
}

const MapLink = ({to, link, sub, pins, linkView}: Props) => {

	return <Link 
        to={to}
        ref={link} 
        className='link' 
        onMouseEnter={() => handleHover(sub, link, pins)} 
        onMouseLeave={() => handleUnhover(sub, link, pins)}
        draggable={false}
    >
        {   linkView === LinkView.CENTRAL ? 
                <img className='pic' src='maps/center_room_selector.png' draggable='false' alt='link'/> :
            linkView === LinkView.UNFULL ?
                <img className='pic' src='maps/unfull_room_selector.png' draggable='false' alt='link'/> :
                <div className='pic2' draggable='false'></div>
        }    
    </Link>
}

export default MapLink
