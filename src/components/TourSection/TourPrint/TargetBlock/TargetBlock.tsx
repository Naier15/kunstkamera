import './TargetBlock.scss'
import { useContext } from 'react'
import { ListIndexContext } from '../../../../context'
import TargetBlockItem from './TargetBlockItem/TargetBlockItem'
import { ARR_NAMES_BLOCK } from '../../../../consts/consts_ExpositionTourPage'

const TargetBlock = () => {

    const { setHoverIndex } = useContext(ListIndexContext)

    return (
        <div className='targetBlock blockPrint'>
            {ARR_NAMES_BLOCK.map((block, index) => {
                return (
                    <div className={`blockPrint${++index} blockPrint-section`} key={index}>
                        {block.map(([item, id, link, img]) => <TargetBlockItem
                            key={id}
                            className={item as string}
                            onMouseEnter={() => setHoverIndex?.(id as number)}
                            onMouseLeave={() => setHoverIndex?.(null)}
                            link={link as string}
                            img={img as string}
                        />)}
                    </div>
                )
            })}
        </div>
    )
}

export default TargetBlock