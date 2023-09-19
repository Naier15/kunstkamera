import { useLargeText } from '../../../../../hooks'
import { disableContextMenu } from '../../../../../utils'
import './ContentBlockImage.scss'


type Props = {
    imagesArchitecture: string
    className: string
    text: string
}

const ContentBlockImage = ({ imagesArchitecture, className, text }: Props) => {

    const isLargeText = useLargeText()

    return (
        <div className='contentBlock__imageBlock contentBlockImage'>
            <div className={`contentBlockImage__container contentBlockImage-${className}__container`}>
                <img
                    onContextMenu={disableContextMenu}
                    src={imagesArchitecture}
                    alt={className}
                />
                <div className={`contentBlockImage__text ${isLargeText && 'contentBlockImage__text-visuallyImpaired'}`}>
                    {text}
                </div>
            </div>
        </div>
    )
}

export default ContentBlockImage