import React from 'react'
import Page from '~/components/Page'
import BattleSimApp from '~/components/BattleSimApp'

const useArticleProps = ({ simId, mode, puzzle }) =>
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
        action: simId
          ? {
              to:
                mode === 'EDITOR'
                  ? `/simulators/battle/${simId}/display`
                  : `/simulators/battle/${simId}`,
              children: mode === 'EDITOR' ? 'Display view' : 'Edit sim',
              icon: mode === 'EDITOR' ? 'eye' : undefined,
            }
          : undefined,
      }

export default React.memo(function BattleSimPage(props) {
  const articleProps = useArticleProps(props)

  return (
    <Page
      {...articleProps}
      description='Create your own Stormbound battles, reproducing static in-game situations in this simulator'
    >
      <BattleSimApp {...props} />
    </Page>
  )
})
