import React, {useEffect, useRef, useState} from 'react'
import {openWeatherMapKey, ipFindKey} from './config'
import Commands from './components/Commands'
import './App.css';

const App = () => {
  const version = '2.0.7'

  const messagesEndRef = useRef(null)

  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ]
  }

  const updateScroll = () => {
    window.scrollTo(0,document.body.scrollHeight)
  }

  setTimeout(updateScroll,250)

  const [keyPress, setKeyPress] = useState('')
  const [inputField, setInputField] = useState([])
  const [inputRef, setInputFocus] = useFocus()
  const [showHeader, setShowHeader] = useState(true)
  const [ip, setIp] = useState({})
  const [weather, setWeather] = useState({})

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
    }
  }

  return (
    <div className="app" onClick={setInputFocus}>
      {showHeader && <div className="header">
        <div className="welcome">Welcome to Sercan's Homepage <span className="small">(v{version})</span></div>
        <div className="line"><strong>Date:</strong> {new Date().toString()}</div>
        <div className="line"><strong>Screen Resolution:</strong> {window.screen.width}x{window.screen.height}px, <strong>Depth:</strong> {window.screen.pixelDepth}px</div>
        <div className="line"><strong>Platform:</strong> {navigator.platform}, <strong>User agent:</strong> {navigator.userAgent}</div>
        <div className="line"><strong>Ip address:</strong> {ip.ip_address && <span> {ip.ip_address}, <strong>Local languages:</strong> {ip.languages && ip.languages.map((language, index) => <span key={language}> {language}</span>)}, <strong>Currency:</strong> {ip.currency}</span>}</div>
        <div className="line"><strong>Location:</strong> {ip.ip_address && <span>{ip.city}({ip.region_code}), {ip.country}, {ip.continent}, <strong>Coordinates:</strong> {ip.latitude}, {ip.longitude}</span>}</div>
        <div className="line"><strong>Weather:</strong> {weather.current && <span>Temp: {weather.current.temp}C, Feels like: {weather.current.feels_like}C, Humidity: {weather.current.humidity}%, Wind: {weather.current.wind_speed}m/s, UV: {weather.current.uvi}</span>}</div>
        <div className="line" />
        <div className="line">Enter <button onClick={() => setInputField([...inputField, 'info'])}>info</button> for more information or <button onClick={() => setInputField([...inputField, 'help'])}>help</button>/<button onClick={() => setInputField([...inputField, 'commands'])}>commands</button> for command list.</div>
      </div>}
      {inputField.map((command, index) =>
        <div key={command + index}>
          <div className="line split">
            <div className="user">[user@inaler.com]&nbsp;#</div>
            <div>{command}</div>
          </div>

          {command !== '' && <div className="line split">
            <div className="result">
              <Commands
                command={command}
                inputField={inputField}
                setInputField={setInputField}
                ip={ip}
                weather={weather}
              />
            </div>
          </div>}
        </div>
      )}

      <div className="line split" style={{ paddingBottom: 20 }}>
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
