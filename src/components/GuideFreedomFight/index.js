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

const guide = getGuide('FREEDOM_FIGHT_GUIDE')

export default React.memo(function GuideFreedomFight(props) {
  return (
    <Guide {...guide}>
      <p>
        Welcome to <span className='Highlight'>Oeni’s Brawl Gazette</span>,
        “Freedom Fight” edition! If you are completely new to the Brawl, be sure
        to read <Link to='/guides/brawl'>the Brawl guide</Link> before moving on
        with this week’s challenge.
      </p>

      <hr />
      <p
        style={{ fontSize: '135%', textAlign: 'center', color: 'var(--beige)' }}
      >
        This week, all Toad units cost 2 mana, regardless of their initial mana
        cost.
      </p>
      <hr />

      <p>
        Like all cost-reduction Brawls, this œne is all about timing and combos
        and a bit about hand RNG early on. For example, you want to combine
        playing Azure Hatchers immediately with Obsidian Butchers, before the
        opponent can capitalise on your frogs with their own butchers or
        Sharpfist Exiles. You want to combine your poison cards with Amberhides
        to make use of the drain buff before the opponent can. You always want
        to maintain your frontline to threaten with Salty Outcasts, and prevent
        the opponent from doing the same. That is a lot of plates to juggle and
        requires careful consideration which cards to play, cycle or hold.
      </p>

      <p>
        When it comes to deck building, about half your deck is already spoken
        for by the good toads™ costing 4+ mana, which are too good to pass up.
        Azure Hatchers, Tode the Elevated, Amberhides, Obsidian Butchers, Hairy
        Chestnuts, Salty Outcasts and Sharpfist Exiles.
      </p>
      <p>
        Add to that your choice of 3-cost toads from Limelimbs, Crimson Sentry
        or Heliotroopers, which are still good but more situational. Limelimbs
        is definitely worth it if you’ve got the levels, but be careful with
        Heliotroopers lest the opponent uses Amberhides on it. The 2-drops toads
        Brood Sages and Copperskin Rangers can provide some utility but since
        they already cost 2 do not provide additional value beyond their
        function. That leaves you with about 2-5 flex slots. Let’s look at some
        decks from the channel history what other players filled them with.
      </p>

      <Title>Possible Decks</Title>

      <Guide.FullWidth padding='60px'>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>Frostkhan’s Freedom Fight</h3>
            <p>
              <CardLink id='N1' />, <CardLink id='F8' />, <CardLink id='N9' />.
              Cheap 1-mana filler cards (do not consider Rain of Frogs unless it
              is level 5 and can be used for this purpose) to round out the
              awkward odd-mana turns, and Confinement as a tool against
              Sharpfist Exiles and Hairy Chestnuts.
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15f85n95f55f75f105f125f155f175f285n525n53'
              name='Freedom Fight'
              author='Frostkhan'
              category='BRAWL'
              faction='shadowfen'
              modifier='TOAD_MANA'
            />
          </Column>
        </Row>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>Critical Pancake’s deck</h3>
            <p>
              <CardLink id='N1' />, <CardLink id='F4' />, <CardLink id='N9' />,
              <CardLink id='N14' />. I doubt Toxic Sacrifice is worth running
              after the nerf, but Green Prototypes and Confinement are solid
              cards. Freebooters is an interesting choice in case your games
              drag beyond the 8 mana turn and you can always play your whole
              hand. I’m not sure that is a thing that happens often, but if your
              playstyle is defensive it’s good to be prepared.
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15f45n95f55n145f105f125f155f175f285n525n53'
              name='CP Toads'
              author='CriticalPancake'
              category='BRAWL'
              faction='shadowfen'
              modifier='TOAD_MANA'
            />
          </Column>
        </Row>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>SeveralPeople’s deck</h3>
            <p>
              <CardLink id='N1' />, <CardLink id='N2' />, <CardLink id='F4' />,{' '}
              <CardLink id='N9' /> and <CardLink id='F2' />. We see a pattern
              emerging here, Copperskin Rangers are and interesting choice, but
              I doubt it’s still worth it now that Toxic Sacrifice costs 2 mana
              and is more awkward to combo with.
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15n25f25f45n95f105f125f155f175f285n525n53'
              name='SP Toads'
              author='SeveralPeople'
              category='BRAWL'
              faction='shadowfen'
              modifier='TOAD_MANA'
            />
          </Column>
        </Row>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>Adig’s deck</h3>
            <p>
              <CardLink id='N1' />, <CardLink id='F8' />, <CardLink id='F4' />,{' '}
              <CardLink id='N9' />, <CardLink id='N16' /> and{' '}
              <CardLink id='N18' />. Again we have 3 1-mana cards to round out
              the curve, of which Toxic Sacrifice was nerfed, putting it into a
              very awkward mana-slot for this Brawl. But foregoing the 4-mana
              toads to run Westwind Sailors at 3 mana, an odd-cost without the
              poison drawback, and Beasts of Terror as an incredible (although
              considerably expensive in this Brawl) toad killer are very
              interesting choices.
            </p>
            <p>
              Adig reported lossless to Mythic with this deck, and there are
              some carefully considered tech cards.{' '}
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15f85f45n95f255n165n185f155f175f285n525n53'
              name='Adig Toads'
              author='Adig'
              category='BRAWL'
              faction='shadowfen'
              modifier='TOAD_MANA'
            />
          </Column>
        </Row>
      </Guide.FullWidth>

      <Info icon='crown' title='Brawl Tracker'>
        <p>
          Use the <Link to='/calculators/brawl'>Brawl calculator</Link> to plan
          your journey. To monitor your progress and keep track of your expenses
          during the Brawl, be sure to use{' '}
          <Link to='/brawl/toad-mana'>the Brawl tracker</Link>.
        </p>
      </Info>

      <Notice>
        Make sure to liberate the toads
        <br />
        Whichever tech you wield
        <br />
        Please don’t use satyrs or goats
        <br />I will see you on the battlefield!
      </Notice>
      <Notice>
        If you have any comment or suggestion, get in touch with oeni#7266 on
        Discord.
      </Notice>
    </Guide>
  )
})
