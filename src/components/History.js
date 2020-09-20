import React from 'react'
import '../App.css';

const History = (
  <div>
    <div className="flex" style={{marginBottom: '3px'}}>
      <div className="flex-left bold">Version</div>
      <div className="flex-right bold">Development History</div>
    </div>
    <div className="flex">
      <div className="flex-left">2.1.0</div>
      <div className="flex-right">
        Added date & time commands,<br />
        Improved focus on click event<br />
        Aligned flex tables<br />
        Add color command to change Terminal<br />
        Improved mobile design
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.7</div>
      <div className="flex-right">
        Added history<br />
        Refactored clear / reload<br />
        Split large project components
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.6</div>
      <div className="flex-right">
        Improvements on IP and Weather API<br />
        Added get ip & get weather<br />
        Better UI/UX for unix terminal feeling<br />
        Worked a lot on wording
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.5</div>
      <div className="flex-right">
        Added IP and location API<br />
        Added Weather forecast API
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.4</div>
      <div className="flex-right">
        Added clear & reload<br />
        Added profile commands (source & email & linkedin & github & cv)
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.3</div>
      <div className="flex-right">
        Added info & help & commands<br />
        Refactor whole css<br />
        Improved mobile design
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.2</div>
      <div className="flex-right">
        Redesigned with Terminal layout<br />
        Added date & screen & platform information
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
        Expose commands in history<br />
        Add Typescript
        Add some games
      </div>
    </div>
  </div>
)

export default History;
