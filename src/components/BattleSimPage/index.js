import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Article from '../Article'
import BattleSimApp from '../BattleSimApp'
import puzzles from '../../data/puzzles'
import indexArray from '../../helpers/indexArray'

const PUZZLES_INDEX = indexArray(puzzles, 'board')

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
  const puzzle = PUZZLES_INDEX[simId]
  const articleProps = useArticleProps(simId, props.mode, puzzle)

  return (
    <Article
      {...articleProps}
      description='Create your own Stormbound battles, reproducing static in-game situations in this simulator'
    >
      <BattleSimApp {...props} simId={simId} puzzle={puzzle} />
    </Article>
  )
})

export default BattleSimPage
