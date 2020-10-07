import React from 'react'
import { Link } from 'react-router-dom'
import BrawlMilestone from '../BrawlMilestone'
import BrawlMilestones from '../BrawlMilestones'
import BrawlOutcome from '../BrawlOutcome'
import BrawlProvider from '../BrawlProvider'
import Column from '../Column'
import Guide from '../Guide'
import Info from '../Info'
import Only from '../Only'
import { Crowns, Coins } from '../Resource'
import ResourceIcon from '../ResourceIcon'
import Row from '../Row'
import Table from '../Table'
import Title from '../Title'
import guides from '../../data/guides'
import isBrawlRunning from '../../helpers/isBrawlRunning'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import getCurrentBrawl from '../../helpers/getCurrentBrawl'
import { BRAWLS, MILESTONES } from '../../constants/brawl'
import './index.css'

const guide = guides.find(g => g.id === 'BRAWL_GUIDE')

export default React.memo(function GuideBrawl(props) {
  const currentBrawl = getCurrentBrawl()
  const isRunning = isBrawlRunning()
  const currentBrawlLabel = isRunning ? '(current Brawl)' : '(upcoming Brawl)'

  return (
    <Guide {...guide}>
      <p>
        Brawl was added late 2019 as an end-game platform for relatively
        high-level players to spend their coins in exchange for other resources,
        such as <ResourceIcon resource='RUBY' /> rubies,{' '}
        <ResourceIcon resource='STONE' /> fusion stones or valuable cards.
      </p>

      <p>
        Despite being primarily aimed at high-level players with its rather
        steep and cost curve, it still benefits new players alike. In this
        guide, we will see why you should care about the Brawl regardless of
        your experience, and what are the best strategy to maximise output.
      </p>

      <ul style={{ columns: '16em' }}>
        <li>
          <a href='#what-is-the-brawl'>What is the Brawl?</a>
        </li>
        <li>
          <a href='#what-deck-to-play'>What deck to play?</a>
        </li>
        <li>
          <a href='#when-to-stop'>When to stop?</a>
        </li>
        <li>
          <a href='#staying-on-top-of-things'>Staying on top of things</a>
        </li>
      </ul>

      <Title id='what-is-the-brawl'>What is the Brawl?</Title>

      <p>
        The Brawl is a weekly event starting every Thursday at 9:00 AM and
        ending the following Sunday at 9:00 AM. It is an alternative to the
        “Ranked” mode with one additional rule, usually buffing a unit type
        (e.g. Dwarf, or Raven) by increasing its strength, movement or reducing
        its mana cost.
      </p>

      <p>
        Unfortunately, matches are not free to join, and get progressively more
        expensive as you climb the 10 reachable milestones. The first milestone
        is free, the second milestone costs <Coins amount={20} /> per match, the
        third <Coins amount={50} /> per match, and so on and so forth.
      </p>

      <Row desktopOnly wideGutter>
        <Column>
          <p>
            Every match, whether won or lost, grants{' '}
            <span className='Highlight'>crowns</span>: victories grant{' '}
            <Crowns amount={5} /> and defeats grant only <Crowns amount={1} />.
            When reaching a certain amount of crowns, you get to claim the
            reward of the current milestone, and move on to the next. Milestones
            require more and more crowns to be completed. The first one asks for
            a meagre <Crowns amount={10} /> to complete, the second one{' '}
            <Crowns amount={20} /> (including the 10 from the first one), and so
            on.
          </p>
        </Column>
        <Column>
          <Only.Desktop>
            <div className='GuideBrawl__milestones'>
              <BrawlProvider id={currentBrawl.id}>
                <BrawlMilestone index={1} {...MILESTONES[0]} />
              </BrawlProvider>
            </div>
          </Only.Desktop>
        </Column>
      </Row>

      <p>Find below the list of all milestones, their cost and reward.</p>

      <Only.Desktop>
        <Guide.FullWidth padding='60px'>
          <Table>
            <thead>
              <tr>
                <th>Required crowns</th>
                <th>Cost per match</th>
                <th>Reward once reached</th>
              </tr>
            </thead>
            <tbody>
              {MILESTONES.map(milestone => (
                <tr key={milestone.crowns}>
                  <td>
                    <Crowns amount={milestone.crowns} />
                  </td>
                  <td>
                    <Coins amount={milestone.cost} />
                  </td>
                  <td>{getBrawlRewardLabel(milestone, true)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Guide.FullWidth>
      </Only.Desktop>

      <Only.Mobile>
        <div className='GuideBrawl__milestones'>
          <BrawlProvider id={currentBrawl.id}>
            <BrawlMilestones />
          </BrawlProvider>
        </div>
      </Only.Mobile>

      <p>
        Crowns are reset every week, and there is no way to skip a milestone or
        start the Brawl beyond the first milestone. The only way to move on is
        to fight other players, and hopefully win.
      </p>

      <Title id='what-deck-to-play'>What deck to play?</Title>

      <p>
        Every week brings a new rule, so it is unlikely to be able to play the
        same deck two weeks in a row. For instance, if dwarves cost less mana in
        week A, but satyrs have more strength in week B, it will be necessary to
        adapt to the week’s theme in order to stay competitive.
      </p>

      <p>Find below the existing modifiers in their order of apparition:</p>

      <ul>
        {BRAWLS.map(brawl => (
          <li key={brawl.cardId}>
            <span className='Highlight'>{brawl.title}</span>: {brawl.label}{' '}
            {brawl.id === currentBrawl.id ? currentBrawlLabel : ''}
          </li>
        ))}
      </ul>

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
        The <Link to='/deck/suggestions?category=BRAWL'>popular decks</Link>{' '}
        offer quite a few deck for every single Brawl, which should be a solid
        base for every one to compose a deck they feel comfortable with.
      </p>

      <Info
        icon='sword'
        title={
          <>
            Deck detail<Only.Desktop> & dry-runner</Only.Desktop>
          </>
        }
      >
        It is possible to analyse the mana-curve of a deck with a Brawl
        mana-modifier in the deck detail of the site (for example,{' '}
        <Link to='/deck/5n15f85n25f45f35n35n675n95n155f105n405n76/detail'>
          Mirc’s deck for the spell Brawl
        </Link>
        ). Additionally, it can be practiced in the dry-runner, if only to test
        whether mana gets wasted or if the cards flow nicely.
      </Info>

      <Title id='when-to-stop'>When to stop?</Title>

      <p>
        Once again, the Brawl is a content platform aimed at players with a) a
        solid card collection able to make a variety of decks and b) a decent
        amount of coins to burn through in order to reach interesting
        milestones. For most players, going far and high every week is not an
        option.
      </p>

      <p>
        At the very least, everyone should reach the first milestone which
        grants a Humble book. It is free to play and requires only{' '}
        <Crowns amount={10} /> which is at best 2 victories, and at worst 10
        losses.
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
        players able to reach milestone 5 (the one granting a Mythic Tome)
        consistently would stop there, because that is the perfect sweet spot
        between coins spent and rewards earned.
      </p>

      <Info icon='compass' title='Resources Guide'>
        The <Link to='/guides/resources'>resources guide</Link> from{' '}
        <Link to='/member/Roman'>Roman</Link>
        expands a bit more into the math behind the Brawl strategy, as well as
        whether or not it is wise to spend coins in the Brawl.
      </Info>

      <Title id='staying-on-top-of-things'>Staying on top of things</Title>

      <p>
        Given how expensive the Brawl is, regardless of which milestone you aim
        for, really, it only makes sense that players get hyper-cautious and
        invested. Countless spreadsheets have circulated for players to record
        their match, yielding the coins balance.
      </p>

      <p>
        The site offers a{' '}
        <Link to={'/brawl/' + currentBrawl.id.replace(/_/g, '-').toLowerCase()}>
          Brawl tracker
        </Link>{' '}
        where you can record the outcome of your matches as you play them. In
        return, it gives you the amount of coins you spent in fees, the amount
        of coins and rewards you received, and even gives you handy statistics
        on your win/rate ratio.
      </p>

      <div style={{ maxWidth: '500px', margin: 'auto' }}>
        <BrawlProvider id={currentBrawl.id}>
          <BrawlOutcome setup='MOBILE_WITH_ADS' />
        </BrawlProvider>
      </div>
    </Guide>
  )
})
