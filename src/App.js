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

  const result = data => {
    const commandList = [
      'help', 'list', 'source',
      'email', 'cat', 'linkedin', 'clear', 'github', 'clock', 'date', 'echo', 'help', 'uname', 'whoami'
    ];

    switch(data) {
      case 'list':
        return(
          commandList.map((command) => <span key={command} style={{marginRight: 12}}>{command}</span>)
        )
      case 'help':
        return(
          <div>
            Welcome to Sercan's Homepage<br />
            This project is made by React(v17) as a personal reference project.<br />
            You can use 'list' command to get the list of available commands to use and discover the hidden sections of my website.<br />
            There can be some limitations to access to all data.<br />
            You will need authorization from me personally to access this sections.<br /><br />
            Cheers<br />
            Sercan
          </div>
        )
      default:
        return(data + ': command not found')
    }
  }

  return (
    <div className="app" onClick={setInputFocus}>
      <div className="header">
        <div className="welcome">Welcome to sercan's homepage (v2.0.3)</div>
        <div className="line">Date: {new Date().toString()}</div>
        <div className="line">User agent: {navigator.userAgent}</div>
        <div className="line">Screen Resolution: {window.screen.width}x{window.screen.height}px, Depth: {window.screen.pixelDepth}px</div>
        <div className="line">Ip address: {ipInfo.ip && <span>{ipInfo.ip}, Location: {ipInfo.postal}, {ipInfo.city}, {ipInfo.country_name}({ipInfo.latitude},{ipInfo.longitude})</span>}</div>
        <div className="line">Provider: {ipInfo.ip && <span>{ipInfo.org}, Supported languages: {ipInfo.languages}, Currency: {ipInfo.currency}({ipInfo.currency_name})</span>}</div>
        <div className="line" />
        <div className="line">Enter "help" for more information or "list" for command list.</div>
      </div>
      {inputField.map((data, index) =>
        <div key={data+index}>
          <div className="line split">
            <div className="user">[user@inaler.com] #</div>
            <div>{data}</div>
          </div>

          {data !== '' && <div className="line split">
            <div className="result">{result(data)}</div>
          </div>}
        </div>
      )}

      <div className="line split">
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
