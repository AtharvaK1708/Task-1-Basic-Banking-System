import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './layouts/LandingPage';
import CustomersPage from './layouts/CustomersPage';
import TransactionsPage from './layouts/TransactionsPage';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/customers" element={<CustomersPage />} exact />
          <Route path="/transactions" element={<TransactionsPage />} exact />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
