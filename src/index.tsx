import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../src/assets/fonts/kiss/Kis BT Roman.ttf'
import '../src/assets/fonts/Inter/Inter-SemiBold.ttf'
import '../src/assets/fonts/Inter/Inter-Medium.ttf'
import './pages/styles.scss'
import Tour from './components/Tour'
import Error from './pages/error'
import Unaccessable from './pages/unaccessable'
import ExpositionTourPage from './pages/ExpositionTourPage'
import PrintPage from './pages/PrintPage'
import StartingPage from './pages/StartingPage'
import ArchitecturePage from './pages/ArchitecturePage'
import HistoryObserver from './components/HistoryObserver/HistoryObserver'
import Edit from './components/Edit/Edit'
import { Provider } from 'react-redux'
import { store } from './store'
import Auth from './pages/Auth'

export const serverHost = process.env.REACT_APP_SERVER_HOST || 'http://localhost:5000'
export const staticHost = process.env.REACT_APP_STATIC_HOST || 'http://localhost:3000'

export default function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<StartingPage />} errorElement={<Error />} />
				<Route path='/print' element={<PrintPage />} errorElement={<Error />} />
				<Route path='/architecture' element={<ArchitecturePage />} errorElement={<Error />} />
				<Route path='/map' element={<ExpositionTourPage />} errorElement={<Error />} />
				<Route path='/auth' element={<Auth />} errorElement={<Error />} />
				<Route path='/tour' element={<Tour />} errorElement={<Error />} />
				<Route path='/admin' element={<Tour />} errorElement={<Error />} />
				<Route path='/edit' element={<Edit />} errorElement={<Error />} />
				<Route path='/unaccessable' element={<Unaccessable />} errorElement={<Error />} />
			</Routes>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<HistoryObserver>
			<Provider store={store}>
				<App />
			</Provider>
		</HistoryObserver>
	</BrowserRouter>
)