import './TargetBlockItem.scss'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ListIndexContext, RouteShiftingContext } from '../../../../../context'
import { addClassNamesByIndex, disableContextMenu } from '../../../../../utils'

type Props = {
    className: string
    onMouseEnter: () => void
    onMouseLeave: () => void
    link: string
    img: string
}

const TargetBlockItem = ({ className, onMouseEnter, onMouseLeave, link, img }: Props) => {

    const { hoverIndex } = useContext(ListIndexContext)
    const routeShifting = useContext(RouteShiftingContext)
    const classHover = addClassNamesByIndex(hoverIndex!)

    return (
        <Link
            to={link}
            className={`${className} block-item ${className}-${classHover}`}
            onClick={() => routeShifting?.(link)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <img 
                className='block-item__img' 
                src={img} 
                onContextMenu={disableContextMenu}
                alt='preview' />
        </Link>
    )
}

export default TargetBlockItem;