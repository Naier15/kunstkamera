import { useAppSelector, useLargeText, useLocalText } from '../../hooks'
import { disableContextMenu } from '../../utils'
import './HelpWidget.scss'

const HelpWidget = () => {

    const helpWidgetText = useLocalText(
        useAppSelector(state => state.lang.appText.startingPageText.helpWidgetText)
    )
    const isLargeText = useLargeText()

    return (
        <div className='helpWidget__container'>
            <div className={`helpWidget helpWidget${isLargeText && '-visuallyImpaired'}`}>
                <div className='helpWidget__text helpWidgetText'>
                    <div className='helpWidgetText__subtitle'>
                        <span className={isLargeText ? 'visuallyImpaired' : ''}>
                            {helpWidgetText.subtitle}
                        </span>
                    </div>
                    <div className='helpWidgetText__text'>
                        <span className={isLargeText ? 'visuallyImpaired' : ''}>
                            {helpWidgetText.text}
                        </span>
                    </div>
                </div>
                <div className='helpWidget__icon'>
                    <img
                        onContextMenu={disableContextMenu}
                        src='assets/images/svg/HelpWidgetIcon.svg'
                        alt='HelpWidgetIcon'
                    />
                </div>
            </div>
        </div>
    )
}

export default HelpWidget