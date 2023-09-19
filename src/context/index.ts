import { createContext } from 'react'

/**
 * Контекст для хранения выбранного айтема элемента TourPrint
 */
type ListIndexContextType = {
    hoverIndex?:     number | null
    setHoverIndex?:  React.Dispatch<React.SetStateAction<number | null>>
}
export const  ListIndexContext = createContext<ListIndexContextType>({})


/**
 * Контекст для хранения функции routeShifting (переход между страницами 
 * с установленной задержкой)
 */

type RouteShiftingContextType = ((path: string) => void) | null
export const RouteShiftingContext = createContext<RouteShiftingContextType>(null)