import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeProvider } from './context/darkModeContext';
import { SettingsProvider } from './context/settingsContext';
import './App.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </DarkModeProvider>
  </React.StrictMode>
);

