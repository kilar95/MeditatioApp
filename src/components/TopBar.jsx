import React, { useContext } from 'react'
import { DarkModeContext } from '../context/darkModeContext'
import { RiSettings3Fill } from 'react-icons/ri'
import { MdDarkMode } from 'react-icons/md'
import { MdLightMode } from 'react-icons/md'
import { IconContext } from "react-icons";
import { SettingsContext } from '../context/settingsContext'
import { useRef } from 'react'



const TopBar = ({ setIsPlaying, isPlayingRef }) => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
    const { setIsOpen } = useContext(SettingsContext)
    // const isPlayingRef = useRef(isPlaying)

    function openSettings() {
        setIsPlaying(false)
        isPlayingRef.current = false
        setIsOpen(true)
    }

    return (
        <div className={darkMode ? "topBar dark" : "topBar light"}>
            <IconContext.Provider
                value={{
                    size: "40px",
                    color: "#ffffff"
                }}>
                <div>
                    <RiSettings3Fill onClick={openSettings} />
                </div>
                <div onClick={toggleDarkMode}>
                    {darkMode ? <MdLightMode /> : <MdDarkMode />}
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default TopBar