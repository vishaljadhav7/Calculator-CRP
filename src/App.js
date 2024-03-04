import {useReducer} from "react";
import './App.css';
import {DigitButton} from './DigitButton';
import Operations from './Operations';
 
export const Actions = {
 ADD_digit : "add-digit",
 CHOOSE_OPERATION: "choose-operation",
 CLEAR: "clear",
 DELETE_DIGIT: "delete-digit",
 EVALUATE: "evaluate"
}

function reducer(state,{type,payload}){
    switch(type){
      case Actions.ADD_digit:
        if (payload.digit == "0" && state.currentOperand =="0") {
           return state
         }
         // if (payload.digit == "." && state.currentOperand.includes(".")) {
         //   return state
         // }
        return{
           ...state,
           // currentOperand: `${state?.currentOperand || ""}${payload?.digit}`
            currentOperand : `${state.currentOperand || ""}${payload.digit}`
        }

      case Actions.CHOOSE_OPERATION:
          if(state.currentOperand==null && state.previousOperand == null) 
          return state ;
          if (state.currentOperand == null) {
            return {
              ...state,
              operation: payload.operation,
            }
          }
          if (state.previousOperand == null) {
            return {
              ...state,
              operation: payload.operation,
              previousOperand: state.currentOperand,
              currentOperand: null,
            }
          }
          return {
            ...state,
            previousOperand: evaluate(state),
            operation: payload.operation,
            currentOperand: null,
        }

      case Actions.CLEAR:
        return{
          ...state,
          currentOperand: "",
          previousOperand:"",
          operation:""
        }

      case Actions.EVALUATE:
    
        return{
            ...state,
            previousOperand: null,
            operation: null,
            currentOperand: evaluate(state),
          }

    }  
}  



function evaluate ({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand);
  const current =  parseFloat(currentOperand);
  // if (isNaN(prev) || isNaN(current)) return ""
  let computation = "";
  switch(operation){
    case "+":
      computation = prev + current;
      break
    case "-":
      computation = prev - current;
      break   
    case "*":
      computation = prev * current;
      break  
    case "/":
      computation = prev / current;
      break  
  }
  return computation.toString()
  
}



function App() {

  const [{currentOperand,previousOperand,operation},dispatch] = useReducer(reducer, {});  
  return (
     <>
       <div className='calculator-grid'>
          <div className='output' >
              <div className='previousOperand'>{previousOperand} {operation}</div>
              <div className='currentOperand'>{currentOperand}</div>
          </div>
          <button className="span-two" 
           onClick={() => dispatch({type : Actions.CLEAR})}
          >AC</button>
          {/* <button>del</button>
          <button>/</button> */}
          <Operations operation = {"DEL"} dispatch={dispatch}></Operations>
          <Operations operation = {"/"} dispatch={dispatch}></Operations>

          <DigitButton digit={1} dispatch={dispatch}></DigitButton>
          <DigitButton digit={2} dispatch={dispatch}></DigitButton>
          <DigitButton digit={3} dispatch={dispatch}></DigitButton>
          <Operations operation = {"*"} dispatch={dispatch}></Operations>
          <DigitButton digit={4} dispatch={dispatch}></DigitButton>
          <DigitButton digit={5} dispatch={dispatch}></DigitButton>
          <DigitButton digit={6} dispatch={dispatch}></DigitButton>
          <Operations operation = {"-"} dispatch={dispatch}></Operations>
          <DigitButton digit={7} dispatch={dispatch}></DigitButton>
          <DigitButton digit={8} dispatch={dispatch}></DigitButton>
          <DigitButton digit={9} dispatch={dispatch}></DigitButton>
          <Operations operation = {"+"} dispatch={dispatch}></Operations>
          <DigitButton digit={0} dispatch={dispatch}></DigitButton>
          <DigitButton digit={"."} dispatch={dispatch}></DigitButton>
          <button className="span-two"
          onClick={() => dispatch({ type: Actions.EVALUATE })}
          >=</button>
       </div>
     </>
  );
}

export default App;
