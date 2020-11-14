import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import FeaturedDeck from '../FeaturedDeck'
import Guide from '../Guide'
import Info from '../Info'
import Notice from '../Notice'
import Row from '../Row'
import Title from '../Title'
import CardLink from '../CardLink'
import getGuide from '../../helpers/getGuide'

const guide = getGuide('LUCRATIVE_PROJECT_GUIDE')

export default React.memo(function GuideLucrativeProject(props) {
  return (
    <Guide {...guide}>
      <p>
        Welcome to <span className='Highlight'>Oeni’s Brawl Gazette</span>,
        “Lucrative Project” edition! If you are completely new to the Brawl, be
        sure to read <Link to='/guides/brawl'>the Brawl guide</Link> before
        moving on with this week’s challenge.
      </p>

      <hr />
      <p
        style={{ fontSize: '135%', textAlign: 'center', color: 'var(--beige)' }}
      >
        This week, all Construct units have 2 movement, regardless of their
        initial movement.
      </p>
      <hr />

      <p>
        I don’t think there’s a lot of nuance to deckbuilding this week, so I’ll
        make it quick. Play communist robots, maintain frontline, block your
        opponent’s frontline, and try to soften them up before finishing them
        off with something like <CardLink id='I21' />.
      </p>

      <p>
        Since last time, <CardLink id='I27' /> was buffed, and might make a good
        replacement for <CardLink id='I6' /> to get an even stickier frontline,
        since it is difficult to clear without equal level <CardLink id='I8' />{' '}
        or <CardLink id='I16' />.
      </p>

      <p>
        I’m paraphrasing{' '}
        <Link to='/member/CriticalPancake'>CriticalPancake</Link> for some more
        insightful strategy tips:
      </p>

      <blockquote>
        <p>
          Clog the board with units since a lot of players play their high cost
          units too early (beware of <CardLink id='I20' />
          ). Playing more cards allows you to put more pressure on the opponent
          early, putting them on the defensive. Even if that means ignoring the
          first unit the opponent sends towards you. If you’re defending, you’re
          losing. If you force them to go 1:1 with your units, card for card,
          but your cards are cheaper, you get ahead.
        </p>
        <p>
          Plink their base when you have the opportunity while still maintaining
          frontline. The biggest choice is when to defend and when to apply
          pressure.
        </p>
      </blockquote>

      <Title>Possible Decks</Title>

      <Guide.FullWidth padding='60px'>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>
              CriticalPancake’s Iron Movement
            </h3>
            <p>
              This deck does not bother including <CardLink id='I20' /> because
              good opponents will play around them anyway, so it feels like an
              expensive slot for little value.
            </p>
            <p>
              The idea is to clog the board with a lot of small and cheap units
              to prevent strong runners from passing through. Eventually, when
              the opponent cannot clear every turn, you get enough front-line to
              pass the big boys.
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15n25i15n35n45i45i55n675i85i65i165i21'
              name='Iron Movement'
              author='CriticalPancake'
              category='BRAWL'
              faction='ironclad'
            />
          </Column>
        </Row>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>OneC’s Small Ball</h3>
            <p>
              <Link to='/member/OneC'>OneC</Link> adopts a slower deck with
              Upgrade Point, and building a mid-to-late game strategy. The idea
              is to block the way from the opponents’ runners while playing in
              the mid- and back-field to slowly buff construct so the tide
              cannot be turned.
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15i15i25n35n45i45i55i85i105i205i165i21'
              name='Small Ball'
              author='OneC'
              category='BRAWL'
              faction='ironclad'
            />
          </Column>
        </Row>
      </Guide.FullWidth>

      <Info icon='crown' title='Brawl Tracker'>
        <p>
          Use the <Link to='/calculators/brawl'>Brawl calculator</Link> to plan
          your journey. To monitor your progress and keep track of your expenses
          during the Brawl, be sure to use{' '}
          <Link to='/brawl/construct-movement'>the Brawl tracker</Link>.
        </p>
      </Info>

      <Notice>
        See you on the battlefield! If you have any comment or suggestion, get
        in touch with oeni#7266 on Discord.
      </Notice>
    </Guide>
  )
})
