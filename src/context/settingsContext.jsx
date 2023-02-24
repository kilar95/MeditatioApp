import { createContext, useState } from "react";

const SettingsContext = createContext({})

function SettingsProvider(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [duration, setDuration] = useState(2)
    const [sound, setSound] = useState('music')


    return (
        <div>
            <SettingsContext.Provider
                value={{
                    isOpen,
                    setIsOpen,
                    duration,
                    setDuration,
                    sound,
                    setSound
                }}>
                {props.children}
            </SettingsContext.Provider>
        </div>
    )
}

export { SettingsContext, SettingsProvider }
