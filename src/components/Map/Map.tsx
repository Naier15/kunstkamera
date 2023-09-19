import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { Location } from 'react-router-dom'
import './styles.scss'
import { IBlock } from '../../scripts/scene'
import { Pos2D } from '../../scripts/entities/dot'
import MapLink, { LinkView } from './MapLink'
import SubLink from './SubLink'
import { useAppDispatch, useAppSelector, useLargeText, useLocalText } from '../../hooks'
import { toggleLargeText } from '../../store/largeTextSlice'


type Props = {
	stage: number
	location: Location
}

const Map = ({ stage, location }: Props) => {
	const dispatch = useAppDispatch()
	const isLargeText = useLargeText()
	const titleText = useLocalText(
		useAppSelector(state => state.lang.appText.map.titleStage)
	)
	const roomsInfo = useLocalText(
		useAppSelector(state => state.lang.appText.map.roomsInfo)
	)
	const riverText = useLocalText(
		useAppSelector(state => state.lang.appText.map.river)
	)

	const [coef, setCoef] = useState<IBlock | undefined>(undefined)
	const [mapNum, setMapNum] = useState<number>(0)
	const [mapOpened, setMapOpened] = useState<boolean>(false)
	const link1 = useRef<HTMLAnchorElement>(null)
	const link2 = useRef<HTMLAnchorElement>(null)
	const link3 = useRef<HTMLAnchorElement>(null)
	const link4 = useRef<HTMLAnchorElement>(null)

	const sub1 = useRef<HTMLAnchorElement>(null)
	const sub2 = useRef<HTMLAnchorElement>(null)
	const sub3 = useRef<HTMLAnchorElement>(null)
	const sub4 = useRef<HTMLAnchorElement>(null)

	const ss = useRef<HTMLDivElement>(null)
	const tt = useRef<HTMLDivElement>(null)
	const uu = useRef<HTMLDivElement>(null)
	const oo = useRef<HTMLDivElement>(null)
	const nn = useRef<HTMLDivElement>(null)
	const h = useRef<HTMLDivElement>(null)
	const ll = useRef<HTMLDivElement>(null)
	const mm = useRef<HTMLDivElement>(null)
	const p = useRef<HTMLDivElement>(null)
	const bb = useRef<HTMLDivElement>(null)
	const x = useRef<HTMLDivElement>(null)
	const w = useRef<HTMLDivElement>(null)

	const mapLinks = useRef<HTMLDivElement>(null)
	const dots = useRef<HTMLDivElement>(null)
	const backgroundField = useRef<HTMLDivElement>(null)

	const links = useMemo(() => [
		[
			{
				to: '?stage=10',
				link: link4,
				sub: sub4,
				pins: [ss, tt, uu],
				roomInfo: roomsInfo.room10,
				linkView: LinkView.DEFAULT
			},
			{
				to: '?stage=2',
				link: link2,
				sub: sub2,
				pins: [oo],
				roomInfo: roomsInfo.room2,
				linkView: LinkView.DEFAULT
			},
			{
				to: '?stage=1',
				link: link1,
				sub: sub1,
				pins: [nn],
				roomInfo: roomsInfo.room1,
				linkView: LinkView.CENTRAL
			},
			{
				to: '?stage=3',
				link: link3,
				sub: sub3,
				pins: [h],
				roomInfo: roomsInfo.room3,
				linkView: LinkView.DEFAULT
			}
		], 
		[
			{
				to: '?stage=5',
				link: link2,
				sub: sub2,
				pins: [ll],
				roomInfo: roomsInfo.room5,
				linkView: LinkView.DEFAULT
			},
			{
				to: '?stage=4',
				link: link1,
				sub: sub1,
				pins: [mm],
				roomInfo: roomsInfo.room4,
				linkView: LinkView.CENTRAL
			},
			{
				to: '?stage=6',
				link: link3,
				sub: sub3,
				pins: [p],
				roomInfo: roomsInfo.room6,
				linkView: LinkView.DEFAULT
			}
		],
		[
			{
				to: '?stage=8',
				link: link2,
				sub: sub2,
				pins: [bb],
				roomInfo: roomsInfo.room8,
				linkView: LinkView.UNFULL
			},
			{
				to: '?stage=7',
				link: link1,
				sub: sub1,
				pins: [x],
				roomInfo: roomsInfo.room7,
				linkView: LinkView.CENTRAL
			},
			{
				to: '?stage=9',
				link: link3,
				sub: sub3,
				pins: [w],
				roomInfo: roomsInfo.room9,
				linkView: LinkView.UNFULL
			}
		]
	], [])

	const getLinkTransforms = useCallback((currentMap: number) => {
		if (currentMap === 1) {
			return [
				{
					//central
					x: 330,
					y: 26,
					width: 131,
					height: 139,
				},
				{
					//left
					x: 193,
					y: 52,
					width: 142,
					height: 87,
				},
				{
					//right
					x: 455,
					y: 51,
					width: 143,
					height: 88,
				},
				{
					//most-right
					x: 78,
					y: 47,
					width: 110,
					height: 39,
				},
			]
		} else if (currentMap === 2) {
			return [
				{
					x: 331,
					y: 25.5,
					width: 128,
					height: 139.5,
				},
				{
					x: 192,
					y: 51,
					width: 145,
					height: 88,
				},
				{
					x: 453,
					y: 51,
					width: 146,
					height: 88,
				},
				{
					x: 0,
					y: 0,
					width: 1,
					height: 1,
				},
			]
		} else if (currentMap === 3) {
			return [
				{
					x: 331,
					y: 25,
					width: 128,
					height: 139.5,
				},
				{
					x: 191,
					y: 50,
					width: 146,
					height: 89,
				},
				{
					x: 453,
					y: 50,
					width: 146,
					height: 89,
				},
				{
					x: 0,
					y: 0,
					width: 1,
					height: 1,
				},
			]
		}
	}, [])

	const getPinTransforms = useMemo(() => [
		{
			//ss
			x: 45,
			y: 67,
		},
		{
			//tt
			x: 82,
			y: 67,
		},
		{
			//uu
			x: 119,
			y: 67,
		},
		{
			//oo
			x: 213,
			y: 95,
		},
		{
			//nn
			x: 344,
			y: 95
		},
		{
			//h
			x: 475,
			y: 95,
		},
	], [])

	const setLinksPosition = useCallback((
		link: React.RefObject<HTMLAnchorElement>,
		linkParams: IBlock,
		mapCoef: IBlock
	) => {
		link.current!.style.left = `${linkParams.x * mapCoef.width}px`
		link.current!.style.top = `${linkParams.y * mapCoef.height}px`
		link.current!.style.width = `${linkParams.width * mapCoef.width}px`
		link.current!.style.height = `${linkParams.height * mapCoef.height}px`
	}, [])

	const setPinPosition = useCallback((
		pin: React.RefObject<HTMLDivElement>,
		linkParams: Pos2D,
		mapCoef: IBlock
	) => {
		pin.current!.style.left = `${linkParams.x * mapCoef.width}px`
		pin.current!.style.top = `${linkParams.y * mapCoef.height}px`
	}, [])

	const setDetailsPosition = useCallback(() => {
		if (coef === undefined) { return }

		const [ssCoords, ttCoords, uuCoords, ooCoords, nnCoords, hCoords] = getPinTransforms
		if (ss.current) setPinPosition(ss, ssCoords, coef)
		if (tt.current) setPinPosition(tt, ttCoords, coef)
		if (uu.current) setPinPosition(uu, uuCoords, coef)
		if (oo.current) setPinPosition(oo, ooCoords, coef)
		if (nn.current) setPinPosition(nn, nnCoords, coef)
		if (h.current) setPinPosition(h, hCoords, coef)
		if (ll.current) setPinPosition(ll, ooCoords, coef)
		if (mm.current) setPinPosition(mm, nnCoords, coef)
		if (p.current) setPinPosition(p, hCoords, coef)
		if (bb.current) setPinPosition(bb, ooCoords, coef)
		if (x.current) setPinPosition(x, nnCoords, coef)
		if (w.current) setPinPosition(w, hCoords, coef)

		const currentMap: number = mapNum ||
			([7, 8, 9].includes(stage) ? 3 : [4, 5, 6].includes(stage) ? 2 : 1)
		const [linkCenter, linkLeft, linkRight, linkMostRight] =
			getLinkTransforms(currentMap)!
		if (link1.current) setLinksPosition(link1, linkCenter, coef)
		if (link2.current) setLinksPosition(link2, linkLeft, coef)
		if (link3.current) setLinksPosition(link3, linkRight, coef)
		if (link4.current) setLinksPosition(link4, linkMostRight, coef)
		setMapNum(currentMap)
	}, [coef])

	const setMapCoef = useCallback(() => {
		const map = document.getElementById('map-inner') as HTMLElement
		map.onload = () => {
			setCoef({
				x: map.offsetLeft,
				y: map.offsetTop,
				width: map.clientWidth / 688,
				height: map.clientHeight / 190,
			})
		}
	}, [])

	const visuallyImpairedTurn = () => {
		dispatch(toggleLargeText(!isLargeText))
	}

	const setMapCoefNow = useCallback(() => {
		const map = document.getElementById('map-inner') as HTMLElement
		setCoef({
			x: map.offsetLeft,
			y: map.offsetTop,
			width: map.clientWidth / 688,
			height: map.clientHeight / 190,
		})
	}, [])

	useEffect(() => {
		setMapCoef()
		window.addEventListener('resize', setMapCoefNow)
		return () => window.removeEventListener('resize', setMapCoefNow)
	}, [])

	useEffect(() => {
		if (stage > 0) setMapOpened(false)
	}, [stage])

	useEffect(() => {
		if (stage > 0) setDetailsPosition()
	}, [coef, mapOpened])

	useEffect(() => {
		if (mapOpened) {
			if (
				(([1, 2, 3, 10].includes(stage) && mapNum && mapNum === 1) ||
					([4, 5, 6].includes(stage) && mapNum && mapNum === 2) ||
					([7, 8, 9].includes(stage) && mapNum && mapNum === 3)) &&
				location.pathname === '/admin') {
				if (dots.current) dots.current.style.visibility = 'visible'
			} else {
				if (dots.current) dots.current.style.visibility = 'hidden'
			}
			if (mapLinks.current) mapLinks.current.style.visibility = 'visible'
			if (backgroundField.current)
				backgroundField.current.style.visibility = 'visible'
		} else {
			if (dots.current) dots.current.style.visibility = 'hidden'
			if (mapLinks.current) mapLinks.current.style.visibility = 'hidden'
			if (backgroundField.current)
				backgroundField.current.style.visibility = 'hidden'
		}
	}, [mapOpened, mapNum])

    return <>
        <div className='background' ref={backgroundField} onClick={() => setMapOpened(false)}></div>
        <div className='map' ref={mapLinks}>
            <div className={`map-title ${isLargeText && 'map-title-large-text'}`}>
                <div>
					<span>{ titleText.firstLetter }</span>
					{ titleText.lastLetters }&nbsp;
					{ mapNum === 1 ? titleText.firstStage : 
						mapNum === 2 ? titleText.secondStage : titleText.thirdStage
					}&nbsp;
					{titleText.stage}
				</div>
                <img className='underline' src='icons/underline.svg' alt='underline'/>
            </div>
            <div className='map-overlay' id='mapOverlay'>
                <span className='space'></span>
                <img className='map-inner' id='map-inner' src={ mapNum === 1 ? 'maps/map_wall_1.png' : mapNum === 2 ? 'maps/map_wall_2.png' : 'maps/map_wall_3.png'} alt='mapOverlay'/>
                <div className='ctrl-btns'>
					<div 
						className={`up-btn ${mapNum === 3 && 'disable'}`} 
						onClick={() => {
							if (mapNum === 1) setMapNum(2)
							if (mapNum === 2) setMapNum(3) 
						}}>
                    	<img src='icons/up.svg' alt='up'/>
                    </div>
                    <div 
						className={`down-btn ${mapNum === 1 && 'disable'}`}
						onClick={() => {
							if (mapNum === 2) setMapNum(1)
							if (mapNum === 3) setMapNum(2) 
						}}>
                        <img src='icons/up.svg' alt='down'/>
                    </div>
                </div>
				{ mapNum > 0 && links[mapNum - 1].map(({to, link, sub, pins, linkView}, index) =>
					<MapLink
						key={index}
						to={to}
						link={link}
						sub={sub}
						pins={pins}
						linkView={linkView}
					/>
				)}
                <div id='dots' className='dots' ref={dots}></div>
                <div className='pins'>
                    { mapNum === 1 && <>
                        <div className={`pin ${stage === 10 && 'stayed'}`} ref={ss}>SS</div>
                        <div className={`pin ${stage === 10 && 'stayed'}`} ref={tt}>TT</div>
                        <div className={`pin ${stage === 10 && 'stayed'}`} ref={uu}>UU</div>
                        <div className={`pin ${stage === 2 && 'stayed'}`} ref={oo}>OO</div>
                        <div className={`pin ${stage === 1 && 'stayed'}`} ref={nn}>NN</div>
                        <div className={`pin ${stage === 3 && 'stayed'}`} ref={h}>H</div>
                    </> }
                    { mapNum === 2 && <>
                        <div className={`pin ${stage === 5 && 'stayed'}`} ref={ll}>LL</div>
                        <div className={`pin ${stage === 4 && 'stayed'}`} ref={mm}>MM</div>
                        <div className={`pin ${stage === 6 && 'stayed'}`} ref={p}>P</div>
                    </> }
                    { mapNum === 3 && <>
                        <div className={`pin ${stage === 8 && 'stayed'}`} ref={bb}>BB</div>
                        <div className={`pin ${stage === 7 && 'stayed'}`} ref={x}>X</div>
                        <div className={`pin ${stage === 9 && 'stayed'}`} ref={w}>W</div>
                    </> }
                </div>
            </div>
            <div className='river'>
                <img src='maps/river.svg' alt='river'></img>
                <span>{ riverText }</span>
            </div>
            <div className='subs'>
				{ mapNum > 0 && links[mapNum - 1].map(({to, link, sub, pins, roomInfo}, index) => 
					<SubLink
						key={index}
						to={to}
						link={link}
						sub={sub}
						pins={pins}
						title={roomInfo.title}
						symbol={roomInfo.symbol}
					/>
				)}
            </div>
            <div className='exit-btn' onClick={() => setMapOpened(false)}>
				<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.35547 1.35547L10.9983 10.9983M20.6412 20.6412L10.9983 10.9983M10.9983 10.9983L20.6412 1.86299M10.9983 10.9983L1.8767 20.1337" strokeWidth="2"/>
				</svg>
            </div>
			<img
            	className={`map-large-text ${mapOpened ? '' : 'disable'}`}
            	src={isLargeText ? 'assets/images/svg/eyeOn.svg' : 
					'assets/images/svg/eyeOff.svg'}
            	alt='isLargeText'
				onClick={visuallyImpairedTurn}
        	/>
        </div>
		<svg
			className={`map-btn ${mapOpened && 'disable'}`}
			onClick={() => setMapOpened(true)}
			viewBox='0 0 55 55'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				opacity='0.7'
				cx='27.9883'
				cy='27.9883'
				r='27'
			/>
			<path
				className='map-path'
				d='M24.5706 17.4883L18.2414 23.192L17.9883 38.4883L24.8237 32.5253M24.5706 17.4883L31.1528 23.192M24.5706 17.4883L24.8237 32.5253M31.1528 23.192L37.7351 17.4883L37.9883 32.2661L31.406 38.4883M31.1528 23.192L31.406 38.4883M31.406 38.4883L24.8237 32.5253'
				fill='none'
			/>
		</svg>
	</>
}

export default Map
