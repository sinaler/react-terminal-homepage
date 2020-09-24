import React, {useEffect, useRef, useState} from 'react'
import {openWeatherMapKey, ipFindKey} from './config'
import axios from 'axios'
import Header from './components/Header'
import Commands from './components/Commands'
import './App.scss'

const App = () => {
  const version = '2.2.1'
  const theme = {text: '#FFFFFF', background: '#000000'}

  const useFocus = () => {
    const htmlElRef = useRef<HTMLInputElement>(null)
    const setFocus = () => {
      const x = window.scrollX, y = window.scrollY;
      htmlElRef.current && htmlElRef.current.focus()
      window.scrollTo(x, y);
    }
    return [ htmlElRef, setFocus ] as const
  }

  const updateScroll = () => {
    window.scrollTo(0,document.body.scrollHeight)
  }

  const [keyPress, setKeyPress] = useState('')
  const [inputField, setInputField] = useState<string[]>([])
  const [inputRef, setInputFocus] = useFocus()
  const [showHeader, setShowHeader] = useState(true)

  interface ip {
    latitude?: string,
    longitude?: string,
    ip_address?: string,
    languages?: string[],
    currency?: string,
    city?: string,
    region_code?: string,
    country?: string,
    continent?: string,
    current?: {
      temp: string,
    },
  }
  interface weather {
    current?: {
      temp: string,
      feels_like: string,
      humidity: string,
      wind_speed: string,
      uvi: string
    }
  }

  const [ip, setIp] = useState<ip>({})
  const [weather, setWeather] = useState<weather>({})

  // @ts-ignore TODO
  const [color, setColor] = useState(JSON.parse(localStorage.getItem('color')) || theme)
  const [dateTime, setDateTime] = useState('')

  const getWeather = (latitude: string, longitude: string) => {
    if (latitude && longitude) {
      axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=' + openWeatherMapKey)
        .then(response => {
          setWeather(response.data)
        })
    }
  }

  useEffect(() => {
    const getIpAddress = () => {
      axios.get('https://api.ipfind.com/me?auth=' + ipFindKey)
        .then(response => {
          setIp(response.data)
          getWeather(response.data.latitude, response.data.longitude)
        })
    }

    if (window.location.hostname !== 'localhost') {
      getIpAddress()
    }
  }, [])

  const interval = useRef<number>()

  useEffect(() => {
    interval.current = setInterval(() => {
      setDateTime(new Date().toString().slice(0, -12))
    },1000)
    return () => clearInterval(interval.current);
  });

  const checkSystemCommands = (command: string) => {
    if (command === 'snake') {
      setTimeout(() => clearInterval(interval.current), 1000)
    }

    if (command === 'clear') {
      setInputField([])
      setShowHeader(false)
    }

    if (command === 'reload') {
      setInputField([])
      setShowHeader(true)
    }

    if (command === 'reset') {
      setInputField([])
      setShowHeader(true)
      localStorage.removeItem('color')
      setColor(theme)
    }

    if (command === 'get ip') {
      fetch('https://api.ipfind.com/me?auth=' + ipFindKey).then(response => {
        return response.json()
      }).then(data => {
        setIp(data)
      })
    }

    if (command === 'get weather') {
      getWeather(ip.latitude!, ip.longitude!)
    }
  }

  const handleButtonClick = (value: string) => {
    setTimeout(updateScroll,150)
    setInputField([...inputField, value])
    checkSystemCommands(value)
  }

  const onKeyUp = (event: any) => {
    const value = event.target.value.toLowerCase()
    setKeyPress(value)

    if (event.key === 'Enter' || event.keyCode === 13) {
      setInputField([...inputField, value])
      setKeyPress('')

      checkSystemCommands(value)
      setTimeout(updateScroll,150)
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = color.background;
    document.body.style.color = color.text;
  }, [color])

  return (
    <div className="app" onClick={() => setInputFocus()}>
      {showHeader && <Header
        ip={ip}
        weather={weather}
        handleButtonClick={handleButtonClick}
        dateTime={dateTime}
        version={version}
      />}

      {inputField.map((command, index) =>
        <div key={command + index} style={{marginTop: '15px'}}>
          <div className="line split">
            <div className="user">[user@inaler.com]<span style={{marginLeft: '5px'}}>#</span></div>
            <div>{command}</div>
          </div>

          {command !== '' && <div className="line split">
            <div className="result">
              <Commands
                command={command}
                handleButtonClick={handleButtonClick}
                ip={ip}
                weather={weather}
                dateTime={dateTime}
                color={color}
                setColor={setColor}
              />
            </div>
          </div>}
        </div>
      )}

      <div className="line split" style={{ paddingBottom: 25, paddingTop: 15 }}>
        <div className="user">[user@inaler.com]<span style={{marginLeft: '5px'}}>#</span></div>
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
