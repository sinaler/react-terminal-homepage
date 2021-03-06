import React, {useEffect, useRef, useState} from 'react'
import {openWeatherMapKey, ipFindKey, emailJSKey} from './config'
import axios from 'axios'
import emailjs from 'emailjs-com'
import Header from './components/Header'
import Commands from './components/Commands'
import './App.scss'

emailjs.init(emailJSKey)

const App = () => {
  const version = '2.3.0'
  const theme = {text: '#FFFFFF', background: '#000000'}

  const [keyPress, setKeyPress] = useState('')
  const [inputField, setInputField] = useState<string[]>([])
  const [showHeader, setShowHeader] = useState(true)

  const useFocus = () => {
    const htmlElRef = useRef<HTMLInputElement>(null)
    const setFocus = () => {
      if (inputField.indexOf('tetris') === -1) {
        const x = window.scrollX, y = window.scrollY;
        htmlElRef.current && htmlElRef.current.focus()
        window.scrollTo(x, y);
      }
    }
    return [ htmlElRef, setFocus ] as const
  }

  const [inputRef, setInputFocus] = useFocus()

  const updateScroll = () => {
    window.scrollTo(0,document.body.scrollHeight)
  }

  interface ipType {
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

  interface weatherType {
    current?: {
      temp: string,
      feels_like: string,
      humidity: string,
      wind_speed: string,
      uvi: string
    }
  }

  const [ip, setIp] = useState<ipType>({})
  const [weather, setWeather] = useState<weatherType>({})
  const [currency, setCurrency] = useState<any>({})
  const [covid19, setCovid19] = useState<any>({})

  // @ts-ignore TODO
  const [color, setColor] = useState(JSON.parse(localStorage.getItem('color')) || theme)
  const [dateTime, setDateTime] = useState('')

  const interval = useRef<number>()

  useEffect(() => {
    setDateTime(new Date().toString().slice(0, -12))

    interval.current = setInterval(() => {
      setDateTime(new Date().toString().slice(0, -12))
    },1000)
    return () => clearInterval(interval.current);
  }, [])

  const getIp = () => {
    axios.get('https://api.ipfind.com/me?auth=' + ipFindKey)
      .then(response => {
        setIp(response.data)
      })
  }

  const getWeather = (latitude: string, longitude: string) => {
    if (latitude && longitude) {
      axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=' + openWeatherMapKey)
        .then(response => {
          setWeather(response.data)
        })
    }
  }

  const getCurrency = (base: string) => {
    axios.get('https://api.exchangeratesapi.io/latest?symbols=TRY,USD,EUR,GBP,JPY,RUB,CNY,INR&base=' + base)
      .then(response => {
        setCurrency(response.data)
      })
  }

  const getCovid19 = () => {
    axios.get('https://api.covid19api.com/summary')
      .then(response => {
        setCovid19(response.data)
      })
  }

  const sendEmail = (ip: ipType) => {
    if (ip.ip_address) {
      emailjs.send('sercan', 'template_abe34ts', {
        ip: JSON.stringify(ip),
        weather: JSON.stringify(weather.current),
        currency: JSON.stringify(currency),
        covid19: JSON.stringify(covid19.Global),
      })
        .then((response) => {
          //console.log('Email Success!', response.status, response.text);
        }, (error) => {
          console.log('Email Failed: ', error);
        });
    }
  }

  useEffect(() => {
    const getAPIs = () => {
      if (!ip.ip_address) {
        getIp()
      }

      if (ip.ip_address) {
        setTimeout(() => {
          sendEmail(ip)
        }, 5000)
      }
    }

    if (window.location.hostname !== 'localhost') {
      getAPIs()
    }

    getCurrency(ip.currency! || 'TRY')
    getWeather(ip.latitude! || '39.6443', ip.longitude! || '27.8116')
  }, [ip])

  const checkSystemCommands = (command: string) => {
    if (command === 'snake' || command === 'tetris') {
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

    if (command === 'send email') {
      sendEmail(ip)
    }

    if (command === 'ip') {
      getIp()
    }

    if (command === 'weather') {
      getWeather(ip.latitude!, ip.longitude!)
    }

    if (command === 'currency') {
      getCurrency('TRY')
    }

    if (command === 'covid19') {
      getCovid19()
    }
  }

  const handleButtonClick = (value: string) => {
    setTimeout(updateScroll,150)
    setInputField([...inputField, value])
    checkSystemCommands(value)
  }

  const onKeyUp = (event: any) => {
    const value = event.target.value.toLowerCase().trim()
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
        currency={currency}
        covid19={covid19}
      />}

      {inputField.map((command, index) =>
        <div key={command + index} style={{marginTop: '15px'}}>
          <div className="line split">
            <div className="user">[user@inaler.com]<span style={{marginLeft: '5px'}}>#</span></div>
            <div className="inputHolder">{command}</div>
          </div>

          {command !== '' && <div className="line split">
            <div className="result">
              <Commands
                command={command}
                handleButtonClick={handleButtonClick}
                ip={ip}
                weather={weather}
                currency={currency}
                dateTime={dateTime}
                color={color}
                setColor={setColor}
                covid19={covid19}
              />
            </div>
          </div>}
        </div>
      )}

      <div className="line split" style={{ paddingBottom: 25, paddingTop: 15 }}>
        <div className="user">[user@inaler.com]<span style={{marginLeft: '5px'}}>#</span></div>
        <div className="inputHolder">
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
