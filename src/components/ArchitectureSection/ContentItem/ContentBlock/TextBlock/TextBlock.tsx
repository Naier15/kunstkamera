import './TextBlock.scss'
import { useLargeText } from '../../../../../hooks'

type Props = {
    text: string
}

const TextBlock = ({ text }: Props) => {

    const isLargeText = useLargeText()

    return (
        <div className={`contentBlock__textBlock contentBlockText ${isLargeText && 'contentBlockText-visuallyImpaired'} `}>
            {text}
        </div>
    )
}

export default TextBlock