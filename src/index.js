import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from './context/darkModeContext';
import { SettingsProvider } from './context/settingsContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <DarkModeProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </DarkModeProvider>
  </BrowserRouter>
);

