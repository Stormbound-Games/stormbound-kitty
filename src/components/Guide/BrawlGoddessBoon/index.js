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

export default React.memo(function GuideGoddessBoon(props) {
  const { css } = useFela()

  return (
    <>
      <p>
        Welcome to <Link to='/members/oeni'>Oeni</Link>’s{' '}
        <span className='Highlight'>Brawl Gazette</span>, “Goddess Boon”
        edition! If you are completely new to the Brawl, be sure to read{' '}
        <Link to='/guides/brawl'>the Brawl guide</Link> before moving on with
        this week’s challenge.
      </p>

      <BrawlGuideDisclaimer>
        This week, all Frostling units benefit from an extra +4 strength on top
        of their initial strength.
      </BrawlGuideDisclaimer>

      <p>
        The +4 strength buff is significant enough to give all other factions
        trouble, so I honestly can’t recommend playing anything but winter. At
        the same time, this generally means that you have to compensate with
        aggressiveness (or skill) if you have lower levels than your opponent,
        i.e. try a deck with a lower curve and runners as finishers.
      </p>
      <p>
        That said, the recently buffed <CardLink id='N36' /> will likely be
        incredible and is absolutely worth including, so be wary of your
        placement with units below 6 strength. Also be sure to pack{' '}
        <CardLink id='N9' /> and/or <CardLink id='N58' />, because they will
        provide a lot of value against any lumbering snow titans.
      </p>

      <Info icon='eye' title='Brawl Decks'>
        <p>
          Check the{' '}
          <Link to='/deck/featured?tags=BRAWL%2CFROSTLING_STRENGTH'>
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
              Frostkhan’s Goddess Boon
            </h3>
            <p>
              This was the featured deck by Frostkhan and I think it still
              stands the test of time. The only card I’m not sure about is{' '}
              <CardLink id='W9' /> and could be replaced by{' '}
              <CardLink id='W28' /> to have more even-cost cards and tempo.
            </p>
            <p>
              As mentioned before, <CardLink id='N58' /> is important to be able
              to clear series of buffed up Frostlings. Same for{' '}
              <CardLink id='N9' />, especially given <CardLink id='W10' /> is
              going to be packed in most decks.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1w2n3n9n11w4w9w12n36w10w19n58'
              name='Goddess Boon'
              author='Frostkhan'
              tags={['BRAWL']}
              faction='winter'
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              CriticalPancake’s Frost Deck
            </h3>

            <p>
              This deck looks like a pretty good aggressive option, although I’m
              not sure about the <CardLink id='W9' /> since it’s been nerfed,
              but the curve overall looks very decent. It could be that this
              kind of curve will be crushed by the new <CardLink id='N36' />, we
              will see.
            </p>

            <p>
              <Link to='/members/severalpeople'>SeveralPeople</Link> runs a very
              similar deck with <CardLink id='N1' /> and <CardLink id='N67' />{' '}
              instead of <CardLink id='N9' /> and <CardLink id='W10' />, which
              can be interesting to have cheaper options and potentially more
              board control.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xw2n3n9n11n14w4w28w9w12w10w19n58'
              name='Frost Deck'
              author='CriticalPancake'
              tags={['BRAWL']}
              faction='winter'
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly spacing={{ vertical: 'LARGE' }}>
          <Row.Column>
            <h3 className={css({ marginTop: 'var(--s-smaller)' })}>
              Adig’s Frosty Feline Dwarf
            </h3>
            <p>
              A high-end option, capitalizing on runners can catch opponents off
              guard. Even something like <CardLink id='N52' /> in place of{' '}
              <CardLink id='W23' /> could work. It might struggle a little with
              clear hords of Frostlings with Siren of the Seas though, so
              beware.
            </p>
          </Row.Column>
          <Row.Column>
            <FeaturedDeck
              id='5xn1w2n3n9n14w4w9w12n68w17w19w23'
              name='Frosty Feline Dwarf'
              author='Adig'
              tags={['BRAWL']}
              faction='winter'
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <p>So, to summarize: </p>
      <ul>
        <li>
          Deal with small units (<CardLink id='N36' /> and <CardLink id='N11' />
          ).
        </li>
        <li>
          Deal with big units (i.e. <CardLink id='N9' />, <CardLink id='N58' />,
          counter Big <CardLink id='W10' /> with an even bigger one).
        </li>
        <li>Runners to win games.</li>
        <li>Stay frosty.</li>
      </ul>

      <Info icon='crown' title='Brawl Tracker'>
        <p>
          Use the <Link to='/calculators/brawl'>Brawl calculator</Link> to plan
          your journey. To monitor your progress and keep track of your expenses
          during the Brawl, be sure to use{' '}
          <Link to='/brawl/frostling-strength'>the Brawl tracker</Link>.
        </p>
      </Info>

      <Notice spacing={{ top: 'LARGEST', bottom: 'NONE' }}>
        See you on the battlefield! If you have any comment or suggestion, get
        in touch with oeni#7266 on Discord.
      </Notice>
    </>
  )
})
