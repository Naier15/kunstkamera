import './TargetList.scss'
import { useContext } from 'react'
import { ListIndexContext } from '../../../../context'
import TargetListItem from './TargetListItem/TargetListItem'
import { useAppSelector, useLargeText, useLocalText } from '../../../../hooks'

type Item = {
    name: string
    symbol: string
}

const TargetList = () => {

    const { setHoverIndex } = useContext(ListIndexContext)
    const isLargeText = useLargeText()
    const tourListNames = useLocalText(
        useAppSelector(state => state.lang.appText.expositionTourPage.tourListNames)
    )

    return (
        <div className='targetList'>
            <div className={`targetList__left ${isLargeText && 'targetList__left-visuallyImpaired'}`}>
                {tourListNames[0].map(([item, className, id, link], index) =>
                    <TargetListItem
                        key={index}
                        size={'left'}
                        children={item as Item}
                        className={className as string}
                        onMouseEnter={() => setHoverIndex?.(id as number)}
                        onMouseLeave={() => setHoverIndex?.(null)}
                        link={link as string}
                    />)
                }
            </div >
            <div className={`targetList__right ${isLargeText ? 'targetList__right-visuallyImpaired' : ''}`}>
                {tourListNames[1].map(([item, className, id, link], index) =>
                    <TargetListItem
                        key={index}
                        size={'right'}
                        children={item as Item}
                        className={className as string}
                        onMouseEnter={() => setHoverIndex?.(id as number)}
                        onMouseLeave={() => setHoverIndex?.(null)}
                        link={link as string}
                    />)
                }
            </div >
        </div >
    )
}

export default TargetList;