import React from 'react'

const TimeBlocks = ({ setStart, setTime, setCurrentTask, pomodoro, shortBreak, longBreak }) => {
  return (
    <div>
      <TimeBlockButton
        setStart={setStart}
        setTime={setTime}
        settCurrentTask={setCurrentTask}
        newBlock={pomodoro}
        text='Pomodoro'
      />
      <TimeBlockButton
        setStart={setStart}
        setTime={setTime}
        settCurrentTask={setCurrentTask}
        newBlock={shortBreak}
        text='Short Break'
      />
      <TimeBlockButton
        setStart={setStart}
        setTime={setTime}
        settCurrentTask={setCurrentTask}
        newBlock={longBreak}
        text='Long Break'
      />
    </div>
  )
}

const TimeBlockButton = ({ setStart, setTime, setCurrentTask, newBlock, text }) => {

  const onClickBlock = () => {
    setStart(false)
    setTime(newBlock.durMs)
    setCurrentTask(newBlock)
  }
  return <button onClick={onClickBlock}>{text}</button>
}

export default TimeBlocks