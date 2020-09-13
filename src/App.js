import React, {useEffect, useRef, useState} from 'react'
import {openWeatherMapKey, ipFindKey} from './config'
import './App.css';

function App() {
  const messagesEndRef = useRef(null)

  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ]
  }

  const [keyPress, setKeyPress] = useState('')
  const [inputField, setInputField] = useState([])
  const [inputRef, setInputFocus] = useFocus()
  const [showHeader, setShowHeader] = useState(true)
  const [ip, setIp] = useState({})
  const [weather, setWeather] = useState({})

  const getWeather = (latitude, longitude) => {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=' + openWeatherMapKey).then(response => {
      return response.json()
    }).then(data => {
      setWeather(data)
    })
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
    const commandList = {
      info: { text: 'Display information about the project', section: 'System Commands'},
      help: { text: 'Display help about the commands'},
      commands: { text: 'List the full list of commands'},
      clear: { text: 'Clears the screen'},
      reload: { text: 'Reloads the whole project'},
      source: { text: 'Show the source file of the project', section: 'Profile Commands'},
      email: { text: 'Display email of mine'},
      linkedin: { text: 'Display LinkedIn link address of my profile'},
      github: { text: 'Display Github link address of my profile'},
      cv: { text: 'Display pdf version CV/Resume of mine'},
      ip: { text: 'Show detailed IP information of you', section: 'External API Commands'},
      weather: { text: 'Show detailed Weather information of you based on your IP'},
    }

    switch(data) {
      case 'commands':
        return(
          Object.keys(commandList).map((command) => <button onClick={() => setInputField([...inputField, command])} key={command} style={{margin: '5px 10px 5px 0'}}>
            {command}
          </button>)
        )
      case 'help':
        return(
          <div style={{marginTop: '-14px'}}>
            {Object.keys(commandList).map((command) => <div key={command} style={{width: '100%'}}>
              {commandList[command].section && <div style={{fontWeight: 'bold', paddingLeft: '85px', marginTop: '10px'}}>{commandList[command].section}</div> }
              <span style={{width: '75px', display: 'inline-block', textAlign: 'right', marginRight: '10px'}}>
                <button onClick={() => setInputField([...inputField, command])} style={{margin: '2px 0 3px 0'}}>{command}</button>
              </span>
              <span>{commandList[command].text}</span>
            </div>)}
          </div>
        )
      case 'info':
        return(
          <div>
            A Short Information<br /><br />
            This project is made by React(v17) as a personal reference.<br />
            You can use <button onClick={() => setInputField([...inputField, 'help'])}>help</button> command to get the list of available commands and it's up to you to discover the hidden and funny sections of my website.<br />
            There can be limitations to access some data.<br />
            You may need authorization from me personally to access limit sections.<br /><br />
            Cheers,<br />
            Sercan
          </div>
        )
      case 'clear':
        setInputField([])
        setShowHeader(false)
        break
      case 'reload':
        setInputField([])
        setShowHeader(true)
        break
      case 'source':
        return(
          <div>Github repository: <a href="https://github.com/sinaler/react-terminal-homepage" rel="noopener noreferrer" target="_blank">React Terminal Homepage</a></div>
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
      case 'ip':
        return(
          <div>
            {Object.keys(ip).map((key) => <div key={key} style={{width: '100%'}}>
              <span style={{width: '115px', display: 'inline-block', textAlign: 'right', marginRight: '10px'}}>
                {key.replace('_',' ').replace(/\b\w/g, c => c.toUpperCase())}:
              </span>
              <span>{ip[key]}</span>
            </div>)}
          </div>
        )
      case 'weather':
        return(
          <div>
            {Object.keys(weather.current).map((key) => (
              key !== 'weather' && (<div key={key} style={{width: '100%'}}>
              <span style={{width: '115px', display: 'inline-block', textAlign: 'right', marginRight: '10px'}}>
                {key.replace('_',' ').replace(/\b\w/g, c => c.toUpperCase())}:
              </span>
              <span>{weather.current[key]}</span>
            </div>)
            ))}
          </div>
        )
      default:
        return(data + ': command not found')
    }
  }

  const updateScroll = () => {
    window.scrollTo(0,document.body.scrollHeight)
  }

  setInterval(updateScroll,400)

  return (
    <div className="app" onClick={setInputFocus}>
      {showHeader && <div className="header">
        <div className="welcome">Welcome to Sercan's Homepage <span className="small">(v2.1.6)</span></div>
        <div className="line"><strong>Date:</strong> {new Date().toString()}</div>
        <div className="line"><strong>Screen Resolution:</strong> {window.screen.width}x{window.screen.height}px, <strong>Depth:</strong> {window.screen.pixelDepth}px</div>
        <div className="line"><strong>Platform:</strong> {navigator.platform}, <strong>User agent:</strong> {navigator.userAgent}</div>
        <div className="line"><strong>Ip address:</strong> {ip.ip_address && <span> {ip.ip_address}, <strong>Local languages:</strong> {ip.languages && ip.languages.map((language, index) => <span key={language}> {language}</span>)}, Currency: {ip.currency}</span>}</div>
        <div className="line"><strong>Location:</strong> {ip.ip_address && <span>{ip.city}({ip.region_code}), {ip.country}, {ip.continent}, <strong>Coordinates:</strong> {ip.latitude}, {ip.longitude}</span>}</div>
        <div className="line"><strong>Weather:</strong> {weather.current && <span>Temp: {weather.current.temp}C, Feels like: {weather.current.feels_like}C, Humidity: {weather.current.humidity}%, Wind: {weather.current.wind_speed}m/s, UV: {weather.current.uvi}</span>}</div>
        <div className="line" />
        <div className="line">Enter <button onClick={() => setInputField([...inputField, 'info'])}>info</button> for more information or <button onClick={() => setInputField([...inputField, 'help'])}>help</button>/<button onClick={() => setInputField([...inputField, 'commands'])}>commands</button> for command list.</div>
      </div>}
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
