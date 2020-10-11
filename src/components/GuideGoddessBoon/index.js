import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import FeaturedDeck from '../FeaturedDeck'
import Guide from '../Guide'
import Notice from '../Notice'
import Row from '../Row'
import Title from '../Title'
import CardLink from '../CardLink'
import guides from '../../data/guides'

const guide = guides.find(guide => guide.id === 'GODDESS_BOON_GUIDE')

export default React.memo(function GuideGoddessBoon(props) {
  return (
    <Guide {...guide}>
      <p>
        Welcome to <Link to='/member/Oeni'>Oeni</Link>’s{' '}
        <span className='Highlight'>Brawl Gazette</span>, “Goddess Boon”
        edition! If you are completely new to the Brawl, be sure to read{' '}
        <Link to='/guides/brawl'>the Brawl guide</Link> before moving on with
        this week’s challenge.
      </p>

      <hr />

      <p
        style={{ fontSize: '135%', textAlign: 'center', color: 'var(--beige)' }}
      >
        This week, all Frostling units benefit from an extra +4 strength on top
        of their initial strength.
      </p>

      <hr />

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

      <Title>Possible Decks</Title>

      <Guide.FullWidth padding='60px'>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>Frostkhan’s Goddess Boon</h3>
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
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15w25n35n95n115w45w95w125n365w105w195n58'
              name='Goddess Boon'
              author='Frostkhan'
              category='BRAWL'
              faction='winter'
            />
          </Column>
        </Row>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>CriticalPancake’s Frost Deck</h3>

            <p>
              This deck looks like a pretty good aggressive option, although I’m
              not sure about the <CardLink id='W9' /> since it’s been nerfed,
              but the curve overall looks very decent. It could be that this
              kind of curve will be crushed by the new <CardLink id='N36' />, we
              will see.
            </p>

            <p>
              <Link to='/member/SeveralPeople'>SeveralPeople</Link> runs a very
              similar deck with <CardLink id='N1' /> and <CardLink id='N67' />{' '}
              instead of <CardLink id='N9' /> and <CardLink id='W10' />, which
              can be interesting to have cheaper options and potentially more
              board control.
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='5w25n35n95n115n145w45w285w95w125w105w195n58'
              name='Frost Deck'
              author='CriticalPancake'
              category='BRAWL'
              faction='winter'
            />
          </Column>
        </Row>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>Adig’s Frosty Feline Dwarf</h3>
            <p>
              A high-end option, capitalizing on runners can catch opponents off
              guard. Even something like <CardLink id='N52' /> in place of{' '}
              <CardLink id='W23' /> could work. It might struggle a little with
              clear hords of Frostlings with Siren of the Seas though, so
              beware.
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15w25n35n95n145w45w95w125n685w175w195w23'
              name='Frosty Feline Dwarf'
              author='Adig'
              category='BRAWL'
              faction='winter'
            />
          </Column>
        </Row>
      </Guide.FullWidth>

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

      <Notice>
        See you on the battlefield! If you have any comment or suggestion, get
        in touch with oeni#7266 on Discord.
      </Notice>
    </Guide>
  )
})
