import React from 'react'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CardLink from '~/components/CardLink'
import CheapenedBrawl from '~/components/CheapenedBrawl'
import Image from '~/components/Image'
import FAQSection from '~/components/FAQSection'
import Link from '~/components/Link'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import Page from '~/components/Page'
import Info from '~/components/Info'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import TableOfContents from '~/components/TableOfContents'
import { Coins, Rubies, Stones, Legendary } from '~/components/Resource'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function ReleaseNotesSeptember2021(props) {
  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          September, bringing balance changes, a new card, and a lot of generous
          offers to celebrate Stormbound’s 4th anniversary!
        </p>

        <p>
          Before we begin, let’s take a short moment to remember that the
          development team is currently quite fragmented due to well-deserved
          holidays in August and September, hence the releases being a little
          superficial. It will pick up some steam in October to deliver new
          exciting content soon!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-card'>New card</Link>
          </li>
          <li>
            <Link href='#anniversary-gifts'>Anniversary gifts</Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened Brawl</Link>
          </li>
          <li>
            <Link href='#exclusive-offers'>Exclusive offers</Link>
          </li>
          <li>
            <Link href='#qol-improvements'>Quality of life improvements</Link>
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
            <CardLink id='N80' />’ movement is now 1 (up from 0), strength is
            now 4/5/6/7/8 (up from 3/4/5/6/7) and their ability is now
            surrounding at all levels and triggers before moving instead of on
            play only. This introduces the{' '}
            <span className='Highlight'>before moving</span> mechanic, now
            available for search in deck builder and collection manager on the
            site.
          </li>
          <li>
            <CardLink id='W22' />’ ability now grants 3/4/5/6/7 (down from
            4/5/6/7/8) but is made to trigger on attack, regardless of position.
          </li>
          <li>
            <CardLink id='N43' />’ ability now triggers when played borderding
            at least 1 friendly dragon, instead of exactly 1 friendly dragon.
          </li>
          <li>
            <CardLink id='I24' />’ strength is now 5/6/7/8/9 (up from
            4/5/6/7/8).
          </li>
          <li>
            <CardLink id='N77' />
            ’s ability has been revamped to synergize with pirate cards in the
            hand of both players. The new ability at level 5 reads as such: “On
            play, draw 3 single-use non-pirate card copies from the enemy’s
            hand. If you have a pirate card in hand, reduce their mana cost by
            1.”
          </li>
        </ul>

        <NerfCompensationInfo ids={['N77']} spacing={{ top: 'LARGEST' }} />

        <Title id='new-card'>New card</Title>

        <p>
          A new card will be introduced on September 23rd:{' '}
          <span className='Highlight'>Sparkly Kitties</span>. I am beyond
          humbled getting a card dedicated to me in the game, especially on the
          4 years anniversary mark, almost 2.5 years to the day after I launched
          Stormbound-Kitty. Thank you to the team, and thank you to the
          incredible Stormbound community.
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N86')} />
      </Page.Embed>

      <>
        <p>
          The reason the card is marked as having 0 movement only to gain it on
          play is to avoid a confusing (no pun intended) movement tooltip
          in-game. If it had initial movement, the arrow would show moving
          forward twice, while this would not be the outcome.
        </p>

        <Title id='anniversary-gifts'>Anniversary gifts</Title>

        <p>
          To celebrate this special event, anyone logging into the game on
          September 18th (and only that day) will receive the following bundle:{' '}
          <Coins amount={400} />, <Rubies amount={40} />, <Stones amount={4} />{' '}
          and <Legendary amount={1}>1 random legendary car</Legendary>.
        </p>

        <p>
          On top of that,{' '}
          <span className='Highlight'>all coin gains will be doubled</span>{' '}
          between September 17th and September 20th , except for quests. The
          coin cap will also be doubled for that timeframe, reaching{' '}
          <Coins amount={800} /> for all players, and <Coins amount={1400} />{' '}
          for Premium Pass holders.
        </p>

        <p>
          Last but not least,{' '}
          <span className='Highlight'>all books will contain more cards</span>{' '}
          between September 17th and September 20th. Books normally holding 3
          cards will be contain 4, and books usually containing 6 cards (Mythic,
          Heroic and Classic) will yield 8!
        </p>

        <CheapenedBrawl ratio={0.5}>
          <p>
            Similar to previous events, the Brawl starting on September 16th
            (and only that one) is going to be cheaper. All fights will be 50%
            off. Owners of the Premium Pass will also have their usual discount
            applied, leading to a 60% reduction.
          </p>
        </CheapenedBrawl>

        <Title id='exclusive-offers'>Exclusive offers</Title>

        <p>
          For those of you willing to put a few bucks into the game and
          supporting the creators, this anniversary event will introduce 4
          special in-app purchases. They will all be available for a week from
          September 13th.
        </p>

        <Info icon='gift' title='Unboosted tomes'>
          <p>
            Please note that the books granted by the following offers will
            yield the <span className='Highlight'>normal amount of cards</span>,
            and no more. Extra cards in tomes will be exclusive to those that
            are bought with in-game resources.
          </p>
        </Info>

        <Image
          src='/assets/images/releases/4th_anniversary_packs.png'
          alt='For $4.99: 1 Mythic Tome + 100 Coins; For $19.99: 4 Mythic Tome + 4 Heroic Tomes + 500 coins; For $49.99: 10 Mythic Tomes + 10 Heroic Tomes + 10 Classic Tomes + 1500 coins; For $99.99: 20 Mythic Tomes + 20 Heroic Tomes + 20 Classic Tomes + 5000 coins + 50 fusion stones'
          withAvif
        />
      </>

      <Page.Embed>
        <Row isDesktopOnly isWideGutter>
          <Row.Column width='1/4'>
            <Spacing vertical={['NONE', 'SMALLEST']}>
              <p>The $4.99 pack will yield:</p>
              <ul>
                <li>1 Mythic Tome</li>
                <li>
                  <Coins amount={100} />
                </li>
              </ul>
            </Spacing>
          </Row.Column>
          <Row.Column width='1/4'>
            <Spacing vertical={['NONE', 'SMALLEST']}>
              <p>The $19.99 pack will yield:</p>
              <ul>
                <li>4 Mythic Tomes</li>
                <li>4 Heroic Tomes</li>
                <li>
                  <Coins amount={500} />
                </li>
              </ul>
            </Spacing>
          </Row.Column>
          <Row.Column width='1/4'>
            <Spacing vertical={['NONE', 'SMALLEST']}>
              <p>The $49.99 pack will yield:</p>
              <ul>
                <li>10 Mythic Tomes</li>
                <li>10 Heroic Tomes</li>
                <li>10 Classic Tomes</li>
                <li>
                  <Coins amount={1500} />
                </li>
              </ul>
            </Spacing>
          </Row.Column>
          <Row.Column width='1/4'>
            <Spacing vertical={['NONE', 'SMALLEST']}>
              <p>The $99.99 pack will yield:</p>
              <ul>
                <li>20 Mythic Tomes</li>
                <li>20 Heroic Tomes</li>
                <li>20 Classic Tomes</li>
                <li>
                  <Coins amount={5000} />
                </li>
                <li>
                  <Stones amount={50} />
                </li>
              </ul>
            </Spacing>
          </Row.Column>
        </Row>
      </Page.Embed>

      <>
        <p>
          On top of that,{' '}
          <span className='Highlight'>
            every Ruby bundle will yield double the original amount of rubies
          </span>
          . This is not time-bound, and effectively lasts forever until every
          bundle has been bought once.
        </p>

        <Title id='qol-improvements'>Quality of life improvements</Title>

        <p>
          This release will bring 3 neat little quality of life improvements:
        </p>

        <ul>
          <li>
            <span className='Highlight'>Search bar</span>: the deck building and
            collection screens will now have a small search bar to filter cards
            by name, ability or type. This should make it easier to compose new
            decks, especially for the Brawl.
          </li>
          <li>
            <span className='Highlight'>Shop refresh</span>: it will now be
            possible to reroll the offers from the card shop once a day by
            watching an ad (or for free for Premium Pass holders). Note that
            only the cards that have not been bought would be refreshed.
          </li>
          <li>
            <span className='Highlight'>Upcoming Brawls</span>: the Brawl mode
            will now showcase which Brawls are coming, alongside their modifiers
            and rewards to better prepare from week to the next.
          </li>
        </ul>
      </>

      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Image
            src='/assets/images/releases/double_income.png'
            alt='Anniversary event information dialog about all coins being doubled'
            width={358}
            height={640}
            lazy
          />
        </Row.Column>
        <Row.Column width='1/3'>
          <Image
            src='/assets/images/releases/shop_reroll.png'
            alt='Card shop tab information dialog offering to reroll the cards by watching an ad'
            width={358}
            height={640}
            lazy
          />
        </Row.Column>
        <Row.Column width='1/3'>
          <Image
            src='/assets/images/releases/next_brawls.png'
            alt='Brawl tab now displaying the upcoming Brawls'
            width={358}
            height={640}
            lazy
          />
        </Row.Column>
      </Row>

      <>
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
      </>
    </>
  )
})
