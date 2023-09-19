import { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useNavigate } from 'react-router'
import { serverHost } from '..'
import Cookies from 'universal-cookie'


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useLocalText = <T>(selector: T[]) => 
    selector[useAppSelector(state => state.lang.language)]

export const useLargeText = () => useAppSelector(state => state.largeText.isLarge)

export const useAuthorize = () => {
    const navigate = useNavigate()
    const cookies = new Cookies()

    return (action: React.Dispatch<React.SetStateAction<boolean>> | undefined = undefined) => {
        const key = cookies.get('key') as string
        if (!key) {
            navigate('/auth')
            return
        }
        fetch(`${serverHost}/auth/`, {
            method: 'GET',
            headers: { Token : key }
        }).then(
            response => response.json()
        ).then(data => {
            if (data.status === 'success') {
                if (action) action(true)
                return
            }
            navigate('/auth')
        })
    }
}

export function useEscapeKey(handleClose: () => void) {
	const handleEscKey = useCallback(
		(event: any) => {
			if (event.key === 'Escape') {
				handleClose()
			}
		},
		[handleClose]
	)

	useEffect(() => {
		document.addEventListener('keyup', handleEscKey, false)
		return () => document.removeEventListener('keyup', handleEscKey, false)
	}, [handleEscKey])
}
useEscapeKey.proptypes = {
	handleClose: PropTypes.func.isRequired
}