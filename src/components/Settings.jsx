import { useContext } from 'react'
import { DarkModeContext } from '../context/darkModeContext'
import { AiFillCloseCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { SettingsContext } from '../context/settingsContext';

const Settings = () => {
  const { darkMode } = useContext(DarkModeContext)
  const settingsInfo = useContext(SettingsContext)


  function closeSettings() {
    settingsInfo.setIsOpen(false)
  }

  const handleDurationChange = (e) => {
    settingsInfo.setDuration(e.target.value)
  }

  const handleSoundChange = (e) => {
    settingsInfo.setSound(e.target.value)
  }

  return (
    <div className={darkMode ? "settingsTab dark" : "settingsTab light"}>
      <div className='settingsBox'>
        <IconContext.Provider
          value={{
            size: "30px",
            color: "#3e3e42",
          }}>
          <AiFillCloseCircle onClick={closeSettings} />
        </IconContext.Provider>

        <div className='header'>
          <h1>Settings</h1>
        </div>

        <div className='settings'>
          <div className='singleSetting'>
            <span>Duration:</span>
            <select
              name='selectedSound'
              value={settingsInfo.duration}
              onChange={handleDurationChange}
            >
              <option value="2">2 min</option>
              <option value="5">5 min</option>
              <option value="10">10 min</option>
              <option value="30">30 min</option>
            </select>
          </div>

          <div className='singleSetting'>
            <span>Sounds:</span>
            <select
              name='selectedSound'
              value={settingsInfo.sound}
              onChange={handleSoundChange}
            >
              <option value="music">Chants</option>
              <option value="fireplace">Fireplace</option>
              <option value="forest">Forest</option>
              <option value="rain">Rain</option>
              <option value="river">River</option>
              <option value="beach">Beach</option>
              <option value="brownNoise">Brown Noise</option>
            </select>
          </div>
        </div>

        <button className='button' onClick={closeSettings}>
          Ok
        </button>

      </div>
    </div>
  )
}

export default Settings