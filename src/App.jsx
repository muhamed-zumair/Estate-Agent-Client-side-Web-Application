import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/main.css';
import './App.css'; 

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;