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

export default React.memo(function GuideSelfControl(props) {
  const { css } = useFela()

  return (
    <>
      <p>
        Welcome to the <span className='Highlight'>Brawl Gazette</span>, “Self
        Control” edition! If you are completely new to the Brawl, be sure to
        read <Link to='/guides/brawl'>the Brawl guide</Link> before moving on
        with this week’s challenge.
      </p>

      <BrawlGuideDisclaimer>
        This week, all Satyr units benefit from an extra +1 movement on top of
        their initial movement.
      </BrawlGuideDisclaimer>

      <p>
        The “Self Control” Brawl is a very cheap and fast one. Most games are
        done or settled by turn 10, and it relies quite a lot on the level of
        cheap cards, neutral and Swarm alike.
      </p>
      <p>
        It is important to clear the opponent’s front-line regularly early on
        because it can start steamrolling very quickly. Be especially careful to{' '}
        <CardLink id='S3' /> which can easily be brought back into the hand
        given it has 2 movement.
      </p>

      <Info icon='eye' title='Brawl Decks'>
        <p>
          Check the{' '}
          <Link to='/deck/featured?tags=BRAWL%2CSATYR_MOVEMENT'>
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
              Basic Swarm Rush
            </h3>
            <p>
              Most decks encountered in this Brawl are based on these cards,
              with some variations based on playstyles and card levels.
              Generally speaking, you want a lot of cheap cards, and some cheap
              Satyrs which will be buffed by the Brawl modifier.
            </p>
            <p>
              The last card (or cards if you need more than one) are up to you.
              They depend a lot on what you prefer, and how high your collection
              is. For more details about possible contender, refer to{' '}
              <Link href='#cards'>the next section</Link>.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1n2s1n3s24n4s2n67s3s14s9'
              name='Basic Swarm Rush'
              author='basically everyone'
              tags={['BRAWL']}
              faction='swarm'
              noAuthorLink
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              CriticalPancake’s Satyr’s Demise
            </h3>
            <p>
              CriticalPancake went off-meta with a control Shadowfen deck
              containing a single satyr (<CardLink id='N4' />
              ).
            </p>
            <p>
              The idea is that toads from <CardLink id='F8' /> and{' '}
              <CardLink id='F10' /> will block runners such as{' '}
              <CardLink id='S3' /> and <CardLink id='S2' />. From there, this is
              your typical Shadowfen deck with toad spam and{' '}
              <CardLink id='F17' /> as a finisher.
            </p>
            <p>
              If you main Shadowfen and your cards are maxed out, you might be
              able to pull this off by avoiding Swarm entirely. TheMirc also did
              run Shadowfen in that Brawl.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5n15f45f35n35n44f84n674f55n634f105f144f17'
              name='Satyr’s Demise'
              author='CriticalPancake'
              tags={['BRAWL']}
              faction='shadowfen'
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <Title id='cards'>Cards</Title>

      <p>
        Find below a list of most cards we get to see in this Brawl, and whether
        or not I think they are a good fit.
      </p>

      <ul>
        <li>
          <CardLink id='N1' /> are as good as always. It’s cheap and strong and
          probably a must have.
        </li>
        <li>
          <CardLink id='N2' /> is surprisingly efficient in that Brawl. Not only
          can it stop runners (or Counselor Ahmi from coming back in hand) but
          it also gives some meat for Pan Heralds.
        </li>
        <li>
          <CardLink id='S1' /> is really nice, especially since it can attack
          sideways. Definitely a card to include.
        </li>
        <li>
          <CardLink id='N3' /> are also as good as always, although some
          successful decks did not run them, which is interesting.
        </li>
        <li>
          <CardLink id='S24' /> is a good card because cheap with a lot of
          value. It provides good synergy with Swarmcallers, and to some extent
          Pan Heralds.
        </li>
        <li>
          <CardLink id='N4' /> is amazing in that Brawl and definitely a
          must-have.
        </li>
        <li>
          <CardLink id='N67' /> are always a good call, but might be replaced if
          it’s not high level enough. In a Brawl where 6+ runners are common, a
          3-strength card is not going to cut it.
        </li>
        <li>
          <CardLink id='S2' /> is your line pusher with 3 movement, especially
          at level 4/5 where it can take a bit of damage as well.
        </li>
        <li>
          <CardLink id='S3' /> is king in that Brawl, not so much for the stats
          themselves, but because if you have a path to the opponent’s base, you
          can play 2 or 3 times in a row and this is how most games end.
        </li>
        <li>
          <CardLink id='S6' /> is a bit of an odd ball. Everything goes so fast
          that there is little need for the commanding ability, and Counselor
          Ahmi is almost always a better play at 3 mana. I guess it’s good with
          a control strategy, especially if level 5.
        </li>
        <li>
          <CardLink id='S25' />, if you have it level 4 or 5, is a very decent
          call because it’s a lot of value on the board with one movement, and
          it becomes hard to clear with Lawless Herd and Counselor Ahmi.
        </li>
        <li>
          <CardLink id='S7' /> can be a decent call for control strategies, as
          it can distracts the opponent a little. It goes a bit against rush
          though, so it might be a tough play.
        </li>
        <li>
          <CardLink id='S14' /> is the name of the game. Ideally, open cheap and
          close to your own base, and drop Pan Heralds next turn to ensure board
          control. It really is strong.
        </li>
        <li>
          <CardLink id='S9' /> is really interesting, not only because it’s a
          satyr in a satyr Brawl with satyr synergies, but because it gets 2
          movement, and becomes a decent finisher.
        </li>
        <li>
          <CardLink id='S16' /> might look like it’s interesting with 1 movement
          for extra satyrs, but 5 mana is a lot in such a fast Brawl, and there
          are better plays than that (usually 2 or 3 cards instead).
        </li>
        <li>
          <CardLink id='N18' /> sounds interesting in a Brawl where so many
          satyrs are played but it’s just too expensive. If you have to drop it,
          you’re in trouble, and if you’re in trouble, you can’t really spend 4
          mana on just that.
        </li>
        <li>
          <CardLink id='S28' /> are undeniably strong with their 1 movement, but
          they are very expensive, and it feels like a win-more card at this
          stage. I’m not sure it will help that much.
        </li>
        <li>
          <CardLink id='S21' /> and <CardLink id='S20' /> are just too expensive
          here, and all in all too little too late.
        </li>
        <li>
          <CardLink id='N9' /> might help in some situations, but what kills you
          is rarely not one big unit—especially since there are basically no
          elders. What kills you is usually Counselor Ahmi slamming your base
          for 18 damage at turn 9.
        </li>
        <li>
          <CardLink id='N13' /> is definitely worse than Moonlit Aerie and
          performs incredibly poorly in that Brawl where everything is cheap and
          everything moves.
        </li>
        <li>
          <CardLink id='N63' /> is not necessarily a bad choice, although it
          becomes costly at 3 mana when you could drop one or two more units.
          But on paper it should work because you get a lot of units packed
          together for Pan Heralds.
        </li>
      </ul>

      <Info icon='crown' title='Brawl Tracker'>
        <p>
          Use the <Link to='/calculators/brawl'>Brawl calculator</Link> to plan
          your journey. To monitor your progress and keep track of your expenses
          during the Brawl, be sure to use{' '}
          <Link to='/brawl/satyr-movement'>the Brawl tracker</Link>.
        </p>
      </Info>

      <Notice spacing={{ top: 'LARGEST', bottom: 'NONE' }}>
        See you on the battlefield! If you have any comment or suggestion, get
        in touch with Kitty#7266 on Discord.
      </Notice>
    </>
  )
})
