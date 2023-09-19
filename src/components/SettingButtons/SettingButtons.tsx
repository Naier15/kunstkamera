import './SettingButtons.scss'
import { useMemo, useState } from 'react'
import ControlButton from '../UI/ControlButton/ControlButton'
import Modal from '../UI/Modal/Modal'
import { useAppDispatch, useAppSelector, useLargeText } from '../../hooks'
import { Languages, switchLanguage } from '../../store/languageSlice'
import { toggleLargeText } from '../../store/largeTextSlice'


const SettingButtons = () => {
    const [isModal, setIsModal] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const isLargeText = useLargeText()
    const language = useAppSelector(state => state.lang.language)

    const arrControlButtons = useMemo(() => {
        const visuallyImpairedTurn = () => {
            if (isLargeText) {
                dispatch(toggleLargeText(false))
            } else {
                dispatch(toggleLargeText(true))
            }
        }
        const toggleLanguage = () => {
            if (language === Languages.RUSSIAN) {
                dispatch(switchLanguage(Languages.ENGLISH))
            } else {
                dispatch(switchLanguage(Languages.RUSSIAN))
            }
        }
    
        const eyeIcon = isLargeText ? 
            'assets/images/svg/eyeOn.svg' : 
            'assets/images/svg/eyeOff.svg'
    
        return [
            { name: 'visuallyImpaired', img: eyeIcon, handler: visuallyImpairedTurn },
            // { name: 'language', img: languageIcon, handler: toggleLanguage },
            { name: 'info', img: 'assets/images/svg/info.svg', handler: () => setIsModal(true) },
        ]
    }, [dispatch, isLargeText, language])


    return (
        <div className='settingButtons'>
            { arrControlButtons.map(({name, img, handler}, index) =>
                <ControlButton
                    key={index}
                    name={name}
                    img={img}
                    handler={handler}
                />) }
            <Modal
                isModal={isModal}
                setIsModal={setIsModal}
            />
        </div>
    )
}

export default SettingButtons