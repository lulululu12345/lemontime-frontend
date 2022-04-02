import React from 'react'

const TimeBlockButton = ({ setStart, setTime, setCurrentTimeBlock, newBlock, text }) => {
  const onClickBlock = () => {
    setStart(false)
    setTime(newBlock.durMs)
    setCurrentTimeBlock(newBlock)
  }
  return <button onClick={onClickBlock}>{text}</button>
}

export default TimeBlockButton