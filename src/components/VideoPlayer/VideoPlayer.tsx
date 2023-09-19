import { useRef, useState } from 'react'
import { staticHost } from '../..'
import './style.scss'

type Props = {
	src: string
}

const VideoPlayer = ({ src }: Props) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const videoWrapRef = useRef<HTMLDivElement>(null)
	const progressWrapRef = useRef<HTMLDivElement>(null)
	const progressRef = useRef<HTMLDivElement>(null)
	const [playing, setPlaying] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [videoTime, setVideoTime] = useState<number>(0)
	const [progress, setProgress] = useState<number>(0)

	const videoHandler = (control: string) => {
		if (control === 'play') {
			videoRef.current?.play()
			setPlaying(true)
			const vid = document.getElementById('video1') as HTMLVideoElement
			setVideoTime(vid.duration)
		} else if (control === 'pause') {
			videoRef.current?.pause()
			setPlaying(false)
		}
	}

	const changeProgress = (e: any) => {
		const newTime = e.nativeEvent.offsetX / progressWrapRef.current!.offsetWidth
		progressRef.current!.style.width = `${newTime * 100}%`
		videoRef.current!.currentTime = newTime * videoTime
	}

	window.setInterval(function () {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime)
			setProgress((videoRef.current.currentTime / videoTime) * 100)
		}
	}, 1000)

	const toggleFullScreen = () => {
		let el = document.getElementById('video1') as HTMLVideoElement
		el.requestFullscreen()
	}

	return (
		<div className='video-wrap' ref={videoWrapRef}>
			<video
				id='video1'
				ref={videoRef}
				className='video'
				src={`${staticHost}/${src}`}
				controlsList='nodownload'
			></video>

			<div className='controlsContainer'>
				<div className='controls'>
					{playing ? (
						<img
							onClick={() => videoHandler('pause')}
							className='controlsIcon--small'
							alt='pause'
							src='icons/video/pause.png'
						/>
					) : (
						<img
							onClick={() => videoHandler('play')}
							className='controlsIcon--small'
							alt='play'
							src='icons/video/play.png'
						/>
					)}
				</div>
			</div>

			<div className='timecontrols'>
				<p className='controlsTime'>
					{Math.floor(currentTime / 60) +
						':' +
						('0' + Math.floor(currentTime % 60)).slice(-2)}
				</p>
				<div
					className='time_progressbarContainer'
					onClick={e => changeProgress(e)}
					ref={progressWrapRef}
				>
					<div
						style={{ width: `${progress}%` }}
						className='time_progressBar'
						ref={progressRef}
					></div>
				</div>
			</div>

			<div onClick={toggleFullScreen} className='fullscreen-video'>
				<img src='icons/video/fullscreen.svg' alt='fullscreen' />
			</div>
		</div>
	)
}

export default VideoPlayer
