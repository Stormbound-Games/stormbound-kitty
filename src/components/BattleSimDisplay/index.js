import React from 'react'
import App from '../BattleSimApp'
import PageMeta from '../PageMeta'

const BattleSimDisplay = React.memo(function BattleSimDisplay(props) {
  return (
    <>
      <h1 className='VisuallyHidden'>Battle Simulator</h1>

      <App mode='DISPLAY' />

      <PageMeta
        title='Battle Simulator'
        description='Create your own Stormbound battles.'
      />
    </>
  )
})

export default BattleSimDisplay
