import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';

const PropertyPagePlaceholder = () => <h2>Property Details Coming Soon</h2>;

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-blue-800 text-white p-4">
          <h1 className="text-2xl">Estate Agent</h1>
        </header>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;