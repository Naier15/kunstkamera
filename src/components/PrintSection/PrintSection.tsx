import './PrintSection.scss'
import SliderPrint from './SliderPrint/SliderPrint'
import SettingButtons from '../SettingButtons/SettingButtons'

const PrintSection = () => {

    return (
        <div className='printSection'>
            <div className="printSection__container">
                <SliderPrint />
                <SettingButtons />
            </div>
        </div>
    )
}

export default PrintSection