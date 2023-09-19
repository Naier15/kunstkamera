import './TourTitle.scss'
import Title from '../../UI/Title/Title'
import { useAppSelector, useLocalText } from '../../../hooks'

const TourTitle = () => {

    const textTitles = useLocalText(
        useAppSelector(state => state.lang.appText.expositionTourPage.tourTitleText)
    )

    return (
        <div className='tourTitle'>
            <div className='tourTitle__conteiner'>
                <Title title={textTitles} isVisible={true} className={'tourTitle'} />
            </div>
        </div>
    )
}

export default TourTitle