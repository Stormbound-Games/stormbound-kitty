import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import FeaturedDeck from '../FeaturedDeck'
import Guide from '../Guide'
import Notice from '../Notice'
import Row from '../Row'
import Title from '../Title'
import CardLink from '../CardLink'
import getGuide from '../../helpers/getGuide'

const guide = getGuide('EYE_OF_THE_TEMPEST_GUIDE')

export default React.memo(function GuideEyeOfTheTempest(props) {
  return (
    <Guide {...guide}>
      <p>
        Welcome to <Link to='/member/Oeni'>Oeni</Link>’s{' '}
        <span className='Highlight'>Brawl Gazette</span>, “Eye of the Tempest”
        edition! If you are completely new to the Brawl, be sure to read{' '}
        <Link to='/guides/brawl'>the Brawl guide</Link> before moving on with
        this week’s challenge.
      </p>

      <hr />

      <p
        style={{ fontSize: '135%', textAlign: 'center', color: 'var(--beige)' }}
      >
        This week, all spells cost -2 mana from their initial mana cost, for a
        minimum of 0.
      </p>

      <hr />

      <p>
        This Brawl has a lot of different approaches and is a community
        favourite for this reason. The first approach makes use of spawning free
        toads and buffing them with a 4 mana <CardLink id='N40' /> that has just
        been buffed to provide more strength for the primary target. You can get
        an insane amount of stats on the board this way.
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
        Just for the record, Ironclad has free <CardLink id='I3' /> available,
        but the rest of their spell lineup is not looking too strong comparably,
        so I would not expect to see much of them.
      </p>

      <Title>Possible Decks</Title>

      <Guide.FullWidth padding='60px'>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>
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
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15n25s15n35s245s25n675s65n145n155s155s20'
              name='Die Die Die'
              author='CriticalPancake'
              category='BRAWL'
              faction='shadowfen'
              brawl='SPELL_MANA'
            />
          </Column>
        </Row>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>OneC’s Toad Spam</h3>
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
          </Column>
          <Column>
            <FeaturedDeck
              id='5n25f45f25f35n35f55f85f105f115f175n405f22'
              name='Toad Spam'
              author='OneC'
              category='BRAWL'
              faction='shadowfen'
              brawl='SPELL_MANA'
            />
          </Column>
        </Row>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>
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
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15n25n235n145w55n185n295n445n485w195w215w23'
              name='Eye of the Tempest'
              author='Frostkhan'
              category='BRAWL'
              faction='winter'
              brawl='SPELL_MANA'
            />
          </Column>
        </Row>
      </Guide.FullWidth>

      <Notice>
        See you on the battlefield! If you have any comment or suggestion, get
        in touch with oeni#7266 on Discord.
      </Notice>
    </Guide>
  )
})
