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
import { Coins, Rubies, Stones } from '../Resource'
import ResourceIcon from '../ResourceIcon'
import Title from '../Title'
import getInitialCardData from '../../helpers/getInitialCardData'

export default React.memo(function ReleaseNotesAugust2021(props) {
  return (
    <ReleaseNotes id='08_2021'>
      <Article.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          August, bringing balance changes, a new card, and some further Brawl
          developments!
        </p>

        <ol style={{ columns: '16em' }}>
          <li>
            <a href='#balance-changes'>Balance changes</a>
          </li>
          <li>
            <a href='#faq'>FAQ</a>
          </li>
        </ol>

        <Info icon='heart' title='Important notice'>
          <p>
            While I have your attention, please remember the pandemic is not
            over, even if you have been vaccinated. You can still carry the
            disease and make people sick.
          </p>
          <p>
            So wear a mask and avoid unnecessary travels—especially if you live
            in an area with rampant COVID-19 cases. It takes everyone’s effort
            to slow down this pandemic. Do the right thing. 🙏
          </p>
        </Info>

        <Title id='balance-changes'>Balance changes</Title>

        <p>This release, like any other, brings some balance changes.</p>

        <ul>
          <li>
            <CardLink id='W22' /> now trigger their ability before attacking a
            unit, regardless of its position (instead of only in front).
          </li>
          <li>
            <CardLink id='W29' />
            ’s ability now considers all friendly units (instead of surrounding
            only), but affects less units at all levels (from 2/3/4/5/6 to
            1/2/2/3/3).
          </li>
          <li>
            <CardLink id='N80' />’ ability now triggers before moving instead of
            on play and their strength has been increased by 1 (from 3/4/5/6/7
            to 4/5/6/7/8).
          </li>
          <li>
            <CardLink id='N85' />
            ’s ability no longer kills friendly confused units. Instead, once
            per turn, manually dropping a unit on the structure itself (like
            dropping a unit on a free tile) will grant it fixedly forward, then
            the weakest confused unit takes 1/2/3/4/5 damage. Its strength has
            also been adjusted to 2/3/4/5/6 (from 2/3/5/6/7).
          </li>

          <li>
            <CardLink id='N77' />
            ’s ability is reworked from scratch. It now draws up to 1/1/2/2/3
            card(s) from the enemy’s hand, and reduce their mana cost by 1.
          </li>
        </ul>

        <p>
          Quite uniquely, <CardLink id='N77' /> owners will be compensated with
          the usual rewards despite the card being reworked and overall buffed.
        </p>

        <NerfCompensationInfo title='Compensation' ids={['N77']} />

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer:
                'The balance changes will be deployed with the season reset as usual. Temple of the Mind will be available from July 2nd along with its promotional pack (for a week). The new Brawl modifiers will be released in the next few weeks.',
            },
          ]}
        />
      </Article.Narrow>
    </ReleaseNotes>
  )
})
