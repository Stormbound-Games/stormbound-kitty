import React from 'react'
import { Link } from 'react-router-dom'
import Guide from '../Guide'
import Info from '../Info'
import Notice from '../Notice'
import Title from '../Title'
import guides from '../../data/guides'

const guide = guides.find(guide => guide.id === 'NOBLE_COALITION_GUIDE')

export default React.memo(function GuideNobleCoalition(props) {
  return (
    <Guide {...guide}>
      <p>
        Welcome to <span className='Highlight'>Oeni’s Brawl Gazette</span>,
        “Self Control” edition! If you are completely new to the Brawl, be sure
        to read <Link to='/guides/brawl'>the Brawl guide</Link> before moving on
        with this week’s challenge.
      </p>

      <hr />
      <p
        style={{ fontSize: '135%', textAlign: 'center', color: 'var(--beige)' }}
      >
        This week, all Satyr units benefit from an extra +1 movement on top of
        their initial movement.
      </p>

      <hr />

      <p>Coming soon.™</p>

      <Title>Possible Decks</Title>

      {/*
      <Guide.FullWidth padding='60px'>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>
              Critical Pancake’s Cat Butcher
            </h3>
            <p>
              Take advantage of the above-curve power level of the cheap cats,
              apply pressure, frontline, and the usual shadowfen control
              shenanigans and eventually finish either with butchers or the
              sweetcap+HRC combo.
            </p>
            <p>
              Critical Pancake is one of my favourite deckbuilders every week
              and my own brawl decks are usually very close to his. Could switch{' '}
              <WikiLink id='F20' /> for <WikiLink id='N68' />, since more cats
              might now have outgrown the Minister’s reach.
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='5f44f35n34f84n624n673n664n614f105f144f174f20'
              name='Cat Butcher'
              author='Critical Pancake'
              category='BRAWL'
              faction='shadowfen'
              noAuthorLink
            />
          </Column>
        </Row>
        <Row desktopOnly wideGutter>
          <Column>
            <h3 style={{ marginTop: '0.5em' }}>The_Mirc’s Swarm Cat Runners</h3>
            <p>
              Looks like a solid deck
              <Only.DefaultCollection>
                {' '}
                even besides the fact that it is maxed
              </Only.DefaultCollection>
              . Early aggression and eventually finding lethal with lots of
              cheap runners or <WikiLink id='S6' /> should be easy. This is{' '}
              <WikiLink id='N71' />’ time to shine, if you like wasting good
              coins on an otherwise terrible card.
            </p>
            <p>
              The rest of the decks last time were largely just normal D1 or
              ladder decks with <WikiLink id='N67' />, normal Swarm and
              Shadowfen rush decks or the now nerfed <WikiLink id='S21' /> and
              not really worth mentioning. Not to say they are not viable
              (except for Queen, the Queen is dead), I'm just hoping we see more
              interesting cat decks this time around, maybe even utilizing the
              recently buffed <WikiLink id='N60' /> which ought to finally get
              some time in the spotlight.
            </p>
          </Column>
          <Column>
            <FeaturedDeck
              id='5n15s15n35s25n675n665n125s65n715n655n695n68'
              name='Swarm Cat Runners'
              author='the_mirc'
              category='BRAWL'
              faction='swarm'
            />
          </Column>
        </Row>
      </Guide.FullWidth>
      */}

      <Info icon='crown' title='Brawl Tracker'>
        <p>
          To monitor your progress and keep track of your expenses during the
          Brawl, be sure to use{' '}
          <Link to='/brawl/satyr-movement'>the brawl tracker</Link>.
        </p>
      </Info>

      <Notice>
        See you on the battlefield! If you have any comment or suggestion, get
        in touch with Oeni#7266 on Discord.
      </Notice>
    </Guide>
  )
})
