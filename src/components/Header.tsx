import React, {useEffect, useRef, useState} from 'react'
import '../App.scss'

const Header = (props: any) => {
  const { version, dateTime, ip, weather, handleButtonClick, currency } = props
  const [loader, setLoader] = useState(1)

  const interval = useRef<number>()

  useEffect(() => {
    interval.current = setInterval(() => {
      setLoader(loader + 1)
    },1000)
    return () => clearInterval(interval.current);
  });

  return(
  <div className="header">
    <div className="welcome">Sercan's Terminal<span>(v{version})</span></div>
    {loader <= 8 && <div><strong style={{textDecoration: 'underline'}}>Your Information:</strong> - Loading({loader}/8)</div>}
    {loader > 8 ? <div><strong style={{textDecoration: 'underline'}}>Your Information:</strong></div> : ''}
    {loader > 1 && <div><strong>Date:</strong> {dateTime} <strong>Online Since:</strong> {loader}s </div>}
    {loader > 2 && <div><strong>Platform:</strong> {navigator.platform}, <strong>Resolution:</strong> {window.screen.width}x{window.screen.height}px, <strong>Depth:</strong> {window.screen.pixelDepth}px</div>}
    {loader > 3 && <div><strong>User agent:</strong> {navigator.userAgent}</div>}
    {loader > 4 && <div><strong>Ip address:</strong> {ip.ip_address && <span> {ip.ip_address}, <strong>Local languages:</strong> {ip.languages && ip.languages.map((language: string) => <span key={language}> {language}</span>)}, <strong>Currency:</strong> {ip.currency}</span>}</div>}
    {loader > 5 && <div><strong>Location:</strong> {ip.ip_address && <span>{ip.city}({ip.region_code}), {ip.country}, {ip.continent}, <strong>Coordinates:</strong> {ip.latitude}, {ip.longitude}</span>}</div>}
    {loader > 6 && <div><strong>Weather:</strong> {weather.current && <span><strong>Temp:</strong> {weather.current.temp}C, <strong>Feels like:</strong> {weather.current.feels_like}C, <strong>Clouds:</strong> {weather.current.clouds}%, <strong>Humidity:</strong> {weather.current.humidity}%, <strong>Wind:</strong> {weather.current.wind_speed}m/s, <strong>UV:</strong> {weather.current.uvi}</span>}</div>}
    {loader > 7 && <div><strong>Currency{currency.rates && <span>({currency.base})</span>}:</strong>
      {currency.rates && Object.keys(currency.rates).map((rate) => (
        rate !== currency.base && (<span key={rate}> <strong>{rate}:</strong> {(1 / currency.rates[rate]).toFixed(3)} </span>)
      ))}
    </div>}
    <div className="line" />
    <div className="line">
      Enter <button onClick={() => handleButtonClick('info')}>info</button> for more information. Use <button onClick={() => handleButtonClick('help')}>help</button> or <button onClick={() => handleButtonClick('commands')}>commands</button> for command list.
    </div>
  </div>
)}

export default Header;
