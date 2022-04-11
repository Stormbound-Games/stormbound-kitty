import React from 'react'
import Page from '~/components/Page'
import BattleSimApp from '~/components/BattleSimApp'
import useBattleSim from '~/hooks/useBattleSim'

export default React.memo(function PageBattleSim(props) {
  const state = useBattleSim(props)

  return (
    <Page
      title='Battle simulator'
      description='Create your own Stormbound battles, reproducing static in-game situations in this simulator'
      action={
        props.id
          ? {
              to:
                props.mode === 'EDITOR'
                  ? `/simulators/battle/${props.id}/display`
                  : `/simulators/battle/${props.id}`,
              children: props.mode === 'EDITOR' ? 'Display view' : 'Edit sim',
              icon: props.mode === 'EDITOR' ? 'eye' : undefined,
            }
          : undefined
      }
    >
      <BattleSimApp {...state} {...props} />
    </Page>
  )
})
