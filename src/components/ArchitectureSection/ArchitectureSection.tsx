import ReturnFromArchitecture from '../ReturnFromArchitecture/ReturnFromArchitecture'
import ArchitectureHelp from './ArchitectureHelp/ArchitectureHelp'
import './ArchitectureSection.scss'
import TitleBLock from './ContentItem/TitleBLock/TitleBLock'
import TextBlock from './ContentItem/ContentBlock/TextBlock/TextBlock'
import ContentBlockImage from './ContentItem/ContentBlock/ContentBlockImage/ContentBlockImage'
import { OBJ_IMAGES_ARCHITECTURE } from '../../consts/consts_ArchitecturePage'
import { useAppSelector, useLocalText } from '../../hooks'


const ArchitectureSection = () => {

    const title = useLocalText(
        useAppSelector(state => state.lang.appText.architecturePage.architectureTitle)
    )
    const imagesText = useLocalText(
        useAppSelector(state => state.lang.appText.architecturePage.imagesArchitectureText)
    )
    const text = useLocalText(
        useAppSelector(state => state.lang.appText.architecturePage.architectureText)
    )

    return (
        <div className="architectureSection">
            <ReturnFromArchitecture />
            <div className="architectureSection__wrapper">
                <div className="architectureSection__content content">
                    <div className='content__item contentItem plansAndDrawings'>
                        <TitleBLock title={title.plansAndDrawings} />
                        <div className="contentItem__contentBlock contentBlock">
                            <TextBlock
                                text={text.plansAndDrawings[0]}
                            />
                            <ContentBlockImage
                                imagesArchitecture={OBJ_IMAGES_ARCHITECTURE.pineTrunk.image}
                                className={'pineTrunk'}
                                text={imagesText.pineTrunk}
                            />
                            <TextBlock
                                text={text.plansAndDrawings[1]}
                            />
                            <TextBlock
                                text={text.plansAndDrawings[2]}
                            />
                            <TextBlock
                                text={text.plansAndDrawings[3]}
                            />
                        </div>
                    </div>
                    <div className='content__item contentItem Schluter'>
                        <TitleBLock title={title.Schluter} />
                        <div className="contentItem__contentBlock contentBlock">
                            <TextBlock
                                text={text.Schluter[0]}
                            />
                            <ContentBlockImage
                                imagesArchitecture={OBJ_IMAGES_ARCHITECTURE.projectCopy.image}
                                className={'projectCopy'}
                                text={imagesText.projectCopy}
                            />
                        </div>
                    </div>
                    <div className='content__item contentItem Gerbel'>
                        <TitleBLock title={title.Gerbel} />
                        <div className="contentItem__contentBlock contentBlock">
                            <TextBlock
                                text={text.Gerbel[0]}
                            />
                            <TextBlock
                                text={text.Gerbel[1]}
                            />
                        </div>
                    </div>
                    <div className='content__item contentItem Chiaveri'>
                        <TitleBLock title={title.Chiaveri} />
                        <div className="contentItem__contentBlock contentBlock">
                            <TextBlock
                                text={text.Chiaveri[0]}
                            />
                            <TextBlock
                                text={text.Chiaveri[1]}
                            />
                            <ContentBlockImage
                                imagesArchitecture={OBJ_IMAGES_ARCHITECTURE.libraryFacade.image}
                                className={'libraryFacade'}
                                text={imagesText.libraryFacade}
                            />
                        </div>
                    </div>
                    <div className='content__item contentItem armillarySphere'>
                        <TitleBLock title={title.armillarySphere} />
                        <div className="contentItem__contentBlock contentBlock">
                            <TextBlock
                                text={text.armillarySphere[0]}
                            />
                            <ContentBlockImage
                                imagesArchitecture={OBJ_IMAGES_ARCHITECTURE.armillarySphere.image}
                                className={'armillarySphere'}
                                text={imagesText.armillarySphere}
                            />
                            <TextBlock
                                text={text.armillarySphere[1]}
                            />
                        </div>
                    </div>
                    <div className='content__item contentItem statues'>
                        <TitleBLock title={title.statues} />
                        <div className="contentItem__contentBlock contentBlock">
                            <TextBlock
                                text={text.statues[0]}
                            />
                            <ContentBlockImage
                                imagesArchitecture={OBJ_IMAGES_ARCHITECTURE.statues.image}
                                className={'statues'}
                                text={imagesText.statues}
                            />
                        </div>
                    </div>
                </div>
                <div className="architectureSection__help">
                    <ArchitectureHelp />
                </div>
            </div>
        </div>
    )
}

export default ArchitectureSection