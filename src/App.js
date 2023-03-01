import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"
import { DarkModeContext } from './context/darkModeContext';
import { useContext } from 'react';
import Home from "./pages/Home"
import Timer from './pages/Timer'
import logo from './assets/images/logo.png'

function App() {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <div
      className={darkMode ? 'App dark' : 'App light'}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className='logo'>
        <img src={logo} alt="logo" />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/timer' element={<Timer />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <div className='logo2'>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default App;

