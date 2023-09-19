import './TitleBLock.scss'
import { useLargeText } from '../../../../hooks'

type Props = {
    title: string
}

const TitleBLock = ({ title }: Props) => {

    const isLargeText = useLargeText()

    return (
        <div className='contentItem__titleBLock titleBLock'>
            <div className={`titleBLock__title ${isLargeText && 'titleBLock__title-visuallyImpaired'}`}>
                {title}
            </div>
            <div className={`titleBLock__horizon ${isLargeText && 'titleBLock__horizon-visuallyImpaired'}`}>
                <img src='assets/images/svg/horizon.svg' alt='horizon' />
            </div>
        </div>
    )
}

export default TitleBLock;