import React, {useEffect, useRef, useState} from 'react'
import '../App.scss'

const Header = (props: any) => {
  const { version, dateTime, ip, weather, handleButtonClick, currency, covid19 } = props
  const [loader, setLoader] = useState(1)

  const interval = useRef<number>()

  useEffect(() => {
    interval.current = setInterval(() => {
      setLoader(loader + 1)
    },550)
    return () => clearInterval(interval.current);
  });

  return(
  <div className="header">
    <div className="welcome">Sercan's Terminal<span>(v{version})</span></div>
    {loader <= 9 && <div><strong style={{textDecoration: 'underline'}}>Your information:</strong> Loading({loader}/9)</div>}
    {loader > 9 ? <div><strong style={{textDecoration: 'underline'}}>Your information:</strong></div> : ''}
    {loader > 1 && <div><strong>Date:</strong> {dateTime && <span>{dateTime} <strong>Online Since:</strong> {loader}s </span>}</div>}
    {loader > 2 && <div><strong>Platform:</strong> {navigator.platform}, <strong>Resolution:</strong> {window.screen.width}x{window.screen.height}px, <strong>Viewport:</strong> {Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)}x{Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)}px, <strong>Depth:</strong> {window.screen.pixelDepth}px</div>}
    {loader > 3 && <div><strong>User agent: </strong> {navigator.userAgent}</div>}
    {loader > 4 && <div><strong>Ip address:</strong> {ip.ip_address && <span> {ip.ip_address}, <strong>Local languages:</strong> {ip.languages && ip.languages.map((language: string) => <span key={language}> {language}</span>)}, <strong>Currency:</strong> {ip.currency}</span>}</div>}
    {loader > 5 && <div><strong>Location:</strong> {ip.ip_address && <span>{ip.city}({ip.region_code}), {ip.country}, {ip.continent}, <strong>Coordinates:</strong> {ip.latitude}, {ip.longitude}</span>}</div>}
    {loader > 6 && <div><strong>Weather:</strong> {weather.current && <span><strong>Temp:</strong> {weather.current.temp}C, <strong>Feels like:</strong> {weather.current.feels_like}C, <strong>Clouds:</strong> {weather.current.clouds}%, <strong>Humidity:</strong> {weather.current.humidity}%, <strong>Wind:</strong> {weather.current.wind_speed}m/s, <strong>UV:</strong> {weather.current.uvi}</span>}</div>}
    {loader > 7 && <div><strong>Currency{currency.rates && <span>({currency.base})</span>}:</strong>
      {currency.rates && Object.keys(currency.rates).map((rate) => (
        rate !== currency.base && (<span key={rate}> <strong>{rate}:</strong> {(1 / currency.rates[rate]).toFixed(3)} </span>)
      ))}
    </div>}
    {loader > 8 && <div><strong>Covid-19:</strong> {covid19.Global.NewConfirmed && <span><strong>New: </strong>{covid19.Global.NewConfirmed}, <strong>New deaths: </strong>{covid19.Global.NewDeaths}, <strong>Total: </strong>{covid19.Global.TotalConfirmed}, <strong>Total deaths: </strong>{covid19.Global.TotalDeaths}</span>}</div>}
    <div className="line" />
    <div className="line">
      Enter <button onClick={() => handleButtonClick('info')}>info</button> for more information. Use <button onClick={() => handleButtonClick('help')}>help</button> or <button onClick={() => handleButtonClick('commands')}>commands</button> for command list.
    </div>
    <div className="line">
      If you can't use Terminal, switch to Windows by typing <button onClick={() => handleButtonClick('win')}>win</button> now!
    </div>
  </div>
)}

export default Header;
