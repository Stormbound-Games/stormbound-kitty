import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Page from '~/components/Page'
import CardLink from '~/components/CardLink'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import FAQSection from '~/components/FAQSection'
import Footnotes, { Footnote } from '~/components/Footnotes'
import Image from '~/components/Image'
import Info from '~/components/Info'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import Row from '~/components/Row'
import RewardsTable from '~/components/RewardsTable'
import { Coins, Rubies, Stones, HeroCrowns } from '~/components/Resource'
import ResourceIcon from '~/components/ResourceIcon'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'
import displayBundle from '~/helpers/displayBundle'
import getCalendarValue from '~/helpers/getCalendarValue'
import rewards from './rewards'

export default React.memo(function ReleaseNotesMay2021(props) {
  const { css } = useFela()
  const [isTableExpanded, expandTable] = React.useState(false)

  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early May,
          bringing balance changes, new cards, a new Premium pass, some UI
          improvements and some exclusive offers as usual!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-cards'>New cards</Link>
          </li>
          <li>
            <Link href='#heroes-league-improvements'>
              Heroes League improvements
            </Link>
          </li>
          <li>
            <Link href='#new-premium-pass'>New Premium Pass</Link>
          </li>
          <li>
            <Link href='#extra-deck-slots'>Extra deck slots</Link>
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
            <CardLink id='I7' />’ ability now buff a{' '}
            <span className='Highlight'>surrounding</span> friendly dragon
            instead of any friendly dragon.
          </li>
          <li>
            <CardLink id='I23' /> now cost 6 mana (down from 7) and have
            6/7/8/10/12 strength (down from 7/8/10/12/15).
          </li>
          <li>
            <CardLink id='S9' /> now cost 3 mana (down from 4) and have
            1/2/2/3/3 strength (down from 2/3/3/5/5)
          </li>
          <li>
            <CardLink id='N37' />’ ability now deal 4/5/6/7/8 (up from
            3/4/5/6/7) and hits the closest enemy behind instead of a random
            enemy behind.
          </li>
        </ul>

        <NerfCompensationInfo ids={['I7']} />

        <Title id='new-cards'>New cards</Title>
        <p>
          Two new cards are joining the Winterpact faction, one rare structure
          and one common unit—both with freeze dynamics!
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('W31')} />
        <CardBuilderCardDisplay {...getInitialCardData('W30')} />
      </Page.Embed>

      <>
        <Row isDesktopOnly extend={{ alignItems: 'center' }}>
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
                <ResourceIcon resource='COMMON' /> 10 copies of{' '}
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
          and boosted. Its cost is increased to $7.99, but its rewards are now
          numerous:
        </p>

        <ul>
          <li>
            <span className='Highlight'>No more ads</span> for the month.
          </li>

          <li>
            The coin cap is raised to <Coins amount={700} /> for the month.
          </li>

          <li>
            The friend limit is raised to 200 (up from 100){' '}
            <Footnote id='friend-list'>for the month</Footnote>.
          </li>

          <li>
            Six extra deck slots for the month. Any extra deck after the month
            is over cannot be played, only stored or removed.
          </li>

          <li>
            10% discount on any Brawl matches. The{' '}
            <Link to='/calculators/brawl'>Brawl calculator</Link> has been
            updated to reflect this option.
          </li>

          <li>
            Increased daily check-in calendar rewards for the month, as always.
          </li>
        </ul>

        <p>
          This is the total value for the calendar, free and premium
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

        <Info icon='equalizer' title='Calculators'>
          <p>
            The <Link to='/calculators/brawl'>Brawl calculator</Link> and the{' '}
            <Link to='/calculators/income'>Income calculator</Link> have been
            updated to consider a Premium Pass (coin cap at 700 and 10% Brawl
            discount).
          </p>
        </Info>

        <Title id='extra-deck-slots'>Extra deck slots</Title>

        <p>
          On top of the 6 deck slots that can be unlocked via the Premium Pass,
          3 extra deck slots can be bought by all players for{' '}
          <ResourceIcon resource='RUBY' /> rubies.
        </p>

        <ol>
          <li>
            The first deck slot costs <Rubies amount={50} />.
          </li>
          <li>
            The second deck slot costs <Rubies amount={150} />.
          </li>
          <li>
            The third deck slot costs <Rubies amount={250} />.
          </li>
        </ol>

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

        <Footnotes>
          <p id='friend-list'>
            (*) Any friends above 100 when the Premium Pass at the end of the
            month remains in the friend list, but it is no longer possible to
            add more friends until another Premium Pass gets purchased.
            <Link href='#friend-list-ref' aria-label='Back to content'>
              ↩
            </Link>
          </p>
        </Footnotes>
      </>
    </>
  )
})
