import React, {useEffect, useRef, useState} from 'react'
import {openWeatherMapKey, ipFindKey} from './config'
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
  const [ip, setIp] = useState({})
  const [weather, setWeather] = useState({})

  const getIpAddress = () => {
    fetch('https://api.ipfind.com/me?auth=' + ipFindKey).then(response => {
      return response.json()
    }).then(data => {
      setIp(data)
      getWeather(data.latitude, data.longitude)
    })
  }

  const getWeather = (latitude, longitude) => {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=' + openWeatherMapKey).then(response => {
      return response.json()
    }).then(data => {
      setWeather(data)
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
        <div className="welcome">Welcome to sercan's homepage (v2.1.3)</div>
        <div className="line"><strong>Date:</strong> {new Date().toString()}</div>
        <div className="line"><strong>Screen Resolution:</strong> {window.screen.width}x{window.screen.height}px, <strong>Depth:</strong> {window.screen.pixelDepth}px</div>
        <div className="line"><strong>Platform:</strong> {navigator.platform}, <strong>User agent:</strong> {navigator.userAgent}</div>
        <div className="line"><strong>Ip address:</strong> {ip.ip_address && <span> {ip.ip_address}, <strong>Local languages:</strong> {ip.languages && ip.languages.map((language, index) => <span key={language}> {language}</span>)}, Currency: {ip.currency}</span>}</div>
        <div className="line"><strong>Location:</strong> {ip.ip_address && <span>{ip.city}({ip.region_code}), {ip.country}, {ip.continent}, <strong>Coordinates:</strong> {ip.latitude}, {ip.longitude}</span>}</div>
        <div className="line"><strong>Weather:</strong> {weather.current && <span>Temp: {weather.current.temp}C, Feels like: {weather.current.feels_like}C, Humidity: {weather.current.humidity}%, Wind: {weather.current.wind_speed}m/s, UV: {weather.current.uvi}</span>}</div>
        <div className="line" />
        <div className="line">Enter <strong>"help"</strong> for more information or <strong>"list"</strong> for command list.</div>
      </div>
      {inputField.map((data, index) =>
        <div key={data+index}>
          <div className="line split">
            <div className="user">[user@inaler.com]&nbsp;#</div>
            <div>{data}</div>
          </div>

          {data !== '' && <div className="line split">
            <div className="result">{result(data)}</div>
          </div>}
        </div>
      )}

      <div className="line split">
        <div className="user">[user@inaler.com]&nbsp;#</div>
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
