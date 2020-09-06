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
    fetch('https://api.ipfind.com/me?auth=c6db4632-ee7e-413a-a26d-bffcc39d574f').then(response => {
      return response.json()
    }).then(data => {
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
      setInputField([...inputField, value.toLowerCase()])
      setKeyPress('')
    }
  }

  const result = data => {
    const commandList = [
      'help', 'list', 'clear', 'source', 'email', 'linkedin', 'github', 'cv'/*, 'clock', 'date', 'echo', 'uname', 'whoami'*/
    ];

    switch(data) {
      case 'list':
        return(
          commandList.map((command) => <span key={command} style={{paddingRight: 12}}>{command}</span>)
        )
      case 'help':
        return(
          <div>
            Sercan's Homepage Help<br /><br />
            This project is made by React(v17) as a personal reference project.<br />
            You can use "list" command to get the list of available commands and it's up to you to discover the hidden and funny sections of my website.<br />
            There can be limitations to access some data.<br />
            You may need authorization from me personally to access limit sections.<br /><br />
            Cheers,<br />
            Sercan
          </div>
        )
      case 'clear':
        setInputField([])
        break
      case 'source':
        return(
          <div>Github repository: <a href="https://github.com/sinaler/react-terminal-homepage" rel="noopener noreferrer" target="_blank">React terminal homepage</a></div>
        )
      case 'email':
        return(
          <div><a href="mailto:sercan@gmail.com">sercan@gmail.com</a></div>
        )
      case 'linkedin':
        return(
          <div><a href="https://www.linkedin.com/in/sinaler"rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/sinaler</a></div>
        )
      case 'github':
        return(
          <div><a href="https://github.com/sinaler" rel="noopener noreferrer" target="_blank">https://github.com/sinaler</a></div>
        )
      case 'cv':
        return(
          <div><a href="/cv-sercan-inaler-2020-frontend.pdf" rel="noopener noreferrer" target="_blank">cv-sercan-inaler-2020-frontend.pdf</a></div>
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
        <div className="line">Screen Resolution: {window.screen.width}x{window.screen.height}px, Depth: {window.screen.pixelDepth}px</div>
        <div className="line">Ip address: {ipInfo.ip_address && <span> {ipInfo.ip_address}, Supported languages: {ipInfo.languages && ipInfo.languages.map((language, index) => <span key={language}> {language}</span>)}, Currency: {ipInfo.currency}</span>}</div>
        <div className="line">Location: {ipInfo.ip_address && <span>{ipInfo.city}({ipInfo.region_code}), {ipInfo.country}, {ipInfo.continent}, Coordinates: {ipInfo.latitude}, {ipInfo.longitude}</span>}</div>
        <div className="line">User agent: {navigator.userAgent}</div>
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
                 onKeyUp={onKeyUp}
                 onChange={onKeyUp}
                 value={keyPress}
                 ref={inputRef}
                 autoFocus
          />
        </div>
      </div>
    </div>
  );
}

export default App;
