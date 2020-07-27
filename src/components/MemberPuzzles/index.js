import React from 'react'
import MemberSection from '../MemberSection'
import Puzzle from '../BattleSimPuzzle'
import Row from '../Row'
import Column from '../Column'
import chunk from '../../helpers/chunk'

export default React.memo(function MemberPuzzles(props) {
  if (props.puzzles.length === 0) return null

  return (
    <MemberSection>
      {chunk(props.puzzles, 2).map((row, index) => (
        <Row key={index} desktopOnly wideGutter>
          {Array.from({ length: 2 }, (_, index) => (
            <Column key={index}>
              {row[index] && <Puzzle {...row[index]} />}
            </Column>
          ))}
        </Row>
      ))}
    </MemberSection>
  )
})
