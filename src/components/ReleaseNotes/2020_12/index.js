import React from 'react'
import Page from '~/components/Page'
import CardLink from '~/components/CardLink'
import FAQSection from '~/components/FAQSection'
import Footnotes, { Footnote } from '~/components/Footnotes'
import HorizontalRule from '~/components/HorizontalRule'
import Image from '~/components/Image'
import Info from '~/components/Info'
import Link from '~/components/Link'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import { Coins, Rubies } from '~/components/Resource'
import RewardsTable from '~/components/RewardsTable'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import displayBundle from '~/helpers/displayBundle'
import getCalendarValue from '~/helpers/getCalendarValue'
import rewards from './rewards'

export default React.memo(function ReleaseNotesDecember2020(props) {
  return (
    <>
      <>
        <p>
          It’s almost holiday season already, and Sheepyard is gifting us of a
          small release with balance changes, exclusive offer and an Advent
          Calendar! Be sure to tune in on a daily basis for some juicy rewards!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#daily-check-in-calendar'>Daily check-in calendar</Link>
          </li>
          <li>
            <Link href='#black-friday-offers'>Black Friday offers</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

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
          <li>
            <CardLink id='N80' /> see their strength increased to 3/4/5/6/7
            (from 2/3/3/4/5).
          </li>
          <li>
            <CardLink id='N48' /> can no longer freely cast spells costing more
            than her own cost.
          </li>
          <li>
            <CardLink id='N36' /> now require 3 surrounding enemies to proc (up
            from 2).
          </li>
          <li>
            <CardLink id='S23' /> see their strength increased to 8/9/11/13/15
            (from 7/8/10/12/15).
          </li>
          <li>
            <CardLink id='S27' /> see their strength increased to 4/5/6/8/10
            (from 4/5/6/7/8) and their ability now procs on equal and lower
            strength units (from only lower strength).
          </li>
        </ul>

        <NerfCompensationInfo />

        <Title id='daily-check-in-calendar'>Daily check-in calendar</Title>

        <p>
          Who doesn’t like a good Advent Calendar full of goodies during the
          month of December? Get ready for the Stormbound Advent Calendar, named
          “Daily Check-in Calendar” in the game.
        </p>

        <p>
          Here is the idea: every day of December 2020, you will be rewarded
          with a small gift provided you log into the game. Gifts vary from
          coins, rubies and fusion stones, to individual cards and even books!
          If you do not log in on a given day, that reward is lost forever, but
          you can still come back the days after for the next ones.
        </p>

        <p>
          For players who are willing to spend a few bucks into the game, you
          can buy a <span className='Highlight'>Premium Pass</span> for $9.99 to
          have additional rewards. You can buy this pass at any point in
          December and will unlock all past premium daily rewards immediately.
        </p>

        <p>
          It is important to note that the Premium pass grants{' '}
          <span className='Highlight'>both</span> the free reward{' '}
          <span className='Highlight'>and</span> the premium reward for every
          single day you log in.
        </p>
      </>

      <Page.Embed>
        <Image
          src='/assets/images/releases/calendar.png'
          alt='Daily check-in calendar featuring daily rewards and days were said rewards were skipped'
        />
      </Page.Embed>

      <>
        <p>
          This is the total value for the Advent calendar, free and premium
          respectively (including free rewards within the premium one):{' '}
        </p>
        <ul>
          <li>
            Total free rewards:{' '}
            {displayBundle(getCalendarValue(rewards, 'FREE'))}
          </li>
          <li>
            Total Premium (including free) rewards:{' '}
            {displayBundle(getCalendarValue(rewards, 'PREMIUM'))}
          </li>
        </ul>

        <RewardsTable rewards={rewards} />

        <Title id='black-friday-offers'>Black Friday offers</Title>

        <p>
          Like most holiday events, there will be some one-time only special
          offers for people willing to put some money into the game. The Black
          Friday exclusive packs will be available from November 24th (9AM CET)
          until November 30th (end of day) so be sure to jump on them!
        </p>

        <ul>
          <li>
            <span className='Highlight'>Raining Cats</span> ($9.99): guaranteed
            3 copies of each of the 6 rare and epic felines + 3 Classic Tomes
          </li>
          <li>
            <span className='Highlight'>Edrik’s Army</span> ($19.99): 2 copies
            of <CardLink id='N59' /> + 18 cards{' '}
            <Footnote id='most-played-cards'>
              amongst the most played across the last 3 months globally
            </Footnote>
          </li>
          <li>
            <span className='Highlight'>Emblem of Heroism</span> ($49.99): 35
            Heroic Tomes
          </li>
          <li>
            <span className='Highlight'>The Greatest Treasure</span> ($99.99):
            30 cards from each rarity + <Rubies amount={1000} /> +{' '}
            <Coins amount={5000} />
          </li>
        </ul>

        <p>
          On top of that, <span className='Highlight'>all books</span> (but
          Noble) will yield an extra card until the end of the Black Friday
          event. Similarly, the paid bundles yield coins and rubies will also
          grant more resources for the duration of the Black Friday event.
        </p>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer:
                'The balance changes will be effective with the season reset on December 1st. The premium pass will become available at that date as well. The Black Friday offers will be available from November 24th (9AM CET) until November 30th (end of day).',
            },
            {
              id: 'daily-checkin-calendar',
              question:
                'Will the daily check-in calendar be a monthly thing from now on?',
              answer:
                'This is currently undecided. It is not impossible we will keep a similar concept in the future, most likely with fewer rewards however. Time will tell.',
            },
          ]}
        />

        <HorizontalRule />

        <Footnotes>
          <p id='most-played-cards'>
            (*) The most played cards globally across the last 3 months are:
            Execution, Gifted Recruits, Veterans of War, Felflares, Dreadfauns,
            Doppelbocks, Green Prototypes, Summon Militia, Personal Servers,
            Warfront Runners, Confinement, Windmakers, The Hearth, Twilight
            Prowlers, Call For Aid, Bladestorm, Frozen Core and Crimson Sentry.{' '}
            <Link href='#most-played-cards' aria-label='Back to content'>
              ↩
            </Link>
          </p>
        </Footnotes>
      </>
    </>
  )
})
