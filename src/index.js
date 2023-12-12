import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MostrarResultado from './mostrarResultado';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mostrarResultado" element={<MostrarResultado />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
