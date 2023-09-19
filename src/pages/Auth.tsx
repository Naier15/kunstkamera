import { useRef, SyntheticEvent } from 'react'
import './styles.scss'
import { serverHost } from '..'
import { useNavigate } from 'react-router'
import Cookies from 'universal-cookie'


const Auth = () => {

    const navigate = useNavigate()
    const password = useRef<HTMLInputElement>(null)
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        if (password == null) return
        const response = await fetch(`${serverHost}/auth/?key=${password.current?.value}`, {
            method: 'POST'
        })
        if (!response.ok) {
            alert('Неверный пароль')
            return
        }
        const token = (await response.json()).token
        const cookies = new Cookies()
        cookies.set('key', token)
        navigate('/admin')
    }

    return <form className='auth' onSubmit={handleSubmit}>
        <div className='auth__title'>Введите ключ</div>
        <input className='auth__password' type='password' ref={password}></input>
        <button className='auth__btn' type='submit'>Войти</button>
    </form>
}

export default Auth