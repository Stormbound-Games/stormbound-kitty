import React from 'react'
import Page from '~/components/Page'
import BattleSimApp from '~/components/BattleSimApp'
import useBattleSim from '~/hooks/useBattleSim'
import useRouteId from '~/hooks/useRouteId'

export default React.memo(function PageBattleSim(props) {
  const state = useBattleSim(props)
  const id = useRouteId()

  return (
    <Page
      title='Battle simulator'
      description='Create your own Stormbound battles, reproducing static in-game situations in this simulator'
      action={
        id
          ? {
              to:
                props.mode === 'EDITOR'
                  ? `/simulators/battle/${id}/display`
                  : `/simulators/battle/${id}`,
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
