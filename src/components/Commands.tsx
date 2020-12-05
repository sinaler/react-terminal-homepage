import React, {useState} from 'react'
import '../App.scss'
import History from './History'
import Windows from './Windows'
import { ChromePicker } from 'react-color'
import { Context, SnakeGame } from 'react-game-snake'
// @ts-ignore
import Tetris from 'react-tetris'

const Commands = (props: any) => {
  const [snakeMessage, setSnakeMessage] = useState('')

  interface commandList {
    [key: string]: {
      text: string,
      section?: string,
    }
  }

  const commandList: commandList = {
    info: { text: 'Display information about the Terminal', section: 'System Commands'},
    help: { text: 'Display help about the commands'},
    commands: { text: 'List the full list of commands'},
    date: { text: 'Shows the date & time'},
    clear: { text: 'Clears the screen'},
    reload: { text: 'Reloads the whole Terminal while keeping settings'},
    reset: { text: 'Reset all settings and cookies'},
    history: { text: 'Shows the Terminal version history'},
    win: { text: 'Switch to Windows'},
    source: { text: 'Show the source file of the Terminal', section: 'Profile Commands'},
    email: { text: 'Display email of mine'},
    linkedin: { text: 'Display LinkedIn link address of my profile'},
    github: { text: 'Display Github link address of my profile'},
    cv: { text: 'Display pdf version CV/Resume of mine'},
    theme: { text: 'Change terminal Theme colors', section: 'Fun Commands'},
    snake: { text: 'A simple Snake Game'},
    tetris: { text: 'A classic Tetris Game'},
    ip: { text: 'Fetch and show your IP address', section: 'External API Commands'},
    location: { text: 'Fetch and show detailed Location information'},
    weather: { text: 'Fetch and show current Weather Forecast(Requires IP and Coordinates)'},
    currency: { text: 'Fetch and show Currency rates with your local base'},
    covid19: { text: 'Fetch and show actual Covid-19(Corona Virus) pandemic numbers'}
  }

  switch(props.command) {
    case 'commands':
      return(
        Object.keys(commandList).map((command: string) => <button onClick={() => props.handleButtonClick(command)} key={command} style={{margin: '5px 10px 5px 0'}}>
          {command}
        </button>)
      )
    case 'help':
      return(
        <div style={{marginTop: '-14px'}}>
          {Object.keys(commandList).map((command: string) => <div key={command}>
            {commandList[command].section && <div className="flex">
              <div className="flex-left" />
              <div className="flex-right bold" style={{margin: '6px 0 4px'}}>{commandList[command].section}</div>
            </div> }
            <div className="flex" >
              <div className="flex-left">
                  <button onClick={() => props.handleButtonClick(command)} style={{margin: '0 0 2px 0'}}>{command}</button>
                </div>
              <div className="flex-right">{commandList[command].text}</div>
            </div>
          </div>)}
        </div>
      )
    case 'info':
      return(
        <div>
          Hi :)<br /><br />

          I am a software engineer (frontend with backend experience) mostly focused on building
          cross-platform apps to bootstrap projects and ideas. I have long years of experience on
          various startups and companies. Nowadays I enjoy Javascript and React(Native as well) & Vue
          with modern stack.<br /><br />

          About the Terminal<br /><br />
          Terminal project is made by React(v17) as a personal reference.<br />
          You can use <button onClick={() => props.handleButtonClick('help')}>help</button> command to get the list of available commands and it's up to you to discover the hidden and funny sections of my website.<br />
          There can be limitations to access some data.<br />
          You may need to login or get authorization from me personally to access limit sections.<br /><br />
          Cheers,<br /><br />
          Sercan
        </div>
      )
    case 'history':
      return(<History handleButtonClick={props.handleButtonClick} />)
    case 'date':
      return(props.dateTime)
    case 'source':
      return(
        <div>This section is restricted to authorised users. Github repository: <a href="https://github.com/sinaler/react-terminal-homepage" rel="noopener noreferrer" target="_blank">https://github.com/sinaler/react-terminal-homepage</a></div>
      )
    case 'email':
      return(
        <div><a href="mailto:sercan@gmail.com">sercan@gmail.com</a></div>
      )
    case 'linkedin':
      return(
        <div><a href="https://www.linkedin.com/in/sinaler" rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/sinaler</a></div>
      )
    case 'github':
      return(
        <div><a href="https://github.com/sinaler" rel="noopener noreferrer" target="_blank">https://github.com/sinaler</a></div>
      )
    case 'cv':
      return(
        <div>This section is restricted to authorised users.</div>
      )
    case 'theme':
      return(
        <div className="flex">
          <div style={{ marginRight: '20px' }}>
            <div style={{ marginBottom: '10px' }}>Background Color</div>
            <ChromePicker
              disableAlpha
              color={props.color.background}
              onChangeComplete={color => {
                props.setColor({text: props.color.text, background: color.hex})
                localStorage.setItem('color', JSON.stringify({text: props.color.text, background: color.hex}))
              }}
            />
          </div>
          <div>
            <div style={{ marginBottom: '10px' }}>Text Color</div>
            <ChromePicker
              disableAlpha
              color={props.color.text}
              onChangeComplete={color => {
                props.setColor({background: props.color.background, text: color.hex})
                localStorage.setItem('color', JSON.stringify({text: props.color.text, background: color.hex}))
              }}
            />
          </div>
        </div>
      )
    case 'snake':
      return(
        <div style={{ display: 'block' }}>
          <div>
            <SnakeGame
              colors={{
                field: "#bdc3c7",
                food: "#9b59b6",
                snake: "#3498db",
              }}
              countOfHorizontalFields={30}
              countOfVerticalFields={20}
              fieldSize={15}
              loopTime={120}
              pauseAllowed={true}
              restartAllowed={true}
              onLoose={(context: Context) => setSnakeMessage(`You lost with ${context.game.points} points.`)}
              onPause={(context: Context) => setSnakeMessage("Game paused")}
              onRestart={(context: Context) => setSnakeMessage("Game restarted")}
              onResume={(context: Context) => setSnakeMessage("Game resumed")}
              onWin={(context: Context) => setSnakeMessage(`You won with ${context.game.points} points.`)}
            />
          </div>
          <div>{snakeMessage}</div>
        </div>
      )
    case 'tetris':
      return(
        <div style={{ display: 'block' }}>
          <Tetris>
            {/* @ts-ignore */}
            {({ HeldPiece, Gameboard, PieceQueue, points, linesCleared }) => {
              return (
                <div>
                  <Gameboard />
                  <div style={{marginTop: '10px'}}>Points: {points}, Lines: {linesCleared}</div>
                </div>
              );
            }}
          </Tetris>
        </div>
      )
    case 'location':
    case 'ip':
      return(
        <div style={{width: '100%'}}>
          <div>New IP address and location fetched</div>
          <pre>{JSON.stringify(props.ip, null, 4)}</pre>
        </div>
      )
    case 'weather':
      return(
        <div style={{width: '100%'}}>
          <div>Updated weather forecast fetched</div>
          <pre>{JSON.stringify(props.weather.current, null, 4)}</pre>
        </div>
      )
    case 'currency':
      return(
        <div style={{width: '100%'}}>
          <div>Updated currency rates fetched</div>
          <pre>{JSON.stringify(props.currency, null, 4)}</pre>
        </div>
      )
    case 'covid19':
      return(
        <div style={{width: '100%'}}>
          <div>Updated covid-19 numbers fetched</div>
          <pre>{JSON.stringify(props.covid19.Global, null, 4)}</pre>
        </div>
      )
    case 'win':
      return <Windows />
    case 'wooga':
      window.location.href = '/wooga'
      break
    default:
      return(props.command + ': command not found')
  }
}

export default Commands;
