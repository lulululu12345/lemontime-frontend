import React, { useState, useEffect } from 'react'

const App = () => {
  const [time, setTime] = useState(1500000)
  const [start, setStart] = useState(false)

  useEffect(() => {
    let interval = null

    if (start) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 10)
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [start])

  return (
    <div className='App'>
      <h1>Timer</h1>
      <h2>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        {/* <span>{('0' + (time / 10) % 1000).slice(-2)}</span> */}
      </h2>
      <div>
        <button onClick={() => setStart(true)}>Play</button>
        <button onClick={() => setStart(false)}>Pause</button>
        <button onClick={() => {setTime(1500000); setStart(false);}}>Reset</button>
      </div>
    </div>
  )
}

export default App
