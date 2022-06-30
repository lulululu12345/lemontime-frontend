import React, { useState, useEffect } from 'react'

const TimeBlockButton = ({ setStart, setTime, currentTimeBlock, setCurrentTimeBlock, newBlock, text }) => {
  const [className, setClassName] = useState('button btn-time-block')
  
  useEffect(() => {
    if (currentTimeBlock.name === newBlock.name) {
      setClassName(`${className} wrap-time-block-selected`)
    } else {
      setClassName('button btn-time-block')
    }
  }, [currentTimeBlock])

  const onClickBlock = () => {
    setStart(false)
    setTime(newBlock.durMs)
    setCurrentTimeBlock(newBlock)
  }

  return <button onClick={onClickBlock} className={className}>{text}</button>
}

export default TimeBlockButton