import React from 'react'
import App from '../BattleSimApp'
import PageMeta from '../PageMeta'

const BattleSimRoot = props => (
  <>
    <h1 className='VisuallyHidden'>Battle Simulator</h1>

    <App mode='EDITOR' />

    <PageMeta
      title='Battle Simulator'
      description='Create your own Stormbound battles.'
    />
  </>
)

export default BattleSimRoot
