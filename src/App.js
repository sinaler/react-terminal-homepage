import React, {useEffect, useRef, useState} from 'react'
import {openWeatherMapKey, ipFindKey} from './config'
import Commands from './components/Commands'
import './App.css';

const App = () => {
  const version = '2.0.8'

  const messagesEndRef = useRef(null)

  const useFocus = () => {
    const htmlElRef = useRef(null)

    const setFocus = () => {
      const x = window.scrollX, y = window.scrollY;
      htmlElRef.current &&  htmlElRef.current.focus()
      window.scrollTo(x, y);
    }

    return [ htmlElRef, setFocus ]
  }

  const updateScroll = () => {
    window.scrollTo(0,document.body.scrollHeight)
  }

  const [keyPress, setKeyPress] = useState('')
  const [inputField, setInputField] = useState([])
  const [inputRef, setInputFocus] = useFocus()
  const [showHeader, setShowHeader] = useState(true)
  const [ip, setIp] = useState({})
  const [weather, setWeather] = useState({})
  const [dateTime, setDateTime] = useState('')

  setInterval(() => setDateTime(new Date().toString().slice(0, -12)),1000)

  const getWeather = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=' + openWeatherMapKey).then(response => {
        return response.json()
      }).then(data => {
        setWeather(data)
      })
    }
  }

  useEffect(() => {
    const getIpAddress = () => {
      fetch('https://api.ipfind.com/me?auth=' + ipFindKey).then(response => {
        return response.json()
      }).then(data => {
        setIp(data)
        getWeather(data.latitude, data.longitude)
      })
    }

    if (window.location.hostname !== 'localhost') {
      getIpAddress()
    }

  }, [])

  const handleButtonClick = (value) => {
    setTimeout(updateScroll,200)
    setInputField(value)
  }

  const onKeyUp = event => {
    const value = event.target.value.toLowerCase()
    setKeyPress(value)

    if (event.key === 'Enter' || event.keyCode === 13) {
      setInputField([...inputField, value])
      setKeyPress('')

      if (value === 'clear') {
        setInputField([])
        setShowHeader(false)
      }

      if (value === 'reload') {
        setInputField([])
        setShowHeader(true)
      }

      if (value === 'get ip') {
        fetch('https://api.ipfind.com/me?auth=' + ipFindKey).then(response => {
          return response.json()
        }).then(data => {
          setIp(data)
        })
      }

      if (value === 'get weather') {
        getWeather(ip.latitude, ip.longitude)
      }

      setTimeout(updateScroll,200)
    }
  }

  return (
    <div className="app" onClick={setInputFocus}>
      {showHeader && <div className="header">
        <div className="welcome">Welcome to Sercan's Homepage <span className="small">(v{version})</span></div>
        <div className="line"><strong>Date:</strong> {dateTime}</div>
        <div className="line"><strong>Screen Resolution:</strong> {window.screen.width}x{window.screen.height}px, <strong>Depth:</strong> {window.screen.pixelDepth}px</div>
        <div className="line"><strong>Platform:</strong> {navigator.platform}, <strong>User agent:</strong> {navigator.userAgent}</div>
        <div className="line"><strong>Ip address:</strong> {ip.ip_address && <span> {ip.ip_address}, <strong>Local languages:</strong> {ip.languages && ip.languages.map((language, index) => <span key={language}> {language}</span>)}, <strong>Currency:</strong> {ip.currency}</span>}</div>
        <div className="line"><strong>Location:</strong> {ip.ip_address && <span>{ip.city}({ip.region_code}), {ip.country}, {ip.continent}, <strong>Coordinates:</strong> {ip.latitude}, {ip.longitude}</span>}</div>
        <div className="line"><strong>Weather:</strong> {weather.current && <span>Temp: {weather.current.temp}C, Feels like: {weather.current.feels_like}C, Humidity: {weather.current.humidity}%, Wind: {weather.current.wind_speed}m/s, UV: {weather.current.uvi}</span>}</div>
        <div className="line" />
        <div className="line">
          Enter <button onClick={() => handleButtonClick([...inputField, 'info'])}>info</button> for more information or <button onClick={() => handleButtonClick([...inputField, 'help'])}>help</button>/<button onClick={() => handleButtonClick([...inputField, 'commands'])}>commands</button> for command list.
        </div>
      </div>}
      {inputField.map((command, index) =>
        <div key={command + index} style={{marginTop: '15px'}}>
          <div className="line split">
            <div className="user">[user@inaler.com]&nbsp;#</div>
            <div>{command}</div>
          </div>

          {command !== '' && <div className="line split">
            <div className="result">
              <Commands
                command={command}
                inputField={inputField}
                handleButtonClick={handleButtonClick}
                ip={ip}
                weather={weather}
                dateTime={dateTime}
              />
            </div>
          </div>}
        </div>
      )}

      <div className="line split" style={{ paddingBottom: 15, paddingTop: 15 }}>
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
      <div ref={messagesEndRef} />
    </div>
  );
}

export default App;
