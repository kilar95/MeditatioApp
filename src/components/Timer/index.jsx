import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';


const Timer = ({ percentage, minutesLeft, secondsLeft }) => {
    let seconds = secondsLeft
    if (secondsLeft < 10) seconds = '0' + secondsLeft

    return (
        <div className='timer'>
            <CircularProgressbar
                value={percentage}
                text={minutesLeft + ':' + seconds}
                styles={buildStyles({
                    textSize: '16px',
                    textColor: '#777',
                    pathColor: '#74b757',
                    trailColor: '#e2e2e2',
                })}
            />
        </div>

    )
}

export default Timer