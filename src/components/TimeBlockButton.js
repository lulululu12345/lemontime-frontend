import React, { useState, useEffect } from 'react'

const TimeBlockButton = ({ setStart, setTime, currentTimeBlock, setCurrentTimeBlock, newBlock, text }) => {
  const [className, setClassName] = useState('button button-timeBlock')
  
  useEffect(() => {
    if (currentTimeBlock.name === newBlock.name) {
      setClassName(`${className} timeBlock-clicked`)
    } else {
      setClassName('button button-timeBlock')
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