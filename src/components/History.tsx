import React from 'react'
import styled from 'styled-components'
import '../App.scss'

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`

const FlexLeft = styled.div`
  width: 72px;
  text-align: right;
  margin-right: 15px;
`

const FlexRight = styled.div`
  flex: 1;
`

const History = (props: any) => (
  <div>
    <Flex style={{marginBottom: '3px'}}>
      <FlexLeft className="bold">Version</FlexLeft>
      <FlexRight className="bold">Development History</FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.0.1</FlexLeft>
      <FlexRight>
        Initialised the new Project<br />
        Switched to React (v17) from jQuery
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.0.2</FlexLeft>
      <FlexRight>
        Redesigned with Terminal layout<br />
        Added date & screen & platform information on the header
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.0.3</FlexLeft>
      <FlexRight>
        Added <button onClick={() => props.handleButtonClick('info')}>info</button> & <button onClick={() => props.handleButtonClick('help')}>help</button> & <button onClick={() => props.handleButtonClick('commands')}>commands</button> commands<br />
        Refactor whole css<br />
        Improved mobile design
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.0.4</FlexLeft>
      <FlexRight>
        Added <button onClick={() => props.handleButtonClick('clear')}>clear</button> & <button onClick={() => props.handleButtonClick('reload')}>reload</button> commands<br />
        Added profile commands
        (<button onClick={() => props.handleButtonClick('source')}>source</button> &{' '}
        <button onClick={() => props.handleButtonClick('email')}>email</button> &{' '}
        <button onClick={() => props.handleButtonClick('linkedin')}>linkedin</button> &{' '}
        <button onClick={() => props.handleButtonClick('github')}>github</button> &{' '}
        <button onClick={() => props.handleButtonClick('cv')}>cv</button>)
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.0.5</FlexLeft>
      <FlexRight>
        Added <button onClick={() => props.handleButtonClick('ip')}>ip</button> & <button onClick={() => props.handleButtonClick('location')}>location</button> API commands<br />
        Added <button onClick={() => props.handleButtonClick('weather')}>weather</button> command for weather forecast API
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.0.6</FlexLeft>
      <FlexRight>
        Improvements on IP and Weather API<br />
        Improved <button onClick={() => props.handleButtonClick('ip')}>ip</button> & <button onClick={() => props.handleButtonClick('weather')}>weather</button> commands<br />
        Better UI/UX for unix terminal feeling<br />
        Worked a lot on wording
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.0.7</FlexLeft>
      <FlexRight>
        Added <button onClick={() => props.handleButtonClick('history')}>history</button><br />
        Refactored <button onClick={() => props.handleButtonClick('clear')}>clear</button> & <button onClick={() => props.handleButtonClick('reload')}>reload</button> commands<br />
        Split large project components
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.1.0</FlexLeft>
      <FlexRight>
        Added <button onClick={() => props.handleButtonClick('date')}>date</button> command<br />
        Improved focus on click event<br />
        Aligned flex tables<br />
        Added <button onClick={() => props.handleButtonClick('theme')}>theme</button> command to change Terminal<br />
        Improved mobile design
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.1.1</FlexLeft>
      <FlexRight>
        Added <button onClick={() => props.handleButtonClick('reset')}>reset</button> command<br />
        Added command buttons in history
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.2.1</FlexLeft>
      <FlexRight>
        Switched to Typescript<br />
        Added SASS for styling<br />
        Added Styled Components for testing<br />
        Switched to Axios
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.2.2</FlexLeft>
      <FlexRight>
        Added <button onClick={() => props.handleButtonClick('currency')}>currency</button> API and command<br />
        Simplified API commands<br />
        Added <button onClick={() => props.handleButtonClick('snake')}>snake</button> game<br />
        Added email API which allows Terminal to send transactional emails
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>2.2.3</FlexLeft>
      <FlexRight>
        Added <button onClick={() => props.handleButtonClick('tetris')}>tetris</button> game<br />
        Improved mobile design<br />
        Changed <button onClick={() => props.handleButtonClick('currency')}>currency</button> API<br />
        Added <button onClick={() => props.handleButtonClick('covid19')}>covid19</button> API<br />
        Added header loaders<br />
        Cleaned-up TypeScript errors<br/>
      </FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>Todo's</FlexLeft>
      <FlexRight>
        Fix currency date & base<br />
        Add local covid data<br />
        Add windows<br />
        Support console commands<br />
        Add picture API<br />
        Use Context<br />
        Add GSAP project<br />
        Add some more games<br/>
        Add Radio API<br/>
        Add login and auth commands<br/>
        Export all data from API's<br/>
      </FlexRight>
    </Flex>
  </div>
)

export default History;
