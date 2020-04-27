import React from 'react'
import App from '../BattleSimApp'
import PageMeta from '../PageMeta'

export default React.memo(function BattleSimRoot(props) {
  return (
    <>
      <h1 className='VisuallyHidden'>Battle Simulator</h1>

      <App mode='EDITOR' />

      <PageMeta
        title='Battle Simulator'
        description='Create your own Stormbound battles.'
      />
    </>
  )
})
