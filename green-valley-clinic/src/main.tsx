import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { mockStore } from './data/mockStore';
import './index.css';

// Initialize mock store before rendering
mockStore.initialize();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
