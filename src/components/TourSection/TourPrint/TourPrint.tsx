import './TourPrint.scss'
import TargetBlock from './TargetBlock/TargetBlock'
import TargetList from './TargetList/TargetList'
import { useState } from 'react'
import { ListIndexContext } from '../../../context'
import { disableContextMenu } from '../../../utils'

const TourPrint = () => {

    const [hoverIndex, setHoverIndex] = useState<number | null>(null)

    return (
        <div className='tourPrint'>
            <div className="tourPrint__conteiner">
                <ListIndexContext.Provider value={{
                    hoverIndex,
                    setHoverIndex,
                }}>
                    <TargetList />
                    <div className="tourPrint__wrapper">
                        <TargetBlock />
                        <img
                            onContextMenu={disableContextMenu}
                            src='assets/images/png/interiorFullPrint.png'
                            alt='tourPrint'
                            className='tourPrint__img' />
                    </div>
                </ListIndexContext.Provider>
            </div>
        </div>
    )
}

export default TourPrint