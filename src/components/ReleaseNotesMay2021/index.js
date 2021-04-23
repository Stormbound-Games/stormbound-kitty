import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import FAQSection from '../FAQSection'
import Image from '../Image'
import Info from '../Info'
import NerfCompensationInfo from '../NerfCompensationInfo'
import ReleaseNotes from '../ReleaseNotes'
import Row from '../Row'
import {
  Rare,
  Epic,
  Legendary,
  Coins,
  Rubies,
  Stones,
  HeroCrowns,
} from '../Resource'
import ResourceIcon from '../ResourceIcon'
import Title from '../Title'
import getInitialCardData from '../../helpers/getInitialCardData'

export default React.memo(function ReleaseNotesMay2021(props) {
  return (
    <ReleaseNotes id='05_2021'>
      <Article.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early May,
          bringing balance changes, new cards, a new Premium pass, some UI
          improvements and some exclusive offers as usual!
        </p>

        <ol style={{ columns: '16em' }}>
          <li>
            <a href='#balance-changes'>Balance changes</a>
          </li>
          <li>
            <a href='#new-cards'>New cards</a>
          </li>
          <li>
            <a href='#heroes-league-improvements'>Heroes League improvements</a>
          </li>
          <li>
            <a href='#new-premium-pass'>New Premium Pass</a>
          </li>
          <li>
            <a href='#extra-decks-lots'>Extra deck slots</a>
          </li>
          <li>
            <a href='#exclusive-offers'>Exclusive offers</a>
          </li>
          <li>
            <a href='#qol-improvements'>Quality of Life improvements</a>
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

        <p>This release, like any other, brings some balance changes.</p>

        <ul>
          <li>TBA.</li>
        </ul>

        <NerfCompensationInfo />

        <Title id='new-cards'>New cards</Title>
        <p>
          Two new cards are joining the Winterpact faction, one rare structure
          and one common unit—both with freeze dynamics!
        </p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('W31')} />
        <CardBuilderCardDisplay {...getInitialCardData('W30')} />
      </Article.Embed>

      <Article.Narrow>
        <Row desktopOnly wideGutter style={{ alignItems: 'center' }}>
          <Row.Column>
            <Image
              src='/assets/images/releases/may_cards_packs.png'
              alt='Iceflakes pack ($9.99): 10 copies of Iceflakes, 5 fusions stones and 750 coins; Glacier Palace pack ($9.99): 10 copies of Glacier Palace, 5 fusions stones and 750 coins'
              withAvif
            />
          </Row.Column>
          <Row.Column>
            <p>
              As usual, there will be exclusive packs to quickly get access to
              some copies of the new cards between May 7th and May 14th.
            </p>
            <p>They will each cost $9.99, and will grant the following: </p>
            <ul>
              <li>
                <ResourceIcon resource='RARE' /> 10 copies of{' '}
                <CardLink id='W31' />
                , <Stones amount={5} /> and <Coins amount={750} />.
              </li>
              <li>
                <ResourceIcon resource='RARE' /> 5 copies of{' '}
                <CardLink id='W30' />
                , <Stones amount={5} /> and <Coins amount={750} />.
              </li>
            </ul>
          </Row.Column>
        </Row>

        <Title id='heroes-league-improvements'>
          Heroes League improvements
        </Title>

        <p>
          We have issued quite some Heroes League improvements in{' '}
          <Link to='/releases/04-2021#heroes-league-improvements'>April</Link>{' '}
          already and are monitoring their impact before pushing up new changes.
        </p>

        <p>
          That being said, we heard the community’s concerns about the fact that
          lost matches feel too critical in the Heroes League because they take
          away too many <ResourceIcon resource='HERO_CROWN' /> Hero Crowns.
        </p>

        <p>
          To make the <ResourceIcon resource='HERO_CROWN' /> Hero Crowns
          fluctuation smaller and solve that problem, we are setting up a
          maximum penalty of <HeroCrowns amount={-10} /> for a loss, and a
          minimum gain of <HeroCrowns amount={5} /> for a win.
        </p>

        <Title id='new-premium-pass'>New Premium Pass</Title>

        <p>
          May will be the month where the Premium Pass finally get redesigned
          and boosted. Its cost is increased to $9.99, but its rewards are now
          numerous:
        </p>

        <ul>
          <li className='Highlight'>No more ads for the month.</li>

          <li>
            The daily calendar rewards. It will work the same as it has since
            the beginning, and the rewards will be closer to the original one
            from December.
          </li>

          <li>The coin cap is now 600 for the month.</li>

          <li>
            The friend limit is now 200 (up from 100). This perk is persisted
            after the end of the month. In other words, as soon as one buys the
            Premium Pass, their friend list can forever contain up to 200
            people.
          </li>

          <li>
            Three more deck slots. This perk is also persisted after the end of
            the month.
          </li>
        </ul>

        <Title id='extra-deck-slots'>Extra deck slots</Title>

        <p>
          On top of the 3 deck slots that can be unlocked via the Premium Pass,
          3 extra deck slots can be bought by all players via some in-game
          resources (in any order).
        </p>

        <ul>
          <li>
            One of the 3 slots costs <Coins amount={3000} />.
          </li>
          <li>
            One of the 3 slots costs <Rubies amount={250} />.
          </li>
          <li>
            One of the 3 slots costs <Stones amount={50} />.
          </li>
        </ul>

        <Title id='exclusive-offers'>Exclusive offers</Title>

        <p>Something</p>

        <Title id='qol-improvements'>Quality of Life improvements</Title>

        <p>Things.</p>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer:
                'The balance changes will be deployed with the season reset as usual. The two new cards will be available from May 7th.',
            },
          ]}
        />
      </Article.Narrow>
    </ReleaseNotes>
  )
})
