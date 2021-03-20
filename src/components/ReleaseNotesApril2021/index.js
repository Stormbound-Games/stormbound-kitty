import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import CheapenedBrawl from '../CheapenedBrawl'
import FAQSection from '../FAQSection'
import Image from '../Image'
import Info from '../Info'
import NerfCompensationInfo from '../NerfCompensationInfo'
import ReleaseNotes from '../ReleaseNotes'
import Row from '../Row'
import {
  Common,
  Rare,
  Epic,
  Legendary,
  Coins,
  HeroCrowns,
  Rubies,
  Stones,
} from '../Resource'
import Title from '../Title'
import getInitialCardData from '../../helpers/getInitialCardData'

export default React.memo(function ReleaseNotesApril2021(props) {
  return (
    <ReleaseNotes id='04_2021'>
      <Article.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          April, bringing balance changes, new cards, new avatars, some UI
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
            <a href='#exclusive-offers'>Exclusive offers</a>
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
          <li>Something.</li>
        </ul>

        <NerfCompensationInfo />

        <Title id='new-cards'>New cards</Title>

        <p>TBA.</p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('I29')} />
      </Article.Embed>

      <Article.Narrow>
        <Title id='heroes-league-improvements'>
          Heroes League improvements
        </Title>

        <p>
          It was to be expected that the new Heroes League would not be the
          perfect system from the get go. We are committed to make it better,
          and are ready to bring first improvements.
        </p>

        <p>The main pain-points we collected were the following:</p>

        <ol>
          <li>
            There are not enough players to play with in the Heroes League,
            particularly at the start of a new season.
          </li>
          <li>The matchmaking often felt unfair and uneven.</li>
          <li>
            The Hero Crowns gains and losses after a battle often felt too high.
          </li>
        </ol>

        <p>
          As a result, here are the changes we are about to implement to
          hopefully make things better:
        </p>

        <ol>
          <li>
            Because players currently in Heroes League will be downranked to
            Diamond instead of Platinum, we expect the Heroes League to fill up
            quicker than in its first month, hopefully minimizing the empty
            queues’ issue.
          </li>

          <li>
            We are revisiting the way matchmaking works in order to make battles
            more balanced. The Hero Crowns will be used to match players in
            Heroes League, and players’ league and cards level within their
            played deck will be taken into account in any other league.
            <br />
            As a result, we hope to build a system where gold farmers are more
            likely to be matched with other gold farmers instead of people who
            are trying to climb. Additionally, the difference in Hero Crowns in
            Heroes League matches should be lower.
          </li>

          <li>
            When a Heroes League player gets matched with a Diamond player, the
            Diamond’s player Hero Score is assumed to be 1000. This should
            decrease the Hero Crowns losses/gains in such matches.
          </li>
        </ol>

        <p>
          We hope these improvements are enough to make the Heroes League more
          enjoyable to everyone. In any case, we are going to analyze data and
          listen to your feedback within the next few weeks to see how it feels.
          We have a few other improvement ideas if needed.
        </p>

        <Title id='exclusive-offers'>Exclusive offers</Title>

        <p>
          As usual, exclusive packs will be available for 7 days starting from
          their respective release date:
        </p>

        <ul>
          <li>
            <span className='Highlight'>Ament pack ($9.99):</span> 3 Mythic
            Tomes, 2 Heroic Tomes, 1 Classic Tome and <Coins amount={500} />
          </li>
          <li>
            <span className='Highlight'>Helpful Bunny pack ($19.99):</span>{' '}
            <Rare amount={20} />, <Epic amount={15} /> and{' '}
            <Legendary amount={10} />
          </li>
          <li>
            <span className='Highlight'>Easter Edrik pack ($49.99):</span>{' '}
            <Rubies amount={650} /> and <Coins amount={6500} />
          </li>
        </ul>
      </Article.Narrow>

      <Article.Embed>
        <Row desktopOnly wideGutter>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/easter_pack_1.png'
              alt='Ament pack ($9.99): 3 Mythic Tomes, 2 Heroic Tomes, 1 Classic Tome, 500 Coins'
              withAvif
            />
          </Row.Column>

          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/easter_pack_2.png'
              alt='Helpful Bunny pack ($19.99): 20 Rare cards, 15 Epic cards, 10 Legendary cards'
              withAvif
            />
          </Row.Column>

          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/easter_pack_3.png'
              alt='Easter Edrik pack ($49.99): 650 Rubies, 6500 Coins'
              withAvif
            />
          </Row.Column>
        </Row>
      </Article.Embed>

      <Article.Narrow>
        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer: 'TBA.',
            },
          ]}
        />
      </Article.Narrow>
    </ReleaseNotes>
  )
})
