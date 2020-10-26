import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Article from '../Article'
import BattleSimApp from '../BattleSimApp'
import PageMeta from '../PageMeta'
import puzzles from '../../data/puzzles'

const useArticleProps = (id, mode, puzzle) =>
  puzzle
    ? {
        title: puzzle.name,
        author: puzzle.author,
        meta: puzzle.type,
        action: { to: '/sim/puzzles', children: 'Back to puzzles' },
      }
    : {
        title: 'Battle simulator',
        action: id
          ? {
              to: mode === 'EDITOR' ? `/sim/${id}/display` : `/sim/${id}`,
              children: mode === 'EDITOR' ? 'Display view' : 'Edit sim',
              icon: mode === 'EDITOR' ? 'eye' : undefined,
            }
          : undefined,
      }

const BattleSimPage = React.memo(function BattleSimPage(props) {
  const { params } = useRouteMatch()
  const simId = props.simId || params.simId
  const puzzle = puzzles.find(puzzle => puzzle.board === simId)
  const articleProps = useArticleProps(simId, props.mode, puzzle)

  return (
    <Article {...articleProps} smallFontSize>
      <BattleSimApp {...props} simId={simId} puzzle={puzzle} />
      <PageMeta
        title={articleProps.title}
        description='Create your own Stormbound battles, reproducing static in-game situations in this simulator'
      />
    </Article>
  )
})

export default BattleSimPage
