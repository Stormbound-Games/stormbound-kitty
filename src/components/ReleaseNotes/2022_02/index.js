import React from 'react'
import { useFela } from 'react-fela'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardLink from '~/components/CardLink'
import CheapenedBrawl from '~/components/CheapenedBrawl'
import Image from '~/components/Image'
import FAQSection from '~/components/FAQSection'
import Link from '~/components/Link'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import Only from '~/components/Only'
import Page from '~/components/Page'
import Info from '~/components/Info'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Table from '~/components/Table'
import TableOfContents from '~/components/TableOfContents'
import {
  Coins,
  Rubies,
  Stones,
  Common,
  Rare,
  Epic,
  Legendary,
} from '~/components/Resource'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function ReleaseNotesFebruary2022(props) {
  const { css } = useFela()

  return (
    <>
      <Page.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          February bringing balance changes, 4 new Ancient cards, compensation
          and some exclusive offers!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-cards'>New cards</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

        <Info icon='heart' title='Important notice'>
          <p>
            While I have your attention, please remember the pandemic is not
            over, even if you have been vaccinated and got a booster shot. You
            can still carry the disease and make people sick.
          </p>
          <p>
            So wear a mask and avoid unnecessary travels—especially if you live
            in an area with rampant COVID-19 cases. It takes everyone’s effort
            to slow down this pandemic. Do the right thing. 🙏
          </p>
        </Info>

        <Title id='balance-changes'>Balance changes</Title>

        <p>
          This release, just like any other, will bring some balance changes.
        </p>

        <ul>
          <li>
            <CardLink id='N1' />’ ability now vitalizes the enemy unit as well.
          </li>
          <li>
            <CardLink id='N74' />
            ’s strength is now 7/8/9/11/13 (up from 6/7/8/10/12).
          </li>
          <li>
            <CardLink id='N81' />
            ’s strength is now 3/4/5/6/7 (up from 2/3/4/5/6).
          </li>
          <li>
            <CardLink id='N70' />’ strength is now 5/6/7/8/10 (up from
            4/5/6/7/9).
          </li>
          <li>
            <CardLink id='W15' />’ mana cost is now 6 (down from 7) and their
            strength if now 2 (down from 3).
          </li>
          <li>
            <CardLink id='W6' />
            ’s ability now grants 5/6/7/8/10 (up from 4/5/6/7/8).
          </li>
          <li>
            <CardLink id='N40' />
            ’s ability now grants 7/8/8/10/12 (up from 6/7/7/9/11).
          </li>
        </ul>

        <Title id='new-cards'>New cards</Title>

        <p>
          Four new Ancient cards will join the ranks of their respective
          factions, all epic.
        </p>
      </Page.Narrow>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('F31')} />
        <CardBuilderCardDisplay {...getInitialCardData('I31')} />
        <CardBuilderCardDisplay {...getInitialCardData('S31')} />
        <CardBuilderCardDisplay {...getInitialCardData('W33')} />
      </Page.Embed>

      <Page.Narrow>
        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer: <>TBD.</>,
            },
          ]}
        />
      </Page.Narrow>
    </>
  )
})
