import React, {useEffect, useRef, useState} from 'react'
import './App.css';

function App() {

  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ]
  }

  const [keyPress, setKeyPress] = useState('')
  const [inputField, setInputField] = useState([])
  const [inputRef, setInputFocus] = useFocus()

  const onKeyUp = event => {
    const value = event.target.value

    setKeyPress(value)

    console.log(value)

    if (event.key === 'Enter' || event.keyCode === 13) {
      setInputField([...inputField, value])

      console.log([...inputField, value])
      console.log(inputField[inputField.length-1])

      setKeyPress('')
    }
  }

  return (
    <div className="app" onClick={setInputFocus}>
      <div className="header">
        <div className="welcome">welcome to sercan.inaler.com</div>
        <div className="line">{new Date().toString()}</div>
        <div className="line">{navigator.userAgent}</div>
        <div className="line">Enter "help" for more information.</div>
      </div>
      {inputField.map((data, index) =>
        <div key={data+index}>
          <div className="line">
            <div className="user">[user@inaler.com] #</div>
            <div>{data}</div>
          </div>

          {data !== '' && <div className="line">
            <div className="result">{data}: commmand not found</div>
          </div>}
        </div>
      )}

      <div className="line">
        <div className="user">[user@inaler.com] #</div>
        <div>
          <input className="input"
                 autoFocus
                 onKeyUp={onKeyUp}
                 onChange={onKeyUp}
                 value={keyPress}
                 ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
