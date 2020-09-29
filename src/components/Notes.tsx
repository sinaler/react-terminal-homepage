import React from 'react'
import styled from 'styled-components'
import '../App.scss'

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`

const FlexLeft = styled.div`
  width: 100px;
  text-align: right;
  margin-right: 15px;
`

const FlexRight = styled.div`
  flex: 1;
`

const Notes = (props: any) => (
  <div>
    <Flex style={{marginBottom: '3px'}}>
      <FlexLeft className="bold">Date</FlexLeft>
      <FlexRight className="bold">Note</FlexRight>
    </Flex>
    <Flex>
      <FlexLeft>27.09.2020</FlexLeft>
      <FlexRight>
        The days<br /><br />
        I don't take notes for a long while. But this morning I've had an intensive experience which I will never
        want to forget about it's crazy details.<br />
        When the pandemic began, I lost my job immediately and since then I am not working properly, I am mostly focused to my family and especially
        spending more time with my son. And currently we are in our summer house with enjoying the sun and the sea all the time.<br />
        But things start getting interesting in between zero stress life. Even I have a healthy and active life here,
        I've started to have sleeping problems. But this is a general issue from my fathers side, so I am familiar with sleeping problems.<br />
        But things got worse. I was waking up every night 2-3 hours after sleeping and cannot fall a sleep again. Then I was drinking coffee first,
        then coding all night long, and going for long walking, running, swimming or snorkeling in the morning until everyone else wakes up.<br />
        And I am not smoking weed for 2 months now,but I am drinking a lot coffee and alcohol and start smoking cigarettes here again.
        Air is full of oxygen here and food is healthy, tasty and organic. Probably all this new combination was making me dream crazy every night.
        And mostly I was seeing dreams related to old friends I have never seen for years and sometimes my dreams were ending up with sexual content.<br />
        But all the day time I was started get so tired of not enough sleep. And I was getting angry and stressed many times.
        Then slowly I decided to look for job and prepare myself for interviews. First company came up with a recommendation from a friend. I've had my most
        intensive and stressful interview 2 days ago. It was full day talking to more than 20 people, making a code challenge in between without enough sleep
        and even lunch break. It took more than 8 hours. At the end I was so tired during the code challenge and I couldn't focus and failed.<br />
        <br />
        The dream
        <br />
      </FlexRight>
    </Flex>
  </div>
)

export default Notes;
