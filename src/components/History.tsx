// @ts-nocheck
import React from 'react'
import '../App.scss'

const History = props => (
  <div>
    <div className="flex" style={{marginBottom: '3px'}}>
      <div className="flex-left bold">Version</div>
      <div className="flex-right bold">Development History</div>
    </div>
    <div className="flex">
      <div className="flex-left">2.1.1</div>
      <div className="flex-right">
        Added <button onClick={() => props.handleButtonClick('reset')}>reset</button> command<br />
        Added command buttons in history
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.1.0</div>
      <div className="flex-right">
        Added <button onClick={() => props.handleButtonClick('date')}>date</button> command<br />
        Improved focus on click event<br />
        Aligned flex tables<br />
        Added <button onClick={() => props.handleButtonClick('theme')}>theme</button> command to change Terminal<br />
        Improved mobile design
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.7</div>
      <div className="flex-right">
        Added <button onClick={() => props.handleButtonClick('history')}>history</button><br />
        Refactored <button onClick={() => props.handleButtonClick('clear')}>clear</button> & <button onClick={() => props.handleButtonClick('reload')}>reload</button> commands<br />
        Split large project components
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.6</div>
      <div className="flex-right">
        Improvements on IP and Weather API<br />
        Added <button onClick={() => props.handleButtonClick('get ip')}>get ip</button> & <button onClick={() => props.handleButtonClick('get weather')}>get weather</button> commands<br />
        Better UI/UX for unix terminal feeling<br />
        Worked a lot on wording
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.5</div>
      <div className="flex-right">
        Added <button onClick={() => props.handleButtonClick('ip')}>ip</button> & <button onClick={() => props.handleButtonClick('location')}>location</button> API commands<br />
        Added <button onClick={() => props.handleButtonClick('weather')}>weather</button>command for weather forecast API
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.4</div>
      <div className="flex-right">
        Added <button onClick={() => props.handleButtonClick('clear')}>clear</button> & <button onClick={() => props.handleButtonClick('reload')}>reload</button> commands<br />
        Added profile commands
        (<button onClick={() => props.handleButtonClick('source')}>source</button> &{' '}
        <button onClick={() => props.handleButtonClick('email')}>email</button> &{' '}
        <button onClick={() => props.handleButtonClick('linkedin')}>linkedin</button> &{' '}
        <button onClick={() => props.handleButtonClick('github')}>github</button> &{' '}
        <button onClick={() => props.handleButtonClick('cv')}>cv</button>)
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.3</div>
      <div className="flex-right">
        Added <button onClick={() => props.handleButtonClick('info')}>info</button> & <button onClick={() => props.handleButtonClick('help')}>help</button> & <button onClick={() => props.handleButtonClick('commands')}>commands</button> commands<br />
        Refactor whole css<br />
        Improved mobile design
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.2</div>
      <div className="flex-right">
        Redesigned with Terminal layout<br />
        Added date & screen & platform information on the header
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.1</div>
      <div className="flex-right">
        Initialised the new Project<br />
        Switched to React (v17) from jQuery
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">Todo's</div>
      <div className="flex-right">
        Support console commands<br />
        Add loaders<br />
        Add e-mail API<br />
        Add picture API<br />
        Add Typescript<br />
        Add SASS/Styled Components<br />
        Add Axios<br />
        Use Context<br />
        Add GSAP project<br />
        Add some games
      </div>
    </div>
  </div>
)

export default History;
