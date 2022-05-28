import './App.css';

// import JsonDataDisplay from './MyPractice/GeekTable'
// import MassData from './MyPractice/MassData'
// import Mass from './MyPractice/dataMass';
// import { CoinFlip5} from './MyPractice/CoinFlip';

// import Repeater from './components/Links'
// import HeaderLinks from './components/HeaderLinks';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Teams from './pages/Teams';
import Support from './pages/Support';
import Messages from './pages/Messages';
// import Main from './components/Main';
import { useState } from 'react';
import NoMatch from './pages/NoMatch';
import { IdGuardWrapper } from './pages/IdGuardWrapper';

// import Footer from './components/FooterFirst';
// import Button from './components/Button'
// const Header = () => <header>header</header>;
// const Footer = () => <footer>footer</footer>;


function App() {
const [isUserAuthenticated,SetIsUserAuthenticated] = useState(false);
SetIsUserAuthenticated(!isUserAuthenticated);
return (
	<>
		<Router>
			<Navbar />
			<Routes>
				<Route
					exact
					path="/"
					render={() => {
						return (
							isUserAuthenticated ?
							<Navigate to="/support"></Navigate> :
							<Navigate to="/table/2022"> </Navigate>
						)
					}}
				/>
				  <Route
						path='table/:id'
						element={(
						<IdGuardWrapper> 
						</IdGuardWrapper>
						)}
  				/>

				<Route path="/products" element={<Products />} />
				<Route path="/reports" element={<Reports />} />
				{/* <Route path="/table/:id" element={ <Main />} /> */}
				<Route path="/teams" element={<Teams/>} />
				<Route path="/support" element={<Support />} />
				<Route path="/Messages" element={<Messages />} />
				<Route path="*" element={<NoMatch />} />

			</Routes>
		</Router>
		{/* <Footer /> */}
	</>
);
}

export default App;
