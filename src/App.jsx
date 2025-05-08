import Header from './components/Header';
import Footer from './components/Footer';
import Grid from './components/Grid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes here

import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="main-content">
        <Router>
          <Routes>
            <Route path="/easy" element={<Grid difficulty="easy" />} />
            <Route path="/medium" element={<Grid difficulty="medium" />} />
            <Route path="/hard" element={<Grid difficulty="hard" />} />
            <Route path="/" element={<Grid difficulty="medium" />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
