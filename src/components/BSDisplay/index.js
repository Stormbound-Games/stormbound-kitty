import React, { Fragment } from 'react'
import State from '../BSState'
import App from '../BSApp'
import PageMeta from '../PageMeta'

const BSDisplay = props => (
  <Fragment>
    <h1 className="visually-hidden">Battle Simulator</h1>

    <State simId={props.simId} mode="DISPLAY">
      {state => <App mode="DISPLAY" simId={props.simId} {...state} />}
    </State>

    <PageMeta
      title="Battle Simulator"
      description="Create your own Stormbound battles."
    />
  </Fragment>
)

export default BSDisplay
