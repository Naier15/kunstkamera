import React, { useCallback, useEffect, useState } from 'react'
import './styles.scss'
import Touchable, { ITouchable } from '../../scripts/entities/touchable'
import MainScene from '../../scripts/scene'
import Dot from '../../scripts/entities/dot'
import { serverHost } from '../..'
import { Link } from 'react-router-dom'


type Props = {
    stage: number
}

type Modal = {
    content: Object
    cupboard: boolean
    id: number
    modalName: string
    modalType: string
}

type Data = {
    id: number
    modals: Modal[]
    roomName: string
}

const ModalConsole = React.memo(({ stage }: Props) => {
    const [modals, setModals] = useState<Modal[]>([])

    const fetchModals = useCallback(async (id: number) => {
        const response = await fetch(`${serverHost}/modal/?id=${id}`)
		const data: Data = await response.json()
		setModals(data.modals)
    }, [])

    useEffect(() => {
        if (stage === 0) { return }
        fetchModals(stage)
    }, [stage, fetchModals])


    return <ul className='modal-console'>
        { modals.length > 0 && <h3>Количество: {modals.length}</h3> }
        <Link to='/edit' className='edit-btn'>Редактировать</Link>
        { modals.length > 0 && modals.map((modal: Modal, id: number) => 
            <li key={id + 1} onClick={async () => {
                const settings: ITouchable = {
                    position: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    modalName: modal.modalName,
                    modalType: modal.modalType,
                    cupboard: modal.cupboard
                } as ITouchable
                Dot.activeDot?.hdri.touchablesInfo.push(settings)
                new Touchable(settings, MainScene.instance).stayBeyondCamera()
            }}>
                <div className='modal-console__id'>{id}</div>
                <div className='modal-console__text'>
                    <div className='modal-console__text__name'>{modal.modalName}</div>
                    <div className='modal-console__text__type'>{modal.modalType}</div>
                </div>
            </li>)
        }
    </ul>
})

export default ModalConsole