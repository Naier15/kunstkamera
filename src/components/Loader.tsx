import { useState, useEffect, useRef, useCallback } from 'react'
import './styles.scss'


type Props = {
    isLoading: boolean
    speed?: number
    blackOutTimer?: number
    playTillEnd?: boolean
}

const Loader = ({ isLoading, speed = 0.4, blackOutTimer = 2000, playTillEnd = false }: Props) => {
    
    const video = useRef<HTMLVideoElement>(null)
    const [visible, setVisible] = useState<boolean>(true)
    const [appear, setAppear] = useState<boolean>(true)
    const [videoEnded, setVideoEnded] = useState<boolean>(false)
    const [firstRender, setFirstRender] = useState<boolean>(true)

    const startVideo = useCallback(() => {
        setVideoEnded(false)   
        if (!video.current) return
        const action = () => {
            if (!video.current) return
            video.current.playbackRate = speed
            video.current.currentTime = 0
            video.current.play() 
            video.current.onended = () => setVideoEnded(true)   
        }
        if (firstRender) {
            video.current.onloadedmetadata = action 
        } else {
            action()
        }
    }, [firstRender])

    useEffect(() => {
        if (!isLoading) return
        setVisible(true)
        setAppear(true)
    }, [isLoading])

    useEffect(() => {
        if (!visible) return
        startVideo()
        setFirstRender(false)
    }, [visible])

    useEffect(() => {
        if (isLoading || !appear || (playTillEnd && !videoEnded)) return 
        setAppear(false)
        setTimeout(() => {
            setVisible(false)
        }, blackOutTimer)
    }, [isLoading, videoEnded])

    return <>
        { visible &&
            <div className={`fon ${appear ? 'appear' : 'disappear'}`}>
                <video
                    src='assets/videos/logo2.mp4'
                    ref={video}
                    className={`video-loader`}
                    muted={true}
                />
            </div>
        }
    </>
}

export default Loader