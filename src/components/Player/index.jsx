import { useEffect, useState, useMemo } from "react";

const Sound = ({ url, isPlaying }) => {
    const [audio] = useMemo(() => new Audio(url), [url])


    useEffect(() => {
        isPlaying ? audio.play() : audio.pause();
    }, [isPlaying])
}