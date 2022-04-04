import React from 'react'
import { GrPowerReset } from 'react-icons/gr'

// ResetButton component for resetting timer
const ResetButton = ({ time, setTime, setStart, currentTimeBlock }) => {
  const onClickReset = () => {
    setTime(currentTimeBlock.durMs)
    setStart(false)
  }
  
  return (
    <>
      {time < currentTimeBlock.durMs
        ? <button onClick={onClickReset} className='button resetButton'>
            <GrPowerReset
              size='2.9rem'
            />
          </button>
        : <div></div>
      }
    </>
  )
}

export default ResetButton
