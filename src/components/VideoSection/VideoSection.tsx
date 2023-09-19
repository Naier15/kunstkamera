import './VideoSection.scss'
import VideoTitle from './VideoTitle/VideoTitle'
import { useEffect, useRef, useState } from 'react'
import ButtonMain from '../ButtonMain/ButtonMain'
import React from 'react'


type Props = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setIsVisibleWidget: React.Dispatch<React.SetStateAction<boolean>>
}

const VIDEO_PLAYBACK_RATE = 1.8
const VISIBLE_WIDGET_TIME = 9.1

const VideoSection = React.memo(({ setIsLoading, setIsVisibleWidget }: Props) => {
    const [currentTime, setCurrentTime] = useState<number>(0)
    const wheelTimer = useRef<NodeJS.Timeout | null>(null)
    const video = useRef<HTMLVideoElement>(null)

    const movement = (event: WheelEvent) => {
        if (video.current == null) return
        if (wheelTimer.current) clearTimeout(wheelTimer.current)
        wheelTimer.current = setTimeout(() => {
            if (video.current) video.current.pause()
        }, 700)

        if (event.deltaY >= 0) {
            if (video.current.paused && video.current.currentTime < 10) video.current.play()
        } else {
            if (!video.current.paused) video.current.pause()
            video.current.currentTime -= 0.18
        }
        setCurrentTime(video.current.currentTime)
    }

    const loadVideo = async () => {
        const response = await fetch('assets/videos/backgroundVideo.mp4')
        const blobFile = await response.blob()
        video.current!.src = URL.createObjectURL(blobFile)
        video.current!.playbackRate = VIDEO_PLAYBACK_RATE
        setCurrentTime(video.current!.currentTime)
        setIsLoading(false)
    }

    useEffect(() => {
        loadVideo()
        document.addEventListener('wheel', movement)
        return () => document.removeEventListener('wheel', movement)
    }, [])

    useEffect(() => {
        setIsVisibleWidget(currentTime <= VISIBLE_WIDGET_TIME)
    }, [currentTime])

    return (
        <div className='container'>
            <ButtonMain currentTime={currentTime} />
            <VideoTitle currentTime={currentTime} />
            <div className={`mainVideo`}>
			    <video
			    	className='mainVideo__video'
			    	ref={video}
			    	loop={false}
			    	muted
			    />
		    </div>
        </div>
    )
})

export default VideoSection