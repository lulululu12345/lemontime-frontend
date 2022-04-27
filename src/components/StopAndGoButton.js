import React, { useState, useEffect } from 'react'
import { FaPlay, FaStop, FaPause } from 'react-icons/fa'
import startStopMp3 from '../assets/audio/start-stop-3.mp3'
import ReactAudioPlayer from 'react-audio-player'

// StopAndGoButton component for starting and stopping the timer
const StopAndGoButton = ({ start, setStart }) => {
  const [className, setClassName] = useState('button stopAndGoButton')
  const [audio] = useState(new Audio(startStopMp3))
  const [playing, setPlaying] = useState(false)

  const onClickStopAndGo = () => {
    setStart(!start)
    setPlaying(!playing)
  }

  useEffect(() => {
    start ? setClassName('button stopAndGoButton stopAndGoStopper') : setClassName('button stopAndGoButton')
  }, [start])

  useEffect(() => {
    // playing ? audio.play() : audio.pause()
    if (playing) {
      audio.play()
    }
  }, [playing])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [])

  return (
    <>
      <button onClick={onClickStopAndGo} className={className}>{start ? <FaPause/> : <FaPlay/>}</button>
      <ReactAudioPlayer src={startStopMp3}/>
    </>
  ) 
}

export default StopAndGoButton
