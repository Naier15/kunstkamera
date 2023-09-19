import { ListIndexContext, RouteShiftingContext } from '../../../../../context'
import { useLargeText } from '../../../../../hooks'
import { addClassNamesByIndex } from '../../../../../utils'
import './TargetListItem.scss'
import { useCallback, useContext } from 'react'


type Props = {
    children: {
        name: string
        symbol: string
    }
    size: string
    className: string
    onMouseEnter: () => void
    onMouseLeave: () => void
    link: string
}

const TargetListItem = ({ 
        children, 
        size, 
        className, 
        onMouseEnter, 
        onMouseLeave, 
        link 
    }: Props) => {

    const { hoverIndex } = useContext(ListIndexContext)
    const routeShifting = useContext(RouteShiftingContext)
    const classHover = addClassNamesByIndex(hoverIndex!)
    const isLargeText = useLargeText()

    const handleClick = useCallback(() => {
        routeShifting?.(link)
    }, [routeShifting, link])

    return (
        <div
            className={`targetListItem targetListItem-${size} ${className}-${classHover}`}
            onClick={handleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className={`targetListItem__name ${isLargeText && 'targetListItem__name-visuallyImpaired'}`}>
                {children.name}
            </div>
            <div className={`targetListItem__symbol ${isLargeText && 'targetListItem__symbol-visuallyImpaired'}`}>
                {children.symbol}
            </div>
        </div>
    )
}

export default TargetListItem