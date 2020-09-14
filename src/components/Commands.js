import React from 'react'
import '../App.css';
import History from "./History"

const Commands = props => {
  const commandList = {
    info: { text: 'Display information about the project', section: 'System Commands'},
    help: { text: 'Display help about the commands'},
    commands: { text: 'List the full list of commands'},
    clear: { text: 'Clears the screen'},
    reload: { text: 'Reloads the whole project'},
    history: { text: 'Shows the version history'},
    source: { text: 'Show the source file of the project', section: 'Profile Commands'},
    email: { text: 'Display email of mine'},
    linkedin: { text: 'Display LinkedIn link address of my profile'},
    github: { text: 'Display Github link address of my profile'},
    cv: { text: 'Display pdf version CV/Resume of mine'},
    ip: { text: 'Show your IP address', section: 'External API Commands'},
    location: { text: 'Show detailed Location information'},
    weather: { text: 'Show current Weather Forecast based on your IP'},
    'get ip': { text: 'Fetches new IP address', hidden: true},
    'get weather': { text: 'Fetches updated Weather forecast', hidden: true},
  }

  switch(props.command) {
    case 'commands':
      return(
        Object.keys(commandList).map((command) => <button onClick={() => props.setInputField([...props.inputField, command])} key={command} style={{margin: '5px 10px 5px 0'}}>
          {command}
        </button>)
      )
    case 'help':
      return(
        <div style={{marginTop: '-14px'}}>
          {Object.keys(commandList).map((command) => <div key={command} style={{width: '100%'}}>
            {commandList[command].section && <div style={{fontWeight: 'bold', paddingLeft: '110px', marginTop: '10px'}}>{commandList[command].section}</div> }
            <span style={{width: '100px', display: 'inline-block', textAlign: 'right', marginRight: '10px'}}>
                <button onClick={() => props.setInputField([...props.inputField, command])} style={{margin: '2px 0 2px 0'}}>{command}</button>
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
          You can use <button onClick={() => props.setInputField([...props.inputField, 'help'])}>help</button> command to get the list of available commands and it's up to you to discover the hidden and funny sections of my website.<br />
          There can be limitations to access some data.<br />
          You may need authorization from me personally to access limit sections.<br /><br />
          Cheers,<br />
          Sercan
        </div>
      )
    case 'history':
      return(History)
    case 'source':
      return(
        <div>Github repository: <a href="https://github.com/sinaler/react-terminal-homepage" rel="noopener noreferrer" target="_blank">https://github.com/sinaler/react-terminal-homepage</a></div>
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
        <div style={{width: '100%'}}>
          <span>{props.ip.ip_address}</span>
        </div>
      )
    case 'location':
      return(
        <div>
          {Object.keys(props.ip).map((key) => <div key={key} style={{width: '100%'}}>
              <span style={{width: '115px', display: 'inline-block', textAlign: 'right', marginRight: '10px'}}>
                {key.replace('_',' ').replace(/\b\w/g, c => c.toUpperCase())}:
              </span>
            <span>{props.ip[key]}</span>
          </div>)}
        </div>
      )
    case 'weather':
      return(
        <div>
          {props.weather && props.weather.current && Object.keys(props.weather.current).map((key) => (
            key !== 'weather' && (<div key={key} style={{width: '100%'}}>
              <span style={{width: '115px', display: 'inline-block', textAlign: 'right', marginRight: '10px'}}>
                {key.replace('_',' ').replace(/\b\w/g, c => c.toUpperCase())}:
              </span>
              <span>{props.weather.current[key]}</span>
            </div>)
          ))}
        </div>
      )
    case 'get ip':
      return(
        <div style={{width: '100%'}}>
          <span>New IP address and location fetched</span>
        </div>
      )
    case 'get weather':
      return(
        <div style={{width: '100%'}}>
          <span>Updated weather forecast fetched</span>
        </div>
      )
    default:
      return(props.command + ': command not found')
  }
}

export default Commands;
