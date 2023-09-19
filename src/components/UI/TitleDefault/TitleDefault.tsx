import { useLargeText } from '../../../hooks'
import './TitleDefault.scss'


type Props = {
    title: string
}

const TitleDefault = ({ title }: Props) => {

    const isLargeText = useLargeText()

    return (
        <title className={`titleDefault ${isLargeText && 'titleDefault-visuallyImpaired'}`}>
            { title }
        </title>
    )
}

export default TitleDefault