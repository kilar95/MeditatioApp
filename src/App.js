import './App.css';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Timer from './components/Timer';
import { DarkModeContext } from './context/darkModeContext';
import { SettingsContext } from './context/settingsContext';
import { useContext, useState, useEffect, useRef, useMemo } from 'react';
import Settings from './components/Settings';
import Sound from './components/Sound';

import fireplace from './images/fireplace.jpg'
import fireplaceNight from './images/fireplaceNight.jpg'
import forest from './images/forest.jpg'
import forestNight from './images/forestNight.jpg'
import music from './images/music.jpg'
import musicDark from './images/musicDark.jpg'
import rain from './images/rain.jpg'
import rainDark from './images/rainDark.jpg'
import river from './images/river.jpg'
import riverDark from './images/riverDark.jpg'
import beach from './images/beach.jpg'
import beachDark from './images/beachDark.jpg'
import day from './images/day.jpg'
import brownNoiseDark from './images/brownNoiseDark.jpg'

import greenWave from './images/green_wave.png'


function App() {
  const { darkMode } = useContext(DarkModeContext)
  const settingsInfo = useContext(SettingsContext)

  //timer functionality
  const [isPlaying, setIsPlaying] = useState(false)
  const [seconds, setSeconds] = useState(120)

  const [percentage, setPercentage] = useState(100)
  const [minutesLeft, setMinutesLeft] = useState(settingsInfo.duration)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const isPlayingRef = useRef(isPlaying)
  const interval = useRef(null)

  const totalSeconds = useMemo(() => (settingsInfo.duration * 60), [settingsInfo])


  function startTimer() {
    setSeconds(settingsInfo.duration * 60)

    interval.current = setInterval(() => {
      if (!isPlayingRef.current) {
        return;
      }
      setSeconds(prev => prev - 1);
    }, 1000)
  }

  useEffect(() => {
    startTimer()

    return () => clearInterval(interval.current)
  }, [settingsInfo])


  useEffect(() => {
    if (interval.current) {
      return
    }

    if (isPlaying) {
      startTimer();
    }

  }, [isPlaying])


  useEffect(() => {
    setPercentage(Math.round(seconds / totalSeconds * 100))
    setMinutesLeft(Math.floor(seconds / 60))
    setSecondsLeft(seconds % 60)

    if (seconds <= 0) {
      clearInterval(interval.current)
      interval.current = null
      setIsPlaying(false)
      isPlayingRef.current = false
    }

  }, [seconds])

  function resetTimer() {
    if (interval.current) {
      clearInterval(interval.current)
      interval.current = null
    }
    setSeconds(settingsInfo.duration * 60)
    setIsPlaying(false)
    isPlayingRef.current = false
  }

  // Background Image
  const [background, setBackground] = useState('')

  useEffect(() => {

    switch (settingsInfo.sound) {
      case ('forest'):
        darkMode ?
          setBackground(`url(${forestNight})`) :
          setBackground(`url(${forest})`)
        break;
      case ('fireplace'):
        darkMode ?
          setBackground(`url(${fireplaceNight})`) :
          setBackground(`url(${fireplace})`)
        break;
      case ('rain'):
        darkMode ?
          setBackground(`url(${rainDark})`) :
          setBackground(`url(${rain})`)
        break;
      case ('river'):
        darkMode ?
          setBackground(`url(${riverDark})`) :
          setBackground(`url(${river})`)
        break;
      case ('beach'):
        darkMode ?
          setBackground(`url(${beachDark})`) :
          setBackground(`url(${beach})`)
        break;
      case ('music'):
        darkMode ?
          setBackground(`url(${musicDark})`) :
          setBackground(`url(${music})`)
        break;
      case ('brownNoise'):
        darkMode ?
          setBackground(`url(${brownNoiseDark})`) :
          setBackground(`url(${day})`)
        break;
      default:
        setBackground(`url(${music})`)

    }
  }, [darkMode, settingsInfo])



  return (
    <div
      className={darkMode ? 'App dark' : 'App light'}
      style={{
        backgroundImage: `${background}`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {settingsInfo.isOpen &&
        <Settings />
      }
      <TopBar
        setIsPlaying={setIsPlaying}
        isPlayingRef={isPlayingRef}
      />
      <Timer
        percentage={percentage}
        minutesLeft={minutesLeft}
        secondsLeft={secondsLeft}
      />
      <BottomBar
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isPlayingRef={isPlayingRef}
        reset={resetTimer}
      />
      <Sound
        isPlaying={isPlaying}
        secondsLeft={secondsLeft}
        minutesLeft={minutesLeft}
      />
    </div>
  );
}

export default App;

