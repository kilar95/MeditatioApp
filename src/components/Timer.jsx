import { useContext, useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { DarkModeContext } from '../context/darkModeContext';


const Timer = ({ percentage, minutesLeft, secondsLeft }) => {
    const { darkMode } = useContext(DarkModeContext)
    const [textColor, setTextColor] = useState('')
    let seconds = secondsLeft
    if (secondsLeft < 10) seconds = '0' + secondsLeft

    // useEffect(() => {
    //     darkMode ? setTextColor("#e2e2e2da") : setTextColor("#3e3e42")
    // }, [darkMode])

    return (
        <div className='timer'>
            <CircularProgressbar
                value={percentage}
                text={minutesLeft + ':' + seconds}
                styles={buildStyles({
                    textSize: '16px',
                    textColor: `#fff`,
                    pathColor: '#e2e2e2d0',
                    trailColor: '#777',
                })}
            />
        </div>

    )
}

export default Timer