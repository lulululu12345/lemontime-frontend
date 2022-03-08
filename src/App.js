import React, { useState, useEffect } from 'react'

const App = () => {
  const [duration, setDuration] = useState(1500000)
  const [timer, setTimer] = useState({ minutes: 25, seconds: 0 })
  const [running, setRunning] = useState(true)

  return (
    <div>
      <h2>Timer</h2>
      <Timer
        timer={timer}
        setTimer={setTimer}
        running={running}
        setRunning={setRunning}
        duration={duration}
        setDuration={setDuration}
      />
    </div>
  )
}




const Timer = ({ duration, setDuration, timer, setTimer, running, setRunning}) => {
  // Functions for converting duration into minutes and seconds to be displayed by timer
  const durMinutes = duration => Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
  const durSeconds = duration => Math.floor((duration % (1000 * 60)) / 1000)
  // Effect hook for starting the timer after the component is rendered

  useEffect(() => {
    // Function run by setInterval for updating timer state and duration variable
    const updateDuration = () => {
      setDuration(duration -= 1000)
      if (duration >= 0) {
      return setTimer({
          minutes: durMinutes(duration),
          seconds: durSeconds(duration)
        })
      }
      return setRunning(false)
    }

    const clock = setInterval(() => {
      updateDuration()
      console.log('tick');
      if (duration <=0) {
        console.log('your piece of shit timer works you fucking idiot');
        clearInterval(clock)
      } 
    }, 1000)
  }, [])

  // JSX to be returned to the App component
  return (
    <div>
      {`${timer.minutes}:${timer.seconds}`}
    </div>
  )
}

export default App
