import React from 'react'
import '../App.css';

const History = (
  <div>
    <div className="flex" style={{marginBottom: '3px'}}>
      <div className="flex-left" style={{marginRight: '26px'}}>Version</div>
      <div style={{fontWeight: 'bold'}}>Development History</div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.8</div>
      <div>
        - Added date & time commands,<br />
        - Improved focus on click event
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.7</div>
      <div>
        - Added history<br />
        - Refactored clear / reload<br />
        - Split large project components
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.6</div>
      <div>
        - Improvements on IP and Weather API<br />
        - Added get ip & get weather<br />
        - Better UI/UX for unix terminal feeling<br />
        - Worked a lot on wording
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.5</div>
      <div>
        - Added IP and location API<br />
        - Added Weather forecast API
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.4</div>
      <div>
        - Added clear & reload<br />
        - Added profile commands (source & email & linkedin & github & cv)
        <br />
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.3</div>
      <div>
        - Added info & help & commands<br />
        - Refactor whole css<br />
        - Improved mobile design
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.2</div>
      <div>
        - Redesigned with Terminal layout<br />
        - Added date & screen & platform information
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">2.0.1</div>
      <div>
        - Initialised the new Project<br />
        - Switched to React (v17) from jQuery
      </div>
    </div>
    <div className="flex">
      <div className="flex-left">Todo's</div>
      <div>
        - Add screen, platform commands<br />
        - Add loaders<br />
        - Add e-mail API<br />
        - Add picture API<br />
        - Add color change<br />
        - Align flex tables<br />
        - Expose commands in history<br />
      </div>
    </div>
  </div>
)

export default History;
