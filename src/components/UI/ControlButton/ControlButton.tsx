import './ControlButton.scss'
import { useLargeText } from '../../../hooks'

type Props = {
    name: string
    img: string
    handler?: () => void
}

const ControlButton = ({ name, img, handler = undefined }: Props) => {

    const isLargeText = useLargeText()

    return (
        <button className='controlButton' onClick={handler}>
            <img
                className={`controlButton__img controlButton__img-${name} controlButton__img-${name}${isLargeText && '-visuallyImpaired'}`}
                src={img}
                alt={name}
            />
        </button>
    )
}

export default ControlButton