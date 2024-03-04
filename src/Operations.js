import React from 'react'
import {Actions} from './App';
const Operations = ({operation,dispatch}) => {
  return (
    <button
    onClick={()=>dispatch({type:Actions. CHOOSE_OPERATION,payload:{operation}} )}
    > 
     {operation}
    </button>
  )
}

export default Operations;