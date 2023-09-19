import './TourSection.scss'
import ReturnFromExposition from '../ReturnFromExposition/ReturnFromExposition'
import SettingButtons from '../SettingButtons/SettingButtons'
import TourTitle from './TourTitle/TourTitle'
import TourPrint from './TourPrint/TourPrint'

const TourSection = () => {

    return (
        <div className='tourSection'>
            <div className='tourSection__conteiner'>
                <TourTitle />
                <TourPrint />
                <div className='tourSection__buttons'>
                    <ReturnFromExposition />
                    <SettingButtons />
                </div>
            </div>
        </div>
    )
}

export default TourSection