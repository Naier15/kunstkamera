import './CloseButton.scss';
import ControlButton from '../../ControlButton/ControlButton';

type Props = {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CloseButton = ({ setIsModal }: Props) => {

    return (
        <div className="closeButton">
            <ControlButton
                name={'close'}
                img={'assets/images/svg/close.svg'}
                handler={() => setIsModal(false)}
            />
        </div>
    )
};

export default CloseButton