import React from 'react'
import TrackerActions from '../TrackerActions'
import TrackerDeck from '../TrackerDeck'
import TrackerHand from '../TrackerHand'
import TrackerHeader from '../TrackerHeader'
import TrackerHint from '../TrackerHint'
import TrackerInfo from '../TrackerInfo'
import TrackerTitle from '../TrackerTitle'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import './index.css'

export default React.memo(function Tracker(props) {
  return (
    <>
      <h1 className='VisuallyHidden'>Deck Tracker</h1>

      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Title>Your deck</Title>
          <TrackerDeck {...props} />
          <TrackerInfo />
        </Row.Column>

        <Row.Column width='2/3'>
          <div className='Tracker__main'>
            <TrackerTitle status={props.status} />
            <TrackerHeader {...props} />
            <TrackerHand {...props} />
            <TrackerHint
              status={props.status}
              playerOrder={props.playerOrder}
            />
            <TrackerActions {...props} />
          </div>
        </Row.Column>
      </Row>

      <PageMeta
        title='Deck tracker'
        description='Track your deck as you play to maximise your chances of winning.'
      />
    </>
  )
})
