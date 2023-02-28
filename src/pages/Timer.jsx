import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import Counter from '../components/Counter';
import { SettingsContext } from '../context/settingsContext';
import { useContext, useState, useEffect, useRef, useMemo } from 'react';
import Settings from '../components/Settings';
import Sound from '../components/Sound';

const Timer = () => {
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


  return (
    <div className='timer'>
      {settingsInfo.isOpen &&
        <Settings />
      }
      <TopBar
        setIsPlaying={setIsPlaying}
        isPlayingRef={isPlayingRef}
      />
      <Counter
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

export default Timer