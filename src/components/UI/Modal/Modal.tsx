import { useEffect, useMemo } from 'react'
import './Modal.scss'
import { createPortal } from 'react-dom'
import CloseButton from './CloseButton/CloseButton'
import Logo from '../Logo/Logo'
import Section from '../Section/Section'
import TitleDefault from '../TitleDefault/TitleDefault'
import ModalBanner from '../../ModalBanner/ModalBanner'
import Text from '../Text/Text'
import { useAppSelector, useLocalText } from '../../../hooks'


const modalRootElement = document.querySelector('#modal') as HTMLDivElement

type Props = {
    isModal: boolean
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ isModal, setIsModal }: Props) => {

    const element = useMemo(() => document.createElement('div'), [])
    const modalMainText = useLocalText(
        useAppSelector(state => state.lang.appText.modalMainText.modalSection)
    )

    useEffect(() => {
        modalRootElement.appendChild(element)
        return () => {
            modalRootElement.removeChild(element)
        }
    }, [isModal, element])

    useEffect(() => {
        function handleEsc(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsModal(false)
            }
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [setIsModal])

    if (isModal) {
        return createPortal(
            <div className="modalMain" >
                <Logo />
                <div className="modal__content">
                    <div className="content__head">
                        <Section nameSection={'section-about'}>
                            <TitleDefault title={modalMainText.sectionAbout[0].title} />
                            <div>
                                {modalMainText?.sectionAbout[0].text.map((item, index) => 
                                    <Text key={index} text={item} />
                                )}
                            </div>
                        </Section>
                        <ModalBanner />
                    </div>
                    <Section nameSection={'section-team'}>
                        <div className='team__block'>
                            <TitleDefault title={modalMainText?.sectionPerformers[0].title} />
                            <div>
                                {modalMainText?.sectionPerformers[0].text.map((item, index) => <Text key={index} text={item} />)}
                            </div>
                        </div>
                        <div className='team__block'>
                            <TitleDefault title={modalMainText.sectionModelers[0].title} />
                            <div>
                                {modalMainText?.sectionModelers[0].text.map((item, index) => <Text key={index} text={item} />)}
                            </div>
                        </div>
                        <div className='team__block team__block-development'>
                            <div className="_block">
                                <TitleDefault title={modalMainText.sectionDevelopmentAndPhotogrammetry[0].title} />
                                <div>
                                    {modalMainText.sectionDevelopmentAndPhotogrammetry[0].text.map((item, index) => <Text key={index} text={item} />)}
                                </div>
                            </div>
                            <div className='_block'>
                                <TitleDefault title={modalMainText.sectionDevelopmentAndPhotogrammetry[1].title} />
                                <div>
                                    {modalMainText.sectionDevelopmentAndPhotogrammetry[1].text.map((item, index) => <Text key={index} text={item} />)}
                                </div>
                            </div>
                        </div>
                        <div className='team__block team__block-consultants'>
                            <div className="_block">
                                <TitleDefault title={modalMainText.sectionConsultantsAndVideo[0].title} />
                                <div>
                                    {modalMainText.sectionConsultantsAndVideo[0].text.map((item, index) => <Text key={index} text={item} />)}
                                </div>
                            </div>
                            <div className="_block">
                                <TitleDefault title={modalMainText.sectionConsultantsAndVideo[1].title} />
                                <div>
                                    {modalMainText.sectionConsultantsAndVideo[1].text.map((item, index) => <Text key={index} text={item} />)}
                                </div>
                            </div>
                        </div>
                    </Section>
                    <Section nameSection={'section-sources'}>
                        <TitleDefault title={modalMainText.sectionSources[0].title} />
                        <div className='sectionSources-content'>
                            {modalMainText.sectionSources[0].text.map((item, index) => <Text key={index} text={item} />)}
                        </div>
                    </Section>
                </div>
                <CloseButton setIsModal={setIsModal} />
            </div>,
            element
        )
    }
    return null
};

export default Modal