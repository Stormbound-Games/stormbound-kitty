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

export default React.memo(function GuideFreedomFight(props) {
  const { css } = useFela()

  return (
    <>
      <p>
        Welcome to <span className='Highlight'>Oeni’s Brawl Gazette</span>,
        “Freedom Fight” edition! If you are completely new to the Brawl, be sure
        to read <Link to='/guides/brawl'>the Brawl guide</Link> before moving on
        with this week’s challenge.
      </p>

      <BrawlGuideDisclaimer>
        This week, all Toad units cost 2 mana, regardless of their initial mana
        cost.
      </BrawlGuideDisclaimer>

      <p>
        Like all cost-reduction Brawls, this œne is all about timing and combos
        and a bit about hand RNG early on. For example, you want to combine
        playing Azure Hatchers immediately with Obsidian Butchers, before the
        opponent can capitalize on your frogs with their own butchers or
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

      <Info icon='eye' title='Brawl Decks'>
        <p>
          Check the{' '}
          <Link to='/deck/featured?tags=BRAWL%2CTOAD_MANA'>featured decks</Link>{' '}
          for this brawl. You might find a deck that suits you, or that you can
          base your own creation on.
        </p>
      </Info>

      <Title>Possible Decks</Title>

      <PageEmbed>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              Frostkhan’s Freedom Fight
            </h3>
            <p>
              <CardLink id='N1' />, <CardLink id='F8' />, <CardLink id='N9' />.
              Cheap 1-mana filler cards (do not consider Rain of Frogs unless it
              is level 5 and can be used for this purpose) to round out the
              awkward odd-mana turns, and Confinement as a tool against
              Sharpfist Exiles and Hairy Chestnuts.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1f8n9f5f7f10f12f15f17f28n52n53'
              name='Freedom Fight'
              author='Frostkhan'
              tags={['BRAWL']}
              faction='shadowfen'
              modifier='TOAD_MANA'
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              Critical Pancake’s deck
            </h3>
            <p>
              <CardLink id='N1' />, <CardLink id='F4' />, <CardLink id='N9' />,
              <CardLink id='N14' />. I doubt Toxic Sacrifice is worth running
              after the nerf, but Green Prototypes and Confinement are solid
              cards. Freebooters is an interesting choice in case your games
              drag beyond the 8 mana turn and you can always play your whole
              hand. I’m not sure that is a thing that happens often, but if your
              playclassName icss(s defensive it’s good to be) prepared.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1f4n9f5n14f10f12f15f17f28n52n53'
              name='CP Toads'
              author='CriticalPancake'
              tags={['BRAWL']}
              faction='shadowfen'
              modifier='TOAD_MANA'
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              SeveralPeople’s deck
            </h3>
            <p>
              <CardLink id='N1' />, <CardLink id='N2' />, <CardLink id='F4' />,{' '}
              <CardLink id='N9' /> and <CardLink id='F2' />. We see a pattern
              emerging here, Copperskin Rangers are and interesting choice, but
              I doubt it’s still worth it now that Toxic Sacrifice costs 2 mana
              and is more awkward to combo with.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1n2f2f4n9f10f12f15f17f28n52n53'
              name='SP Toads'
              author='SeveralPeople'
              tags={['BRAWL']}
              faction='shadowfen'
              modifier='TOAD_MANA'
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              Adig’s deck
            </h3>
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
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1f8f4n9f25n16n18f15f17f28n52n53'
              name='Adig Toads'
              author='Adig'
              tags={['BRAWL']}
              faction='shadowfen'
              modifier='TOAD_MANA'
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <Info icon='crown' title='Brawl Tracker'>
        <p>
          Use the <Link to='/calculators/brawl'>Brawl calculator</Link> to plan
          your journey. To monitor your progress and keep track of your expenses
          during the Brawl, be sure to use{' '}
          <Link to='/brawl/toad-mana'>the Brawl tracker</Link>.
        </p>
      </Info>

      <Notice spacing={{ top: 'LARGEST', bottom: 'NONE' }}>
        Make sure to liberate the toads
        <br />
        Whichever tech you wield
        <br />
        Please don’t use satyrs or goats
        <br />I will see you on the battlefield!
      </Notice>
    </>
  )
})
