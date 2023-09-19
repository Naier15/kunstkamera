import './Title.scss'
import { useLargeText } from '../../../hooks'


type Props = {
    title: String
    isVisible: boolean
    className: string
}

const Title = ({ title, isVisible = false, className = '' }: Props) => {

    const isLargeText = useLargeText()

    return (
        <div className={`title titleVideo-${isVisible ? 'vizible' : 'noVizible'} title-${className} ${isLargeText && 'title-visuallyImpaired'}`}>
            { title }
        </div>
    );
};

export default Title