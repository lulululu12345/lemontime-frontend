import React from 'react'

const LongBreakSchedule = ({ longBreakIntervalValue, setLongBreakIntervalValue }) => {
  // After task container has been built, I would like the option of scheduling a long break per completed pomodoros, or per completetd task

  const handleLongBreakIntervalChange = (event) => {
    const eventValue = event.target.value;
    setLongBreakIntervalValue(eventValue)
  }

  return (
    <div>
      <label>Long Break interval</label>
      <br/>
      <input type='number' value={longBreakIntervalValue} onChange={handleLongBreakIntervalChange} />
    </div>
  )
}

export default LongBreakSchedule
