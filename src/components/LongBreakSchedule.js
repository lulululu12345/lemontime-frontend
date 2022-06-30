import React from 'react'

const LongBreakSchedule = ({ longBreakIntervalValue, setLongBreakIntervalValue, className }) => {
  // After task container has been built, I would like the option of scheduling a long break per completed pomodoros, or per completetd task

  const handleLongBreakIntervalChange = (event) => {
    const eventValue = event.target.value;
    setLongBreakIntervalValue(eventValue)
  }

  return <input className='input-settings' type='number' value={longBreakIntervalValue} onChange={handleLongBreakIntervalChange} />
}

export default LongBreakSchedule
