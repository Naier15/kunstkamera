import './ModalBanner.scss'
import { useAppSelector, useLargeText, useLocalText } from '../../hooks'

const ModalBanner = () => {

    const isLargeText = useLargeText()
    const modalBannerText = useLocalText(
        useAppSelector(state => state.lang.appText.modalMainText.modalBanner.text)
    )

    return (
        <div className='modalBanner'>
            <div className='modalBanner__icon'>
                <img src='assets/images/svg/gazprom.svg' alt='gazprom' />
            </div>
            <div className='modalBanner__content modalBannerContent'>
                <div className={`modalBannerContent__text ${isLargeText && 'modalBannerContent__text-visuallyImpaired'}`}>
                    {modalBannerText}
                </div>
            </div>
        </div>
    )
}

export default ModalBanner