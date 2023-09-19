import { Location } from 'react-router-dom'
import './styles.scss'
import { EditMode } from './Tour'
import HdriConsole from './AdminComponents/HdriConsole'
import Map from './Map/Map'
import Loader from './Loader'
import ModalConsole from './AdminComponents/ModalConsole'

type Props = {
	stage: number
	location: Location
	isLoading: boolean
	editMode: EditMode
}

const Ui = ({ stage, location, isLoading, editMode }: Props) => {
	return (
		<div className='ui' id='ui'>
			<div id='notif'></div>
			<Map stage={stage} location={location} />
			{location.pathname === '/admin' && editMode === EditMode.Hdri && (
				<HdriConsole stage={stage} />
			)}
			{location.pathname === '/admin' && editMode === EditMode.Modal && (
				<ModalConsole stage={stage} />
			)}
			<Loader isLoading={isLoading} />
		</div>
	)
}

export default Ui
