import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './HistoryObserver.scss'
import { RouteShiftingContext } from '../../context'


type Props = {
    children: React.ReactNode
}

const ROUTES_CHANGE_DELAY = 3000

const HistoryObserver = ({ children }: Props) => {

    const [isRouteShifting, setIsRouteShifting] = useState(false)
    const navigate = useNavigate()

    const routeShifting = useCallback((path: string) => {
        setIsRouteShifting(true)
        setTimeout(() => {
            navigate(path)
        }, ROUTES_CHANGE_DELAY / 2)

        setTimeout(() => {
            setIsRouteShifting(false)
        }, ROUTES_CHANGE_DELAY)
    }, [navigate])

    return (
        <RouteShiftingContext.Provider value={routeShifting}>
            <div className={`route-filter ${isRouteShifting && 'shift'}`}></div>
            { children }
        </RouteShiftingContext.Provider>
    )
}

export default HistoryObserver