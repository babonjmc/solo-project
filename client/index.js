import React from 'react';
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
// import styles from '../scss/application.scss';
import App from './components/App.jsx';
// import Test from './test.jsx';

// uncomment so that webpack can bundle styles


root.render(<App/>);