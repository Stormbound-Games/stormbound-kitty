import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import BrawlDifficultySelect from '~/components/BrawlDifficultySelect'
import BrawlMilestones from '~/components/BrawlMilestones'
import BrawlProvider from '~/components/BrawlProvider'
import Footnotes, { Footnote } from '~/components/Footnotes'
import Image from '~/components/Image'
import Info from '~/components/Info'
import Only from '~/components/Only'
import { Crowns, Coins } from '~/components/Resource'
import PageEmbed from '~/components/PageEmbed'
import ResourceIcon from '~/components/ResourceIcon'
import Row from '~/components/Row'
import Table from '~/components/Table'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import getResourceLabel from '~/helpers/getResourceLabel'
import { BRAWLS, BRAWL_MILESTONES } from '~/constants/brawl'

export default React.memo(function GuideBrawl(props) {
  const { css } = useFela()
  const [difficulty, setDifficulty] = React.useState('ULTIMATE')
  const milestones = BRAWL_MILESTONES[difficulty]

  return (
    <>
      <p>
        Brawl was added late 2019 as an end-game platform for relatively
        high-level players to spend their coins in exchange for other resources,
        such as <ResourceIcon resource='RUBY' /> rubies,{' '}
        <ResourceIcon resource='STONE' /> fusion stones or valuable cards. In
        June 2021, it was revamped to be more inclusive and welcoming to all
        players.
      </p>

      <p>
        Despite being still primarily aimed at high-level players with its
        rather steep and cost curve, it still benefits new players alike. In
        this guide, we will see why you should care about the Brawl regardless
        of your experience, and what are the best strategy to maximize output.
      </p>

      <TableOfContents>
        <li>
          <Link href='#what-is-the-brawl'>What is the Brawl?</Link>
        </li>
        <li>
          <Link href='#what-are-victory-bonuses'>
            What are victory bonuses?
          </Link>
        </li>
        <li>
          <Link href='#what-deck-to-play'>What deck to play?</Link>
        </li>
        <li>
          <Link href='#when-to-stop'>When to stop?</Link>
        </li>
        <li>
          <Link href='#staying-on-top-of-things'>Staying on top of things</Link>
        </li>
      </TableOfContents>

      <Title id='what-is-the-brawl'>What is the Brawl?</Title>

      <p>
        The Brawl is a weekly event starting every Thursday at 9:00 AM and
        ending the following Sunday at 9:00 AM. It is an alternative to the
        “Ranked” mode with additional rules, usually buffing a unit type (e.g.
        Dwarf, or Raven) by increasing its strength, movement or reducing its
        mana cost.
      </p>

      <p>
        Unfortunately, matches are not free to join, and get progressively more
        expensive as you climb the milestones. Every week, three levels of
        difficulty are available and one can compete in some or all 3 of them:
        Casual, Warrior and Ultimate.
      </p>

      <ul>
        <li>
          In the Casual event, the Fortress Level is capped to 12 health, and
          the level of all cards is set to 1. All matches need to be settled
          within 10 turns otherwise they will lead to a{' '}
          <Footnote id='draw'>draw</Footnote>.
        </li>
        <li>
          In the Warrior event, the Fortress Level is capped to 14 health, and
          the level of all cards is limited to 3 at most. All matches need to be
          settled within 15 turns otherwise they will lead to a draw.
        </li>
        <li>
          In the Ultimate event, the Fortress Level and cards level are not
          capped and depend to each player. All matches need to be settled
          within 20 turns otherwise they will lead to a draw.
        </li>
      </ul>

      <p>
        Every match regardless of outcome grants{' '}
        <span className='Highlight'>crowns</span>: victories grant{' '}
        <Crowns amount={5} />, defeats yield only <Crowns amount={1} /> and
        draws yield <Crowns amount={2} />. When reaching a certain amount of
        crowns, you get to claim the reward of the current milestone, and move
        on to the next. Milestones require more and more crowns to be completed.
        The first one asks for a meagre <Crowns amount={7} /> to complete, the
        second one <Crowns amount={20} /> (including the 10 from the first one),
        and so on.
      </p>

      <p>
        When losing 3 times within a given milestone, the amount of crowns is
        reset to the previously completed milestone. For instance, if losing for
        the 3rd time when attempting to reach milestone 5 at{' '}
        <Crowns amount={70} />, crowns are reset to 50.
      </p>

      <Info icon='equalizer' title='Last crown for milestone'>
        <p>
          If missing <Crowns amount={1} /> to reach a given milestone while
          having lost twice already, losing a 3rd game will{' '}
          <span className='Highlight'>not</span> reset the crowns to the
          previous milestone. Instead, the last crown awarded by the loss will
          be enough to reach the next milestone.
        </p>
      </Info>

      <p>
        Find below the list of all milestones, their cost and reward for every
        difficulty level.
      </p>

      <BrawlDifficultySelect
        value={difficulty}
        onChange={event => setDifficulty(event.target.value)}
      />

      <Only.Desktop>
        <PageEmbed>
          <Table>
            <thead>
              <tr>
                <th>Required crowns</th>
                <th>Cost per match</th>
                <th>Reward once reached</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map(milestone => (
                <tr key={milestone.crowns}>
                  <td>
                    <Crowns amount={milestone.crowns} />
                  </td>
                  <td>
                    <Coins amount={milestone.cost} />
                  </td>
                  <td>{getResourceLabel(milestone, true)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </PageEmbed>
      </Only.Desktop>

      <Only.Mobile>
        <ul>
          {milestones.map(milestone => (
            <li key={milestone.crowns}>
              <Coins amount={milestone.cost} /> until{' '}
              <Crowns amount={milestone.crowns} />
            </li>
          ))}
        </ul>
      </Only.Mobile>

      <Only.Desktop>
        <div className={css({ fontSize: '80%' })}>
          <BrawlProvider id='SPELL_MANA' difficulty={difficulty}>
            <BrawlMilestones difficulty={difficulty} />
          </BrawlProvider>
        </div>
      </Only.Desktop>

      <p>
        Crowns are reset every week, and there is no way to skip a milestone or
        start the Brawl beyond the first milestone. The only way to move on is
        to fight other players, and hopefully win.
      </p>

      <Title id='what-are-victory-bonuses'>What are victory bonuses?</Title>

      <Row isDesktopOnly>
        <Row.Column>
          <p>
            The idea is that after{' '}
            <span className='Highlight'>every victory</span> in Brawl, you will
            be offered one of two random bonuses, amongst a set of 9 different
            possible bonuses (see the complete list below). Some of them will
            provide resources while some will improve your livelihood in Brawl
            by redeeming and refilling hearts.
          </p>
          <p>
            You begin a Brawl adventure with 3 full green hearts. When you lose
            a match, you lose one heart (it gets emptied and red). If all hearts
            are lost, then your crowns get reset to the beginning of the current
            milestone.
          </p>
        </Row.Column>
        <Row.Column>
          <Image
            extend={{ marginTop: 0 }}
            src='/assets/images/releases/brawl_bonuses_choice.jpg'
            alt='Choice between 2 bonuses after a victory in Brawl'
            width={310}
            height={467}
            lazy
          />
        </Row.Column>
      </Row>

      <p>Here is the breakdown of every victory bonus:</p>

      <ul>
        <li>
          <span className='Highlight'>Resources bonuses:</span> Picking these
          bonuses will immediately grant you a certain amount of resources,
          varying based on the Brawl difficulty and milestone.
        </li>
        <li>
          <span className='Highlight'>Fortress Up bonus:</span> Picking this
          bonus will increase your Fortress Level by 1 within the current Brawl
          difficulty and only for Brawl matches. It will not increase the
          Fortress Level beyond the cap for that Brawl. This bonus cannot be
          drawn if already capped.
        </li>
        <li>
          <span className='Highlight'>Life/Lives Up bonuses:</span> Picking
          these bonuses will refill a heart (or all hearts), giving you extra
          chances to climb the milestones without being reset to the start of
          the current milestone.
        </li>
        <li>
          <span className='Highlight'>Rusty Slot:</span> Picking this bonus will
          grant you an extra heart slot (up to 5 heart slots in total). Once you
          lose a life from this slot, the slots destroys itself. It also
          destroys itself on milestone reset.
        </li>
        <li>
          <span className='Highlight'>Solidify:</span> Picking this bonus will
          make one of your hearts indestructible. From there on, it behaves like
          one of three default slots.
        </li>
        <li>
          <span className='Highlight'>Ice Armor:</span> Picking this bonus will
          give an Ice Armor to the first full heart. After a loss, the Ice Armor
          gets destroyed while keeping the heart beneath it intact.
        </li>
      </ul>

      <Title id='what-deck-to-play'>What deck to play?</Title>

      <p>
        Every week brings new rules, so it is unlikely to be able to play the
        same deck two weeks in a row. For instance, if dwarves cost less mana in
        week A, but satyrs have more strength in week B, it will be necessary to
        adapt to the week’s theme in order to stay competitive.
      </p>

      <p>Find below the existing modifiers:</p>

      <PageEmbed>
        <ul className={css({ columns: '16em', columnGap: '2em' })}>
          {BRAWLS.map(brawl => (
            <li key={brawl.cardId} style={{ textIndent: 0, paddingLeft: 0 }}>
              <span className='Highlight'>{brawl.title}</span>: {brawl.label}
            </li>
          ))}
        </ul>
      </PageEmbed>

      <p>
        A good way to practice Brawl and try decks outside of the event itself
        to avoid spending coins needlessly is to rely on the extended friendly
        matches. There is a way to do friendly games with Brawl modifiers, and
        it is a great way to get prepared before the real thing.
      </p>

      <p>
        All that being said, it can be interesting to take the Brawl as an
        opportunity to level up cards that you would not otherwise play
        (provided your finances allow it), and therefore increasing your
        fortress level. For instance, leveling up some construct cards as a
        Swarm player.
      </p>

      <p>
        The <Link to='/deck/featured?tags=BRAWL'>featured decks</Link> offer
        quite a few deck for every single Brawl, which should be a solid base
        for every one to compose a deck they feel comfortable with.
      </p>

      <Info
        icon='sword'
        title={
          <>
            Deck detail<Only.Desktop> & dry-runner</Only.Desktop>
          </>
        }
      >
        <p>
          It is possible to analyse the mana-curve of a deck with a Brawl
          mana-modifier in the deck detail of the site (for example,{' '}
          <Link to='/deck/5xn1n2f3n3f8f4n67n9n15f10n40n76/detail'>
            Mirc’s deck for the spell Brawl
          </Link>
          ). Additionally, it can be practiced in the dry-runner, if only to
          test whether mana gets wasted or if the cards flow nicely.
        </p>
      </Info>

      <Title id='when-to-stop'>When to stop?</Title>

      <p>
        Once again, the Brawl is a content platform generally aimed at players
        with a) a solid card collection able to make a variety of decks and b) a
        decent amount of coins to burn through in order to reach interesting
        milestones. For most players, going far and high every week is not an
        option.
      </p>

      <p>
        At the very least, everyone should reach the first milestone of every
        difficulty level which grants coins and a Humble book. It is free to
        play and requires only <Crowns amount={10} /> (in each difficulty) which
        is at best 2 victories, and at worst 10 losses.
      </p>

      <p>
        If you plan on going further, it can be interesting to willingly lose a
        few games while they are free in order to sit at 8 or{' '}
        <Crowns amount={9} /> before having a victory boosting you out of the
        free milestone.
      </p>

      <p>
        From there, it really depends how many coins you can realistically
        spend, and how successful you are at beating your opponents. Most
        players able to reach milestone 5 (the one granting interesting books)
        consistently would stop there, because that is the perfect sweet spot
        between coins spent and rewards earned.
      </p>

      <Info icon='compass' title='Resources Guide'>
        <p>
          The <Link to='/guides/resources'>resources guide</Link> from{' '}
          <Link to='/members/roman'>Roman</Link> expands a bit more into the
          math behind the Brawl strategy, as well as whether or not it is wise
          to spend coins in the Brawl.
        </p>
      </Info>

      <Title id='staying-on-top-of-things'>Staying on top of things</Title>

      <p>
        Given how expensive the Brawl is, regardless of which milestone you aim
        for, really, it only makes sense that players get hyper-cautious and
        invested. Countless spreadsheets have circulated for players to record
        their match, yielding the coins balance.
      </p>

      <p>
        The site offers a <Link to='/brawl'>Brawl tracker</Link> where you can
        record the outcome of your matches as you play them. In return, it gives
        you the amount of coins you spent in fees, the amount of coins and
        rewards you received, and even gives you handy statistics on your
        win/rate ratio.
      </p>

      <Footnotes>
        <p id='draw'>
          (*) A draw can happen when both players have the same amount of health
          by the end of the last turn (10th in Casual, 15th in Warrior and 20th
          in Ultimate).{' '}
          <Link href='#draw-ref' aria-label='Back to content'>
            ↩
          </Link>
        </p>
      </Footnotes>
    </>
  )
})
