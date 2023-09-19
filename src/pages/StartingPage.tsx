import { useState, useEffect } from 'react'
import VideoSection from '../components/VideoSection/VideoSection'
import SettingButtons from '../components/SettingButtons/SettingButtons'
import HelpWidget from '../components/HelpWidget/HelpWidget'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'


const StartingPage = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isVisibleWidget, setIsVisibleWidget] = useState<boolean>(false)

    useEffect(() => {
        if (window.innerWidth < 600) {
            navigate("/unaccessable")
        }
    }, [navigate])

    return (
        <div className='page startingPage'>
            <Loader 
                isLoading={isLoading} 
                speed={0.6}
                playTillEnd={true}
            />
            <VideoSection
                setIsLoading={setIsLoading}
                setIsVisibleWidget={setIsVisibleWidget}
            />
            { isVisibleWidget && <HelpWidget /> }
            <SettingButtons />
            
        </div>
    )
}

export default StartingPage