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
  const [ipInfo, setIpInfo] = useState({})

  const getIpAddress = () => {
    fetch('https://ipapi.co/json').then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    }).then(data => {
      console.log(data)
      setIpInfo(data)
    })
  }

  useEffect(() => {
    getIpAddress()
  }, [])

  const onKeyUp = event => {
    const value = event.target.value
    setKeyPress(value)

    if (event.key === 'Enter' || event.keyCode === 13) {
      setInputField([...inputField, value])
      setKeyPress('')
    }
  }

  return (
    <div className="app" onClick={setInputFocus}>
      <div className="header">
        <div className="welcome">Welcome to sercan's personal homepage (sercan.inaler.com)</div>
        <div className="line">Date: {new Date().toString()}</div>
        <div className="line">User agent: {navigator.userAgent}</div>
        <div className="line">Screen Resolution: {window.screen.width}x{window.screen.height}px, Depth: {window.screen.pixelDepth}px</div>
        {ipInfo.ip && <div>
          <div className="line">Ip address: {ipInfo.ip}, Location: {ipInfo.postal}, {ipInfo.city}, {ipInfo.country_name}({ipInfo.latitude},{ipInfo.longitude})</div>
          <div className="line">Provider: {ipInfo.org}, Supported languages: {ipInfo.languages}, Currency: {ipInfo.currency}({ipInfo.currency_name})</div>
        </div>}
        <div className="line" />
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
