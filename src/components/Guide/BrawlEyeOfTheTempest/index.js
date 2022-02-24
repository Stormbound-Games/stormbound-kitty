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

export default React.memo(function GuideEyeOfTheTempest(props) {
  const { css } = useFela()

  return (
    <>
      <p>
        Welcome to <Link to='/members/oeni'>Oeni</Link>’s{' '}
        <span className='Highlight'>Brawl Gazette</span>, “Eye of the Tempest”
        edition! If you are completely new to the Brawl, be sure to read{' '}
        <Link to='/guides/brawl'>the Brawl guide</Link> before moving on with
        this week’s challenge.
      </p>

      <BrawlGuideDisclaimer>
        This week, all spells cost -2 mana from their initial mana cost, for a
        minimum of 0.
      </BrawlGuideDisclaimer>

      <p>
        This Brawl has a lot of different approaches and is a community favorite
        for this reason. The first approach makes use of spawning free toads and
        buffing them with a 4 mana <CardLink id='N40' /> that has just been
        buffed to provide more strength for the primary target. You can get an
        insane amount of stats on the board this way.
      </p>
      <p>
        However, AoE spells like <CardLink id='N29' /> and <CardLink id='N44' />{' '}
        are also reduced, so a Winter deck featuring <CardLink id='W23' /> and{' '}
        <CardLink id='W19' /> on steroids might still be able to consistently
        clear the board and go the distance by attrition.
      </p>
      <p>
        Swarm is another strong contender, with free frontline satyrs and insane
        AoE board clearing and base damage spell <CardLink id='S15' /> for only
        3 mana, just buffed from bordering to surrounding. Also{' '}
        <CardLink id='S20' /> costs 5, so you can get a taste of how strong it
        originally was before it got nerfed twice.
      </p>
      <p>
        Just for the record, Ironclad has 1-mana <CardLink id='I3' /> available,
        but the rest of their spell lineup is not looking too strong comparably,
        so I would not expect to see much of them.
      </p>

      <Info icon='eye' title='Brawl Decks'>
        <p>
          Check the{' '}
          <Link to='/deck/featured?tags=BRAWL%2CSPELL_MANA'>
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
              CriticalPancake’s Die Die Die
            </h3>

            <p>
              CriticalPancake piloted this to Mythic with 0 losses last time,
              claiming it was too easy.
            </p>
            <p>
              But maybe <CardLink id='S20' /> costing one more mana is enough to
              offset the buff to <CardLink id='S15' /> and make it less viable?
              Maybe the more powerful <CardLink id='N29' /> can topple it?
            </p>
            <p>
              He also mentioned that <CardLink id='N14' /> got swapped out in
              the last games, because they were over too quickly anyways.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1n2s1n3s24s2n67s6n14n15s15s20'
              name='Die Die Die'
              author='CriticalPancake'
              tags={['BRAWL', 'SPELL_MANA']}
              faction='shadowfen'
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              OneC’s Toad Spam
            </h3>
            <p>
              Not too many spells, but toads are just really strong, and{' '}
              <CardLink id='F22' /> with <CardLink id='F17' /> can steal some
              wins. The mana cost reduction makes <CardLink id='F8' /> playable
              even if it’s not too high level.
            </p>

            <p>
              Other variations could include cheaper spells and cheaper runners,
              such as <CardLink id='N67' /> and <CardLink id='F25' />.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn2f2f3n3f8f4f5f10f11f17n40f22'
              name='Toad Spam'
              author='OneC'
              tags={['BRAWL', 'SPELL_MANA']}
              faction='shadowfen'
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              Frostkhan’s Eye of the Tempest
            </h3>
            <p>
              The quintessential Winter attrition deck is also a scary high
              level option, but <CardLink id='W19' /> costs one more mana
              compared to last time, so we will see if it still holds up against
              the aggression of Swarm and the buffed toad spam of Shadowfen
              decks.
            </p>

            <p>
              <CardLink id='W21' /> could be replaced with <CardLink id='W24' />{' '}
              to trade offence for defence and really bank on permanent health
              regeneration.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1n2n23n14w5n18n29n44n48w19w21w23'
              name='Eye of the Tempest'
              author='Frostkhan'
              tags={['BRAWL', 'SPELL_MANA']}
              faction='winter'
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
