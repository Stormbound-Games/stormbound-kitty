import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import FeaturedDeck from '~/components/FeaturedDeck'
import BrawlGuideDisclaimer from '~/components/BrawlGuideDisclaimer'
import Info from '~/components/Info'
import Notice from '~/components/Notice'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'

export default React.memo(function GuideLucrativeProject(props) {
  const { css } = useFela()

  return (
    <>
      <p>
        Welcome to <span className='Highlight'>Oeni’s Brawl Gazette</span>,
        “Lucrative Project” edition! If you are completely new to the Brawl, be
        sure to read <Link to='/guides/brawl'>the Brawl guide</Link> before
        moving on with this week’s challenge.
      </p>

      <BrawlGuideDisclaimer>
        This week, all Construct units have 2 movement, regardless of their
        initial movement.
      </BrawlGuideDisclaimer>

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
        <Link to='/members/criticalpancake'>CriticalPancake</Link> for some more
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

      <Info icon='eye' title='Brawl Decks'>
        <p>
          Check the{' '}
          <Link to='/deck/featured?tags=BRAWL%2CCONSTRUCT_MOVEMENT'>
            featured decks
          </Link>{' '}
          for this brawl. You might find a deck that suits you, or that you can
          base your own creation on.
        </p>
      </Info>

      <Title>Possible Decks</Title>

      <PageEmbed>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
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
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1n2i1n3n4i4i5n67i8i6i16i21'
              name='Iron Movement'
              author='CriticalPancake'
              tags={['BRAWL']}
              faction='ironclad'
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              OneC’s Small Ball
            </h3>
            <p>
              <Link to='/members/onec'>OneC</Link> adopts a slower deck with
              Upgrade Point, and building a mid-to-late game strategy. The idea
              is to block the way from the opponents’ runners while playing in
              the mid- and back-field to slowly buff construct so the tide
              cannot be turned.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1i1i2n3n4i4i5i8i10i20i16i21'
              name='Small Ball'
              author='OneC'
              tags={['BRAWL']}
              faction='ironclad'
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <Info icon='crown' title='Brawl Tracker'>
        <p>
          Use the <Link to='/calculators/brawl'>Brawl calculator</Link> to plan
          your journey. To monitor your progress and keep track of your expenses
          during the Brawl, be sure to use{' '}
          <Link to='/brawl/construct-movement'>the Brawl tracker</Link>.
        </p>
      </Info>

      <Notice spacing={{ top: 'LARGEST', bottom: 'NONE' }}>
        See you on the battlefield! If you have any comment or suggestion, get
        in touch with oeni#7266 on Discord.
      </Notice>
    </>
  )
})
