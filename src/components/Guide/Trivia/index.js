import React from 'react'
import Link from '~/components/Link'
import Image from '~/components/Image'
import Notice from '~/components/Notice'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'

export default React.memo(function GuideTrivia(props) {
  return (
    <>
      <p>
        Stormbound, like many games is full of a little pieces of trivia. Some
        are very well known like which cards refer to whom, and some are a bit
        more eccentric. Find below a list of all known trivia:
      </p>

      <TableOfContents>
        <li>
          <Link href='#card-names'>Card names</Link>
        </li>
        <li>
          <Link href='#loading-texts'>Loading texts</Link>
        </li>
        <li>
          <Link href='#animated-ui-elements'>Animated UI elements</Link>
        </li>
        <li>
          <Link href='#quests'>Quests</Link>
        </li>
        <li>
          <Link href='#gravity-acceleration'>Gravitational acceleration</Link>
        </li>
      </TableOfContents>

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
          conceptualize a lot of cards.
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
          tournament organizer.
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
          <CardLink id='N86' /> was named after Kitty, yours truly.
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

      <Title id='loading-texts'>Loading texts</Title>

      <p>
        Some cards from the game—most of which are legendary—have some trivia
        texts that are displayed during loading time when queuing for a game.
      </p>

      <ul>
        <li>
          <CardLink id='N8' />: As a child, he started his collection with toys
          and rocks. Now, he is gathering wealth and warriors.
        </li>
        <li>
          <CardLink id='N35' />: Never look a predator directly in its eyes.
          Luckily, these are not his eyes.
        </li>
        <li>
          <CardLink id='N46' />: An enchanted die, swallowed by Tegor as a young
          dragonling, spark magical abilities when he enrages.
        </li>
        <li>
          <CardLink id='N48' />: “Make love, not war,” she said, before raining
          down arcane spells on her enemies.
        </li>
        <li>
          <CardLink id='N58' />: Though she can seduce anyone with her harp, she
          is still searching for true love.
        </li>
        <li>
          <CardLink id='N81' />: Build to amplify resonance with the unifying
          field of the universe. Anyone who shares the experience of its power
          knows the true meaning of being one.
        </li>
        <li>
          <CardLink id='I2' />: Her full title is Doctor of Science, Arts,
          Ministry, and Education. It’s all the same to her.
        </li>
        <li>
          <CardLink id='I17' />: Rodents can upgrade anything, even a mighty
          dragon like Eloth!
        </li>
        <li>
          <CardLink id='I22' />: Originally called Prolonged Hero 03, his
          creators added “nix” when they found out his renewal doesn’t always
          work.
        </li>
        <li>
          <CardLink id='F12' />: Chosen by the ravens to be adored by the toads.
        </li>
        <li>
          <CardLink id='F21' />: She has found the perfect alliance in
          Shadowfen, as they also love hatching eggs and plans.
        </li>
        <li>
          <CardLink id='F23' />: So… who of you will be today‘s offering?
        </li>
        <li>
          <CardLink id='S3' />: Want my advice? Simply do everything I tell you
          to as fast as possible.
        </li>
        <li>
          <CardLink id='S19' />: Who’s better to lead an army of Undead than the
          Lord of Life?
        </li>
        <li>
          <CardLink id='S21' />: She buries the living and raises the dead.
          Sometimes by accident.
        </li>
        <li>
          <CardLink id='W8' />: Having studied ancient magic, she uncovered how
          to extract the mana crystals from her enemies.
        </li>
        <li>
          <CardLink id='W10' />: When singing to a crescent moon, the lady gains
          the goddess’ boon.
        </li>
        <li>
          <CardLink id='W23' />: He uses his mighty twin hammers for everything:
          to win battles, craft armor, repair buildings and as a cushion.
        </li>
        <li>
          <CardLink id='W29' />: Winter always seeks to preserve the reality it
          encounters, forgetting that being stuck in the same moment in time is
          no differen than death. This temple reminds us that the only constant
          in life is growing transformation.
        </li>
      </ul>

      <p>
        Additionally, the following card has a loading text despite not being a
        legendary card:
      </p>

      <ul>
        <li>
          <CardLink id='S29' />: Holds a scroll of wisdom which is said to say:
          “Control your focus, it determines your reality.”
        </li>
      </ul>

      <p>
        On the other hand, the following legendary cards do not have a loading
        text (yet): <CardLink id='N59' />, <CardLink id='N69' />,{' '}
        <CardLink id='N76' />, <CardLink id='N77' /> and <CardLink id='I29' />.
      </p>

      <Title id='animated-ui-elements'>Animated UI elements</Title>

      <p>
        Some interface elements, such as Edrik the Fierce on the home screen, or
        some background islands in the desktop version of the game, can be
        clicked/tapped to show a little animation.
      </p>

      <Title id='quests'>Quests</Title>

      <p>
        Many of the quests in the game are simple and easy to understand.
        However, there are some interesting cases when completing any quest that
        requires you to <em>spawn token units</em>.
      </p>

      <p>
        Usually, spawning tokens involve token units. There are token units for
        every single race in the game. But what happens when you are spawning
        structures or even copies of non-vanilla cards?{' '}
        <Link to='/members/pepegak'>Pepegak</Link> discovered these notable
        scenarios:
      </p>

      <ul>
        <li>
          <CardLink id='I22' /> respawning at your base counts as spawning a
          token.
        </li>
        <li>
          <CardLink id='I29' /> being triggered by <CardLink id='I2' /> and
          spawning on the board counts as spawning a token.
        </li>
        <li>
          <CardLink id='W29' /> spawning a copy of itself counts as spawning a
          token.
        </li>
        <li>
          <CardLink id='W13' /> spawning a <CardLink id='N13' /> counts as
          spawning a token.
        </li>
        <li>
          <CardLink id='I24' /> spawning a <CardLink id='I14' /> counts as
          spawning a token.
        </li>
        <li>
          <CardLink id='N90' /> splitting up into multiple copies of itself does{' '}
          <em>not</em> count as spawning a token.
        </li>
        <li>
          <CardLink id='F29' /> restoring a missing unit or structure does{' '}
          <em>not</em> count as spawning a token.
        </li>
      </ul>

      <Title id='gravity-acceleration'>Gravitational acceleration</Title>

      <p>
        <Link to='/members/arthisroo'>ArthisRoo</Link> and{' '}
        <Link to='/members/troxyz'>Troxyz</Link> from Discord took some time to
        calculate the acceleration due to gravity in Stormbound (or rather, on
        Stormbound islands).
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
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
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/guides/scales.png'
              alt='A human knight and hippo used as measurement scales'
              extend={{ marginTop: 0 }}
              width={513}
              height={231}
              lazy
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <Row isDesktopOnly>
        <Row.Column>
          <Image
            src='/assets/images/guides/toad_fall.gif'
            alt='The fall of a toad at 0.25x speed'
            extend={{ marginTop: 0 }}
            width={328}
            height={245}
            lazy
          />
        </Row.Column>
        <Row.Column>
          <p>
            Then, they needed to figure out how fast toads from{' '}
            <CardLink id='F8' /> fall from a particular height. They could not
            use the animation of the toad falling since it is already falling at
            terminal velocity. Instead, they took the animation of the toad
            bouncing and falling back down. They found the peak height of the
            toad bounce to be 5.577m vertically, and it took 0.115s to fall that
            distance from rest.
          </p>
        </Row.Column>
      </Row>

      <Notice>
        The acceleration due to gravity is 843m/s^2 in the Stormbound universe.
      </Notice>
    </>
  )
})
