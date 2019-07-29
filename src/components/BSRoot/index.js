import React, { Fragment } from 'react'
import State from '../BSState'
import App from '../BSApp'
import PageMeta from '../PageMeta'

const BSRoot = props => (
  <Fragment>
    <h1 className="visually-hidden">Battle Simulator</h1>

    <State simId={props.simId} mode="EDITOR">
      {state => <App mode="EDITOR" simId={props.simId} {...state} />}
    </State>

    <PageMeta
      title="Battle Simulator"
      description="Create your own Stormbound battles."
    />
  </Fragment>
)

export default BSRoot
