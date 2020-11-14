import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import Guide from '../Guide'
import Notice from '../Notice'
import Row from '../Row'
import Title from '../Title'
import CardLink from '../CardLink'
import getGuide from '../../helpers/getGuide'

const guide = getGuide('TRIVIA_GUIDE')

export default React.memo(function GuideWinter(props) {
  return (
    <Guide {...guide}>
      <p>
        Stormbound, like many games is full of a little pieces of trivia. Some
        are very well known like which cards refer to whom, and some are a bit
        more eccentric. Find below a list of all known trivia:
      </p>

      <ol style={{ columns: '16em' }}>
        <li>
          <a href='#card-names'>Card names</a>
        </li>
        <li>
          <a href='#animated-ui-elements'>Animated UI elements</a>
        </li>
        <li>
          <a href='#gravity-acceleration'>Gravity acceleration</a>
        </li>
      </ol>

      <Title id='card-names'>Card names</Title>

      <p>
        Paladin Studios, the original studio behind Stormbound before it got
        handed over to Sheepyard, named some cards after some members of the
        teams, and active community members.{' '}
      </p>

      <ul>
        <li>
          <CardLink id='N48' /> was named after Arano, the origin lead designer
          for the game.
        </li>
        <li>
          <CardLink id='N6' /> was named after Aspareforyou, a popular
          Kongregate forum user.
        </li>
        <li>
          <CardLink id='N10' /> was named after Conflicter, a former player
          moderator of the official Discord and guide on the forums and Reddit.
        </li>
        <li>
          <CardLink id='N43' /> was named after Ludo88, a popular Kongregate
          forum user.
        </li>
        <li>
          <CardLink id='N51' /> was named after Dan Su, an early Stormbound
          youtuber.
        </li>
        <li>
          <CardLink id='I7' /> was named after Gale, an early player who helped
          conceptualise a lot of cards.
        </li>
        <li>
          <CardLink id='I13' /> was named after Emkaem, a former Paladin Studios
          employee, Discord moderator and popular streamer.
        </li>
        <li>
          <CardLink id='F9' /> was named after Wander, a former Discord/Reddit
          moderator, and Wiki contributor.
        </li>
        <li>
          <CardLink id='F19' /> was named after Sunny, an early player who
          created a (now offline) Stormbound site.
        </li>
        <li>
          <CardLink id='S4' /> was named after Kepp, a Discord moderator and
          tournament organiser.
        </li>
        <li>
          <CardLink id='S12' /> was named after Omer, a player since the
          beta-test version.
        </li>
        <li>
          <CardLink id='W5' /> was named after Ayanami, a day 1 player and
          Discord moderator.
        </li>
        <li>
          <CardLink id='W15' /> was named after FrozenEarth, a Discord moderator
          and main Wiki author.
        </li>
        <li>
          <CardLink id='N77' /> is the first and only sheep in the game and was
          introduced by Sheepyard when they took over Stormbound development as
          an effigy to the studio.
        </li>
      </ul>

      <p>Some other things you might or might not know about card names:</p>

      <ul>
        <li>
          <CardLink id='N34' /> was <em>not</em> named after the Kongregate
          moderator; the latter named themselves after the card.
        </li>
        <li>
          <CardLink id='N62' /> was <em>not</em> named after Kitty; it was
          planned before the site got popular.
        </li>
      </ul>

      <Title id='animated-ui-elements'>Animated UI elements</Title>

      <p>
        Some interface elements, such as Edrik the Fierce on the home screen, or
        some background islands in the desktop version of the game, can be
        clicked/tapped to show a little animation.
      </p>

      <Title id='gravity-acceleration'>Gravity acceleration</Title>

      <p>
        <Link to='/member/ArthisRoo'>ArthisRoo</Link> and{' '}
        <Link to='/member/Troxyz'>Troxyz</Link> from Discord took some time to
        calculate the acceleration due to gravity in Stormbound (or rather, on
        Stormbound islands).
      </p>

      <Guide.FullWidth>
        <Row desktopOnly wideGutter>
          <Column>
            <p>
              To do so, they used some in-game graphics as a scale, such as the
              hippo we can see in one of the pool. The average length of a hippo
              is about 4.25m. For the vertical scale, they used a human knight
              with an average height of 1.7m. Based on that, they realised that{' '}
              <span className='Highlight'>every tile is 5x5m wide</span>{' '}
              (provided they are squares).
            </p>

            <p>
              Then, they needed to compute the angle of elevation, since the
              board is not seen directly from above, but slightly from the side.
              Based on the distortion of the vertical scale relative to the
              forward scale, they got an{' '}
              <span className='Highlight'>
                angle of perspective of 55.48 degrees
              </span>{' '}
              from the horizontal.
            </p>
          </Column>
          <Column>
            <img
              src='/assets/images/guides/scales.png'
              alt='A human knight and hippo used as measurement scales'
              style={{ marginTop: 0 }}
            />
          </Column>
        </Row>
      </Guide.FullWidth>

      <Row desktopOnly wideGutter>
        <Column>
          <img
            src='/assets/images/guides/toad_fall.gif'
            alt='The fall of a toad at 0.25x speed'
            style={{ marginTop: 0 }}
          />
        </Column>
        <Column>
          <p>
            Then, they needed to figure out how fast toads from{' '}
            <CardLink id='F8' /> fall from a particular height. They could not
            use the animation of the toad falling since it is already falling at
            terminal velocity. Instead, they took the animation of the toad
            bouncing and falling back down. They found the peak height of the
            toad bounce to be 5.577m vertically, and it took 0.115s to fall that
            distance from rest.
          </p>
        </Column>
      </Row>

      <Notice>
        The acceleration due to gravity is 843m/s^2 in the Stormbound universe.
      </Notice>
    </Guide>
  )
})
