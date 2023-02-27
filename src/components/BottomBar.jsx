import { useContext } from 'react'
import { IconContext } from 'react-icons'
import { DarkModeContext } from '../context/darkModeContext'
import { AiFillPauseCircle } from 'react-icons/ai'
import { VscDebugRestart } from 'react-icons/vsc'
import { AiFillPlayCircle } from 'react-icons/ai'


const BottomBar = ({ isPlaying, setIsPlaying, isPlayingRef, reset }) => {
    const { darkMode } = useContext(DarkModeContext)

    return (
        <div className="bottomBar">
            <IconContext.Provider
                value={{
                    size: "50px",
                    color: darkMode ? "#ffffff" : "#3e3e42"
                }} >
                <div>
                    {isPlaying ?
                        <AiFillPauseCircle
                            onClick={() => { setIsPlaying(false); isPlayingRef.current = false; }}
                        />
                        :
                        <AiFillPlayCircle
                            onClick={() => { setIsPlaying(true); isPlayingRef.current = true; }}
                        />
                    }
                </div>
                <div>
                    <VscDebugRestart onClick={reset} />
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default BottomBar