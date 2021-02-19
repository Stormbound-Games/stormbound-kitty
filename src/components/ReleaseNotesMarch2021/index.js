import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import EloCalculator from '../EloCalculator'
import FAQSection from '../FAQSection'
import Image from '../Image'
import Info from '../Info'
import NerfCompensationInfo from '../NerfCompensationInfo'
import Only from '../Only'
import ReleaseNotes from '../ReleaseNotes'
import Row from '../Row'
import { Coins, Crowns, Rubies, Stones } from '../Resource'
import Table from '../Table'
import Title from '../Title'
import TogglableContent from '../TogglableContent'
import displayBundle from '../../helpers/displayBundle'
import getCalendarValue from '../../helpers/getCalendarValue'
import getRewardLabel from '../../helpers/getRewardLabel'
import getInitialCardData from '../../helpers/getInitialCardData'
import { MILESTONES } from '../../constants/brawl'

export default React.memo(function ReleaseNotesMarch2021(props) {
  return (
    <ReleaseNotes id='03_2021'>
      <Article.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          March, bringing balance changes, new cards, new avatars, some UI
          improvements, some exclusive offers as usual and most important, the
          Heroes League!
        </p>

        <ol style={{ columns: '16em' }}>
          <li>
            <a href='#balance-changes'>Balance changes</a>
          </li>
          <li>
            <a href='#new-cards'>New cards</a>
          </li>
          <li>
            <a href='#heroes-league'>Heroes League</a>
          </li>
          <li>
            <a href='#ui-improvements'>UI improvements</a>
          </li>
          <li>
            <a href='#new-books'>New books</a>
          </li>
          <li>
            <a href='#faq'>FAQ</a>
          </li>
        </ol>

        <Info icon='heart' title='Important notice'>
          <p>
            While I have your attention, please wear a mask and avoid
            unnecessary travels—especially if you live in an area with rampant
            COVID-19 cases. It takes everyone’s effort to slow down this
            pandemic. Do the right thing. 🙏
          </p>
        </Info>

        <Title id='balance-changes'>Balance changes</Title>

        <p>This release, like any others, brings some balance changes.</p>

        <ul>
          <li>
            <CardLink id='I3' />
            ’s ability now grants 1/2/3/4/5 strength (down from 2/3/4/5/6).
          </li>
          <li>
            <CardLink id='F28' />’ strength is now 4/5/7/9/12 (down from
            5/6/8/10/13).
          </li>
          <li>
            <CardLink id='N23' />
            ’s mana cost is now 3 on all levels (up from 2).
          </li>
        </ul>

        <NerfCompensationInfo />

        <Title id='new-cards'>New cards</Title>

        <p>
          On March 8th will be released 2 news cards: the Temple of Space, and a
          common dragon card called Flameless Dragons.
        </p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N81')} />
      </Article.Embed>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N82')} />
      </Article.Embed>

      <Article.Narrow>
        <Title id='heroes-league'>Heroes League</Title>

        <p>
          March will introduce a brand new league: the{' '}
          <span className='Highlight'>Heroes League</span>! It is an additional
          league after Diamond which can be reached on a monthly basis by
          passing beyond Diamond 1.
        </p>

        <img
          src='/assets/images/releases/rank_hero.png'
          alt='Heroes League badge'
          style={{ maxWidth: '300px', margin: '3em auto' }}
        />

        <p>
          This league does not have the same ranking system as the
          others—instead it has a ladder. Players move along that ladder based
          on the amount of <span className='Highlight'>Elo Crowns</span> they
          own, also known as their{' '}
          <span className='Highlight'>Elo Ranking</span> (e.g. owning 1500 Elo
          Crowns is the same as having a ranking of 1500). These are gained and
          lost after each ranked game performed in Diamond and the Heroes League
          (see formula below).
        </p>

        <p>
          When entering the Diamond league, every player is granted 1000 Elo
          Crowns to start with. As they progress through Diamond, they already
          collect (or loose) Elo Crowns (see below). When finally passing
          Diamond 1 and entering the Heroes League, the amount of Elo Crowns
          collected represents the Elo Ranking—provided it is above 1000. If the
          Diamond progress was difficult and a player was to enter Heroes League
          with less than 1000 Elo Crowns, their ranking would be set to 1000.
        </p>

        <img
          src='/assets/images/releases/chest_hero.png'
          alt='Heroes League chest'
          style={{ maxWidth: '300px', margin: '3em auto' }}
        />

        <p>
          At the end of the season, players having reached the Heroes League
          will be down-ranked back to Diamond 5, their ranking will be reset,
          and will receive a Heroes League chest (20 common cards, 16 rare
          cards, 8 epic cards and 3 legendary cards, as well as{' '}
          <Coins amount={3000} /> and <Rubies amount={100} />) as well as
          rewards based on their final position in the ladder as follow:
        </p>

        <ul>
          <li>
            The 1st player in the ladder will earn a Mythic tome, one Elder tome
            and one legendary dragon card (worth <Rubies amount={260} /> total).
          </li>
          <li>
            The other players in the top 10 will earn a Mythic tome and a Feline
            tome (worth <Rubies amount={140} /> total).
          </li>
          <li>
            The other players in the top 100 will earn a Heroic tome and a
            common dragon card (worth <Rubies amount={100} /> total).
          </li>
          <li>
            The other players in the top 500 will earn a Pirate tome (worth{' '}
            <Rubies amount={60} /> total).
          </li>
        </ul>

        <hr />

        <p>
          The formula used to determine the new ranking (
          <var className='Highlight'>
            R<sub>n</sub>
          </var>
          ) from the old ranking (
          <var className='Highlight'>
            R<sub>o</sub>
          </var>
          ) at the end of a ranked battle goes as follow:
        </p>

        <img
          src='/assets/images/releases/elo_formula.png'
          alt='Ranking formula'
        />

        <p>Here are the terms:</p>

        <ul style={{ marginBottom: '3em' }}>
          <li>
            <var className='Highlight'>
              R<sub>n</sub>
            </var>{' '}
            is the new ranking
          </li>
          <li>
            <var className='Highlight'>
              R<sub>o</sub>
            </var>{' '}
            is the old ranking
          </li>
          <li>
            <var className='Highlight'>K</var> is the coefficient factor: it is
            worth 40 for new players until they have played 30 matches in
            Diamond, 20 for players rated below 2400, and 10 for players who
            ever reached 2400, regardless of their current ranking
          </li>
          <li>
            <var className='Highlight'>W</var> is either 1 in case of a win, 0
            for a loss
          </li>
          <li>
            <var className='Highlight'>dr</var> is the difference between the
            two player’s ranking and is capped to 400 too much rating
            fluctuations in case of uneven matchmaking
          </li>
        </ul>

        <Info icon='equalizer' title='Ranking calculator'>
          <p>
            This calculator executes the aforementioned formula on the given
            variables to compute your expect Elo ranking.
          </p>
          <EloCalculator />
        </Info>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer: 'TBA.',
            },
            {
              id: 'diamond-and-heroes',
              question: 'Can I be in both Diamond and Heroes?',
              answer:
                'No, you are either in the Diamond league or in the Heroes league, but never both. However, when you are in Diamond, you are already in Elo ranking but your score is not taken into consideration on the Heroes league leaderboard.',
            },
            {
              id: 'crowns-count',
              question: 'How can I check how many crowns I have?',
              answer:
                'When you are in Diamond, you can already see your score in the Heroes League leaderboard, only it is marked with an info icon (?) that says you do not belong to this leaderboard yet.',
            },
          ]}
        />
      </Article.Narrow>
    </ReleaseNotes>
  )
})
