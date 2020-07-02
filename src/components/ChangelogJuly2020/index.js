import React from 'react'
import Article from '../Article'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import Column from '../Column'
import Info from '../Info'
import Quest from '../Quest'
import Row from '../Row'
import Title from '../Title'
import { Coins, Rubies, Stones } from '../Resource'
import getInitialCardData from '../../helpers/getInitialCardData'
import './index.css'

export default React.memo(function ChangelogJuly2020(props) {
  return (
    <Article
      author='Kitty'
      title='Update July 2020'
      backLink={{ to: '/changelog', children: 'Back to changelog' }}
      readingTime='10 minutes'
      className='ChangelogJuly2020'
      background='/assets/images/environment_dragon.png'
      ratio='50%'
    >
      <p>
        Back in April, Paladin Studios announced they would hand over Stormbound
        to a Polish game development studio called Sheepyard. A few months
        later, Sheepyard is ready to ship their very first release, after a
        drought of about 8 months. I am very excited and honoured to be able to
        announce these changes in exclusivity!
      </p>

      <Title>Economy update</Title>

      <p>
        One thing Sheepyard has been quite adament to tackle is the somewhat
        awkward in-game economy. Their first attempt at taming the beast has
        been to revisit quests to restore some balance between the three
        currencies.
      </p>

      <ul>
        <li>
          Tier 1 quests will now grant <Coins amount={100} />.
        </li>
        <li>
          Tier 2 quests will now grant <Rubies amount={5} />.
        </li>
        <li>
          Tier 3 quests will now grant 1 or <Stones amount={2} />, depending on
          the quest.
        </li>
      </ul>

      <div className='Article__fullwidth' style={{ '--padding': '0' }}>
        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <Quest
              difficulty={1}
              name='Student'
              description='Play 20 cards'
              currency='COINS'
              amount={100}
            />
          </Column>
          <Column width='1/3'>
            <Quest
              difficulty={2}
              name='Grand recruitment'
              description='Spawn 15 token units'
              currency='RUBIES'
              amount={5}
            />
          </Column>
          <Column width='1/3'>
            <Quest
              difficulty={3}
              name='Masterful Blueprint'
              description='Play 15 structure cards'
              currency='STONES'
              amount={2}
            />
          </Column>
        </Row>
      </div>

      <Info title='Rerolling quests'>
        <p>
          Quests can still be re-rolled once per day, but a quest tier 1 will
          always grant coins, a tier 2 quest will always grant rubies and a tier
          3 quest will always grant fusion stones.
        </p>
      </Info>

      <Title>A new legendary card</Title>

      <p>
        To celebrate their involvement in Stormbound, the Sheepyard studio
        wanted to mark the occasion with a brand new card in their effigy: a
        legendary pirate sheep!
      </p>

      <div className='Article__fullwidth'>
        <CardBuilderCardDisplay {...getInitialCardData('N77')} />
      </div>

      <Title>Balance changes</Title>
    </Article>
  )
})
