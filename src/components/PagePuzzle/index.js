import React from 'react'
import BattleSimApp from '~/components/BattleSimApp'
import BlockNotice from '~/components/BlockNotice'
import BlocksRenderer from '~/components/BlocksRenderer'
import FAQEntry from '~/components/FAQEntry'
import Link from '~/components/Link'
import Only from '~/components/Only'
import Page from '~/components/Page'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import useBattleSim from '~/hooks/useBattleSim'
import { formatDate } from '~/helpers/formatDate'
import parseDate from '~/helpers/parseDate'

export default React.memo(function PagePuzzle(props) {
  const puzzle = props.puzzle
  const state = useBattleSim({ ...props, mode: 'DISPLAY' })
  const date = parseDate(puzzle.date)

  return (
    <Page
      title={puzzle.name}
      author={puzzle.user}
      meta={formatDate(date)}
      action={{ to: '/puzzles', children: 'Back to puzzles' }}
      description={`Figure out how to solve ${puzzle.name} by ${
        puzzle.user.name
      } (made in ${formatDate(date)}).`}
      isEditorialContent
    >
      <BattleSimApp {...state} {...props} />
      <Page.Narrow>
        <BlockNotice>{puzzle.objective}</BlockNotice>
        {puzzle.restrictions.length > 0 && (
          <>
            <p>The following restrictions apply:</p>
            <ul>
              {puzzle.restrictions.map(restriction => (
                <li key={restriction}>{restriction}</li>
              ))}
            </ul>
          </>
        )}

        {puzzle.solution?.length > 0 && (
          <>
            <Title>Solution</Title>
            <details>
              <summary>
                <strong className='Highlight'>Spoilers!</strong>{' '}
                <Only.Desktop>Click</Only.Desktop>
                <Only.Mobile>Tab</Only.Mobile> here to reveal the solution.
              </summary>
              <Spacing top='SMALLER' bottom='NONE'>
                <BlocksRenderer value={puzzle.solution} />
              </Spacing>
            </details>
          </>
        )}

        <Title id='faq'>FAQ</Title>
        <dl>
          <FAQEntry id='how-to-play' question='How to play?'>
            Puzzles are not actually playable, like a real Stormbound game
            would. The puzzle showcases a static snapshot of a game, and it’s up
            to you to figure out which moves would need to be played in order to
            solve the puzzle.
          </FAQEntry>
          <FAQEntry id='impossible' question='Is it really solvable?'>
            This puzzle was designed by{' '}
            <Link to={`/members/${puzzle.user.slug}`}>{puzzle.user.name}</Link>{' '}
            in <span className='Highlight'>{formatDate(date)}</span>.{' '}
            {puzzle.solution?.length > 0 ? (
              <>
                If you believe the aforementioned solution does not work for any
                reason, please reach out to the author or Kitty on Discord.
              </>
            ) : (
              <>
                If you believe it no longer to be possible in the current state
                of the game, please reach out to the author or Kitty on Discord.
              </>
            )}
          </FAQEntry>
          {(!puzzle.solution || puzzle.solution?.length === 0) && (
            <FAQEntry id='solution' question='What’s the solution?'>
              This puzzle was defined before it was possible to record the
              solution alongside it. If you believe you’ve found the solution,
              please reach out on Discord so it can be added to this page for
              other players to validate their hypothesis.
            </FAQEntry>
          )}
        </dl>
      </Page.Narrow>
    </Page>
  )
})
