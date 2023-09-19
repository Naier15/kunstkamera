import { useEffect, useState } from 'react'
import Title from '../../UI/Title/Title'
import './VideoTitle.scss'
import { useAppSelector, useLargeText, useLocalText } from '../../../hooks'


type Props = {
    currentTime: number
}

const VISIBLE_CONTAINER_TITLE_TIME_START = 0.2
const VISIBLE_CONTAINER_TITLE_TIME_END = 7.3
const CHANGE_TITLER_VIDEO = 4.3

const VideoTitle = ({ currentTime }: Props) => {

    const videoTitleText = useLocalText(
        useAppSelector(state => state.lang.appText.startingPageText.videoTitleText)
    )
    const isLargeText = useLargeText()

    const [isContainerVisible, setIsContainerVisible] = useState<boolean>(false)
    const [headers, setHeaders] = useState<[boolean, string][]>([
        [ true, videoTitleText.firstTitle ],
        [ false, videoTitleText.secondTitle ]
    ])

    useEffect(() => {
        if (currentTime >= VISIBLE_CONTAINER_TITLE_TIME_START) {
            setIsContainerVisible(true)
        }
        if (currentTime >= VISIBLE_CONTAINER_TITLE_TIME_END) {
            setIsContainerVisible(false)
        }
    }, [currentTime])

    useEffect(() => {
        if (currentTime >= CHANGE_TITLER_VIDEO) {
            setHeaders([
                [ false, videoTitleText.firstTitle ],
                [ true, videoTitleText.secondTitle ]
            ])
        } else if (currentTime < CHANGE_TITLER_VIDEO) {
            setHeaders([
                [ true, videoTitleText.firstTitle ],
                [ false, videoTitleText.secondTitle ]
            ])
        }

    }, [currentTime, videoTitleText])

    return (
        <div className={`videoTitle videoTitle-${!isContainerVisible && 'hidden'}`}>
            <div className={`videoTitle__container ${isLargeText && 'videoTitle__container-visuallyImpaired'}`}>
                {headers.map(([visible, title], index) => (
                    <Title 
                        key={index}
                        title={title} 
                        isVisible={visible} 
                        className={'video'}
                    />
                ))}
            </div>
        </div>
    )
}

export default VideoTitle