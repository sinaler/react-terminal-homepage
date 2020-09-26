import React from 'react'
import '../App.scss'

const Header = (props: any) => {
  const { version, dateTime, ip, weather, handleButtonClick, currency } = props

  return(
  <div className="header">
    <div className="welcome">Sercan's Terminal<span>(v{version})</span></div>
    <div className="line"><strong>Date:</strong> {dateTime}</div>
    <div className="line"><strong>Platform:</strong> {navigator.platform}, <strong>User agent:</strong> {navigator.userAgent}</div>
    <div className="line"><strong>Screen Resolution:</strong> {window.screen.width}x{window.screen.height}px, <strong>Depth:</strong> {window.screen.pixelDepth}px</div>
    <div className="line"><strong>Ip address:</strong> {ip.ip_address && <span> {ip.ip_address}, <strong>Local languages:</strong> {ip.languages && ip.languages.map((language: string) => <span key={language}> {language}</span>)}, <strong>Currency:</strong> {ip.currency}</span>}</div>
    <div className="line"><strong>Location:</strong> {ip.ip_address && <span>{ip.city}({ip.region_code}), {ip.country}, {ip.continent}, <strong>Coordinates:</strong> {ip.latitude}, {ip.longitude}</span>}</div>
    <div className="line"><strong>Weather:</strong> {weather.current && <span>Temp: {weather.current.temp}C, Feels like: {weather.current.feels_like}C, Humidity: {weather.current.humidity}%, Wind: {weather.current.wind_speed}m/s, UV: {weather.current.uvi}</span>}</div>
    <div className="line"><strong>Currency{currency.rates && <span>({currency.base})</span>}:</strong>
      {currency.rates && Object.keys(currency.rates).map((rate) => (
        rate !== currency.base && (<span key={rate}> <strong>{rate}:</strong> {(1 / currency.rates[rate]).toFixed(3)} </span>)
      ))}
    </div>
    <div className="line" />
    <div className="line">
      Enter <button onClick={() => handleButtonClick('info')}>info</button> for more information. Use <button onClick={() => handleButtonClick('help')}>help</button> or <button onClick={() => handleButtonClick('commands')}>commands</button> for command list.
    </div>
  </div>
)}

export default Header;
