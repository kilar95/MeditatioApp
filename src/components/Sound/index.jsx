import { useContext, useEffect, useState, useMemo, useRef, createRef } from "react";
import { SettingsContext } from "../../context/settingsContext";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';


const Sound = ({ isPlaying, secondsLeft, minutesLeft }) => {
    const { sound } = useContext(SettingsContext)
    const [url, setUrl] = useState('./sounds/music.mp3')
    const [volume, setVolume] = useState(50)

    const audioFile = useRef(null)
    const FADE_OUT_TIME = 1500;

    useEffect(() => {
        setUrl(`./sounds/${sound}.mp3`)
        audioFile.current.load()
    }, [sound, url])


    useEffect(() => {
        if (isPlaying) {
            audioFile.current.play();
            if (minutesLeft === 0) {
                if (secondsLeft <= FADE_OUT_TIME) {
                    const intervalId = setInterval(() => {
                        audioFile.current.volume -= 0.1;
                    }, 100);
                    return () => {
                        clearInterval(intervalId);
                    };
                }
            }
        } else {
            audioFile.current.pause();
        }
    }, [isPlaying])

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        const volPercentage = newValue / 100
        audioFile.current.volume = volPercentage
    };


    return (
        <div>
            <audio ref={audioFile} loop>
                <source src={url} type="audio/mpeg" />
            </audio>
            <div className='volumeDiv'>
                <Box sx={{ width: 170 }}>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDown />
                        <Slider
                            aria-label="Volume"
                            value={volume}
                            onChange={handleVolumeChange}
                            sx={{
                                color: '#74b757',
                            }}
                        />
                        <VolumeUp />
                    </Stack>
                </Box>
            </div>
        </div>

    )
}

export default Sound