import React from 'react'

const TimeBlocks = ({ setStart, setTime, setCurrentTimeBlock, pomodoro, shortBreak, longBreak }) => {
  return (
    <div>
      <TimeBlockButton
        setStart={setStart}
        setTime={setTime}
        setCurrentTimeBlock={setCurrentTimeBlock}
        newBlock={pomodoro}
        text='Pomodoro'
      />
      <TimeBlockButton
        setStart={setStart}
        setTime={setTime}
        setCurrentTimeBlock={setCurrentTimeBlock}
        newBlock={shortBreak}
        text='Short Break'
      />
      <TimeBlockButton
        setStart={setStart}
        setTime={setTime}
        setCurrentTimeBlock={setCurrentTimeBlock}
        newBlock={longBreak}
        text='Long Break'
      />
    </div>
  )
}

const TimeBlockButton = ({ setStart, setTime, setCurrentTimeBlock, newBlock, text }) => {
  const onClickBlock = () => {
    setStart(false)
    setTime(newBlock.durMs)
    setCurrentTimeBlock(newBlock)
  }
  return <button onClick={onClickBlock}>{text}</button>
}

export default TimeBlocks