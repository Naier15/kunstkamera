import './Text.scss'
import { useLargeText } from '../../../hooks'


type Props = {
    text: string
}

const Text = ({ text }: Props) => {

    const isLargeText = useLargeText()

    return (
        <span className={`text ${isLargeText && 'text-visuallyImpaired'}`}>
            { text }
        </span>
    )
}

export default Text