import React from 'react'
import { Actions } from './App';

export const DigitButton = ({dispatch,digit}) => {
  return (
    <button
    onClick={()=>dispatch({type:Actions.ADD_digit, payload:{digit}})}
    >
    {digit}</button>
  )
}

export default DigitButton;