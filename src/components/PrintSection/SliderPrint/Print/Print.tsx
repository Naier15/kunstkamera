import './Print.scss'
import { Link } from 'react-router-dom'
import { useContext, useCallback } from 'react'
import { RouteShiftingContext } from '../../../../context'
import { useAppSelector, useLargeText, useLocalText } from '../../../../hooks'
import { disableContextMenu } from '../../../../utils'

type Props = {
    targetArchitecture: boolean
    targetExposition: boolean
    setTargetArchitecture: React.Dispatch<React.SetStateAction<boolean>>
    setTargetExposition: React.Dispatch<React.SetStateAction<boolean>>
}

const Print = ({ 
        targetArchitecture, 
        targetExposition, 
        setTargetArchitecture, 
        setTargetExposition 
    }: Props) => {

    const routeShifting = useContext(RouteShiftingContext)
    const isLargeText = useLargeText()
    const printPage = useLocalText(
        useAppSelector(state => state.lang.appText.printPage)
    )

    const handleClick = useCallback(() => {
        routeShifting?.('/architecture')
    }, [routeShifting])

    return (
        <div className='print'>
            <div className="print__container">
                <div
                    className="print__buffer"
                    onMouseEnter={() => {
                        setTargetExposition(false)
                        setTargetArchitecture(false)
                    }}
                ></div>
                <div
                    onContextMenu={disableContextMenu}
                    className={`print__clip clip-architecture`}
                    onMouseEnter={() => setTargetExposition(true)}
                    onMouseLeave={() => setTargetExposition(false)}
                >
                    <Link to='/map'>
                        <div className={`print__block print__blockExposition print__blockExposition-${targetExposition && 'expand'}`}>
                            <div className={`print-block__text block-text block-text-${targetExposition ? 'visible' : 'hidden'}`}>
                                <div className={`block-text__title ${isLargeText && 'block-text__title-visuallyImpaired'}`}>
                                    {printPage.expositionText.title}
                                </div>
                                <div className={`block-text__subtitle ${isLargeText && 'block-text__subtitle-visuallyImpaired'}`}>
                                    {printPage.expositionText.subtitle}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div
                    onContextMenu={disableContextMenu}
                    className={`print__clip clip-exposition`}
                    onMouseEnter={() => setTargetArchitecture(true)}
                    onMouseLeave={() => setTargetArchitecture(false)}
                >
                    <div
                        className={`print__block print__blockArchitecture print__blockArchitecture-${targetArchitecture && 'expand'}`}
                        onClick={handleClick}
                    >
                        <div className={`print-block__text block-text block-text-${targetArchitecture ? 'visible' : 'hidden'}`}>
                            <div className={`block-text__title ${isLargeText && 'block-text__title-visuallyImpaired'}`}>
                                {printPage?.architectureText?.title}
                            </div>
                            <div className={`block-text__subtitle ${isLargeText && 'block-text__subtitle-visuallyImpaired'}`}>
                                {printPage?.architectureText?.subtitle}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Print