import './App.css';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Teams from './pages/Teams';
import Support from './pages/Support';
import Messages from './pages/Messages';
import NoMatch from './pages/NoMatch';
import Dashboard from './pages/Dashboard';
import { IdGuardWrapper } from './pages/IdGuardWrapper';
// import Footer from './components/Footer';

function App() {
return (
	<>
		<Router>
			<Navbar />
			<Routes>
				{/* <Route
					exact
					path="/"
					render={() => {
						return (
							isUserAuthenticated ?
							<Navigate to="/support"></Navigate> :
							<Navigate to="/table/2022"> </Navigate>
						)
					}}
				/> */}
				<Route exact path="/" element={<Navigate to="/table/2023" replace={true}> </Navigate>} />

				  <Route exact
						path='table/:id'
						element={(
						<IdGuardWrapper> 
						</IdGuardWrapper>
						)}
  				/>
				<Route path="/dashboard" element={<Dashboard />} />
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
