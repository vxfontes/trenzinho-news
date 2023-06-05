import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import RoutesApp from './routes';

function App() {
	return (
		<Router>
			<Navbar />
			<RoutesApp />
		</Router>
	)
}

export default App
