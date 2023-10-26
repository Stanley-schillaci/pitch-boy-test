import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Home from './Home';
import MovieDetail from './MovieDetail';

function App() {
  return (
    <Router>
      <div className='main-content'>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
          </ul>
        </nav>

      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
    </Router>
  );
}

export default App;
