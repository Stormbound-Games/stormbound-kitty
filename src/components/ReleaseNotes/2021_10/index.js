import React from 'react'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardLink from '~/components/CardLink'
import CheapenedBrawl from '~/components/CheapenedBrawl'
import Image from '~/components/Image'
import FAQSection from '~/components/FAQSection'
import Link from '~/components/Link'
import Page from '~/components/Page'
import Info from '~/components/Info'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import TableOfContents from '~/components/TableOfContents'
import { Coins, Rubies, Stones, Legendary } from '~/components/Resource'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function ReleaseNotesOctober2021(props) {
  return (
    <>
      <Page.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          October, bringing balance changes, new cards, and a lot of generous
          offers!
        </p>

        <p>
          Before we begin, let’s take a short moment to remember that the
          development team is currently quite fragmented due to well-deserved
          holidays in September, hence the releases being a little superficial.
          It will pick up some steam in October again to deliver new exciting
          content soon!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-cards'>New cards</Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened Brawl</Link>
          </li>
          <li>
            <Link href='#brawl-modifiers'>Brawl Modifiers</Link>
          </li>
          <li>
            <Link href='#halloween-event'>Halloween Event</Link>
          </li>
          <li>
            <Link href='#vanity-pack-bonus-system'>
              Vanity Pack Bonus System
            </Link>
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
            <CardLink id='N41' />’ spawn’s strength is now 3/4/5/6/7 (up from
            3/3/4/5/6).
          </li>
          <li>
            <CardLink id='N73' />
            ’s ability now deals 3/3/4/4/5 damage (up from 2/2/3/3/4).
          </li>
          <li>
            <CardLink id='N65' />’ strength-based ability is now +2 (up from
            +1).
          </li>
          <li>
            <CardLink id='N33' />’ ability now always draws 4 cards (up from 3
            at level 1 to 3).
          </li>
          <li>
            <CardLink id='F22' />’ mana cost is now 6 (down from 7) and the
            strength threshold of its ability is now 7/9/11/14/17 (down from
            8/10/12/15/18).
          </li>
          <li>
            <CardLink id='I18' />
            ’s damage is now 4/5/6/7/8 (up from 3/4/5/6/7).
          </li>
        </ul>

        <Title id='new-cards'>New cards</Title>
      </Page.Narrow>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N86')} />
        <CardBuilderCardDisplay {...getInitialCardData('N86')} />
        <CardBuilderCardDisplay {...getInitialCardData('N86')} />
        <CardBuilderCardDisplay {...getInitialCardData('N86')} />
      </Page.Embed>

      <Page.Narrow>
        <CheapenedBrawl ratio={0.5}>
          <p>
            Similar to previous events, the Brawl starting on October 28th (and
            only that one) is going to be cheaper. All fights will be 50% off.
            Owners of the Premium Pass will also have their usual discount
            applied, leading to a 60% reduction.
          </p>
        </CheapenedBrawl>

        <Title id='brawl-modifiers'>Brawl Modifiers</Title>

        <p>
          There will be 4 new Brawl modifiers coming in October to keep things
          fresh. Most of the modifiers have been there for ages, and y’all know
          which decks to play in and out. We hope bringing more modifiers will
          keep the Brawl entertaining and rewarding!
        </p>

        <ul>
          <li>
            <span className='Highlight'>Modifier 1:</span>
          </li>
        </ul>

        <Title id='halloween-event'>Halloween Event</Title>

        <p>
          To celebrate Halloween, there will be a small gift of{' '}
          <Rubies amount={30} /> for anyone logging into the game prior October
          31st.
        </p>

        <p>
          The Trick or Treat big bundle of sweets will also be available between
          October 4th and October 10th. It will yield{' '}
          <span className='Highlight'>6 Mythic Tomes</span>,{' '}
          <span className='Highlight'>6 Heroic Tomes</span>, and{' '}
          <span className='Highlight'>6 Classic Tomes</span> for $29.99.
        </p>

        <Image
          src='/assets/images/releases/halloween_bundle.png'
          alt='Trick or Treat bundle: 6 Mythic Tomes, 6 Heroic Tomes, 6 Classic Tomes'
        />

        <p>
          In addition, all coins and rubies purchases in the shop will yield 20%
          extra resources between October 25th and November 14th. Might be a
          good time to put a few bucks into the game if you were considering it!
        </p>

        <Title id='vanity-pack-bonus-system'>Vanity Pack Bonus System</Title>

        <p>
          To make spending a few bucks here and there into vanishing packs more
          rewarding, we are introducing a system where every vanishing pack
          purchase grants you collectible points.
        </p>

        <ul>
          <li>Buying a daily vanishing pack yields 1 point.</li>
          <li>Buying a weekly vanishing pack yields 2 points.</li>
          <li>Buying a monthly vanishing pack yields 3 points.</li>
        </ul>

        <p>
          These points are used to reach 3 different milestones which yield
          additional resources. Once the third milestone has been claimed, all 3
          milestones will get reset in the next month so they can eventually be
          collected again.
        </p>

        <ul>
          <li>
            Milestone 1 requires 5 points and yields <Coins amount={1000} />.
          </li>
          <li>
            Milestone 2 requires 10 points in total (including the previous
            milestone) and yields <Rubies amount={200} />.
          </li>
          <li>
            Milestone 3 requires 15 points in total (including the previpus
            milestones) and yields <Stones amount={50} />.
          </li>
        </ul>

        <p>
          As an example, if you collect 6 points in October, you get to collect
          the reward for the first milestone. When November comes, nothing will
          get reset: you will still have 6 points, and there will still be 2
          milestones to reach. If in November you get 15 points in total (or
          more), you’ll collect the remaining 2 milestones. Then in December,
          your points will get back to 0, and the milestones will be available
          for collection again once you have enough points.
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
                  usual along with the compensation for Rogue Sheep. The offers
                  and gifts will come around the 18th of September since this is
                  the anniversary day. The new card will come on September 23rd.
                </>
              ),
            },
          ]}
        />
      </Page.Narrow>
    </>
  )
})
