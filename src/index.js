import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.scss';
import './styles/fonts.css';
import App from './components/app/app';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
  <App/>
  </React.StrictMode>
);

