import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Obtén el elemento raíz del DOM
const rootElement = document.getElementById('root');

// Usa createRoot para crear la raíz de la aplicación
const root = ReactDOM.createRoot(rootElement);

// Renderiza la aplicación
root.render(
    <Router>
        <App />
    </Router>
);