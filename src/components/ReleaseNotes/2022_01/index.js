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

export default React.memo(function ReleaseNotesJanuary2022(props) {
  const { css } = useFela()
  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          January bringing balance changes, and the long awaited draft mode!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#draft-mode'>Draft mode</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

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

        <p>
          This release, just like any other, will bring some balance changes.
        </p>

        <ul>
          <li>
            <CardLink id='N42' />’ strength is now 4/5/5/6/7 (up from
            3/4/4/5/6).
          </li>
          <li>
            <CardLink id='S27' /> now cost 4 mana (down from 5) and their
            strength is now 4/5/6/7/8 (down from 4/5/6/8/10).
          </li>
          <li>
            <CardLink id='S4' />’ ability now spawns a dragon with 3/4/6/7/8
            strength (up from 3/4/5/6/7).
          </li>
          <li>
            <CardLink id='I22' /> now costs 5 mana (down from 6) and its
            strength is now 4/5/6/7/8 (down from 5/6/7/8/10).
          </li>
          <li>
            <CardLink id='W17' />’ strength is now 7/8/9/11/13 (up from
            6/7/8/10/12).
          </li>
          <li>
            <CardLink id='W18' />’ strength is now 5/6/7/8/9 (up from
            4/5/6/7/8).
          </li>
        </ul>

        <Title id='draft-mode'>Draft mode</Title>

        <p>
          The draft mode is finally here! There is a lot to explain, so there’s
          now <Link to='/guides/draft'>a new guide</Link> about it with
          everything you need to know!
        </p>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer: (
                <>
                  The balance changes will be deployed with the season reset as
                  usual. The Draft mode will be released on December 20th —
                  Merry Christmas!
                </>
              ),
            },
            {
              id: 'abandoning-a-session',
              question: 'Is it possible to abandon a draft session?',
              answer: (
                <>
                  Not really. If you really want to give up on your current
                  session, you can just lose matches until you’ve accumulated 3
                  losses. And if you don’t finish your session before the end of
                  the event, it will be ended and you will be able to collect
                  the rewards based on the amount of matches you won.
                </>
              ),
            },
          ]}
        />
      </>
    </>
  )
})
