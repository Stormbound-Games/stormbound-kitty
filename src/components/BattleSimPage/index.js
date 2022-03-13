import React from 'react'
import Page from '~/components/Page'
import BattleSimApp from '~/components/BattleSimApp'
import useBattleSim from '~/hooks/useBattleSim'

const usePageProps = ({ id, mode, puzzle }) =>
  puzzle
    ? {
        title: puzzle.name,
        author: puzzle.user.name,
        meta: puzzle.category,
        action: {
          to: '/simulators/battle/puzzles',
          children: 'Back to puzzles',
        },
      }
    : {
        title: 'Battle simulator',
        action: id
          ? {
              to:
                mode === 'EDITOR'
                  ? `/simulators/battle/${id}/display`
                  : `/simulators/battle/${id}`,
              children: mode === 'EDITOR' ? 'Display view' : 'Edit sim',
              icon: mode === 'EDITOR' ? 'eye' : undefined,
            }
          : undefined,
      }

export default React.memo(function BattleSimPage(props) {
  const pageProps = usePageProps(props)
  const state = useBattleSim(props)

  return (
    <Page
      {...pageProps}
      description='Create your own Stormbound battles, reproducing static in-game situations in this simulator'
    >
      <BattleSimApp {...state} {...props} />
    </Page>
  )
})
