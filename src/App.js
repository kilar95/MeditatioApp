import './App.css';
import TopBar from './components/Topbar';
import BottomBar from './components/BottomBar';
import Timer from './components/Timer';
import { DarkModeContext } from './context/darkModeContext';
import { SettingsContext } from './context/settingsContext';
import { useContext, useState, useEffect, useRef, useMemo } from 'react';
import Settings from './components/Settings/Settings';

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
    }, 100)
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

  return (
    <div className={darkMode ? 'App dark' : 'App light'}>
      {settingsInfo.isOpen &&
        <Settings />
      }
      <TopBar />
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
    </div>
  );
}

export default App;






  // CODICE FUNZIONANTE

  // const secondsLeftRef = useRef(secondsLeft)
  // const isPlayingRef = useRef(isPlaying)

  // function startTimer() {
  //   secondsLeftRef.current = settingsInfo.duration * 60
  //   setSecondsLeft(secondsLeftRef.current)
  // }

  // function tick() {
  //   secondsLeftRef.current--;
  //   setSecondsLeft(secondsLeftRef.current)
  // }

  // useEffect(() => {
  //   startTimer();

  //   const interval = setInterval(() => {
  //     if (isPlayingRef.current) {
  //       tick()
  //     } else {
  //       return;
  //     }

  //   }, 1000)

  //   return () => clearInterval(interval)
  // }, [settingsInfo])

  // const totalSeconds = settingsInfo.duration * 60
  // const percentage = Math.round(secondsLeft / totalSeconds * 100)

  // const minutes = Math.floor(secondsLeft / 60)
  // let seconds = secondsLeft % 60
