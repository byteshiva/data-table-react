import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Teams from './pages/Teams';
import Support from './pages/Support';
import Messages from './pages/Messages';
import NoMatch from './pages/NoMatch';
import Dashboard from './pages/Dashboard';
import { IdGuardWrapper } from './pages/IdGuardWrapper';

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate to={`/table/${currentYear}`} replace={true}></Navigate>}
          />

          <Route
            exact
            path="table/:id"
            element={<IdGuardWrapper></IdGuardWrapper>}
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/support" element={<Support />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
