import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Page from '~/components/Page'
import CardLink from '~/components/CardLink'
import CheapenedBrawl from '~/components/CheapenedBrawl'
import FAQSection from '~/components/FAQSection'
import Image from '~/components/Image'
import Info from '~/components/Info'
import {
  Rare,
  Epic,
  Legendary,
  Coins,
  Rubies,
  Stones,
} from '~/components/Resource'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import RewardsTable from '~/components/RewardsTable'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import displayBundle from '~/helpers/displayBundle'
import getCalendarValue from '~/helpers/getCalendarValue'
import rewards from './rewards'

export default React.memo(function ReleaseNotesEndOf2020(props) {
  const { css } = useFela()
  const [isTableExpanded, expandTable] = React.useState(false)

  return (
    <>
      <>
        <p>
          It’s almost the end of the year already (and what a year it’s been,
          honestly…), and Sheepyard is gifting us with a small release with
          balance changes, exclusive offer and some UI improvements!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened Brawl</Link>
          </li>
          <li>
            <Link href='#daily-check-in-calendar'>Daily check-in calendar</Link>
          </li>
          <li>
            <Link href='#exclusive-offers'>Exclusive offers</Link>
          </li>
          <li>
            <Link href='#ui-improvements'>UI improvements</Link>
          </li>
          <li>
            <Link href='#faq'>FAQ</Link>
          </li>
        </TableOfContents>

        <Info icon='gift' title='Merry Christmas'>
          <p>
            You will be rewarded <Coins amount={300} /> and{' '}
            <Rubies amount={30} /> upon login this week. While I have your
            attention, please wear a mask and avoid unnecessary
            travels—especially if you live in an area with rampant COVID-19
            cases. It takes everyone’s effort to slow down this pandemic. Do the
            right thing. 🙏
          </p>
        </Info>

        <Title id='balance-changes'>Balance changes</Title>
        <p>
          This release, like any other, brings some balance changes for the new
          season starting on January 1st, including a new mechanic—
          <span className={css({ color: '#24e071' })}>vitality</span>.
        </p>

        <p>
          Vitality is essentially a reverse poison: not only does it heal
          poison, but it also buffs units by 1 strength at the beginning of
          every turn. Similarly, poison cancels vitality. Both of them are not
          subject to cancelation via freeze.
        </p>

        <ul>
          <li>
            <CardLink id='S10' /> now costs 4 mana (up from 3) and will randomly
            dispatch the leftover damage amongst all surrounding units and
            structures (bases excluded).
          </li>
          <li>
            <CardLink id='S19' /> now vitalizes the friendly units he flies
            over.
          </li>
          <li>
            <CardLink id='N15' /> now vitalizes the target and buffs for
            2/3/4/5/6 (down from 3/4/5/6/7).
          </li>
          <li>
            <CardLink id='F19' /> no longer need to be bordering a dragon to
            activate their ability.
          </li>
          <li>
            <CardLink id='W28' /> costs 5 mana (up from 4) and no longer need
            the enemy units in front to be weaker.
          </li>
          <li>
            <CardLink id='I8' />
            ’s base strength is now 2/2/3/3/3 (up from 1/1/2/2/3), and their
            ability grants 1/2/2/3/4 (down from 2/3/3/4/5).
          </li>
        </ul>

        <Info icon='heart' title='Nerf compensation'>
          <p>
            Owners of Linked Golems will be compensated proportionally to the
            level of the card: <Coins amount='0/15/40/120/250' /> and{' '}
            <Stones amount='0/2/5/10/20' />.
          </p>
        </Info>

        <CheapenedBrawl ratio={1 / 2} difficulty='LEGACY'>
          <p>
            Similar to{' '}
            <Link to='/releases/11-2020#cheapened-braawl'>
              what happened in November
            </Link>
            , the Brawl starting on December 24th (and only that one) is going
            to be cheaper. All fight will cost 50% of their original price.
          </p>
        </CheapenedBrawl>

        <Title id='daily-check-in-calendar'>Daily check-in calendar</Title>

        <p>
          The daily check-in calendar will pursue in January. It will work
          exactly like the{' '}
          <Link to='/releases/12-2020#daily-check-in-calendar'>
            Advent Calendar from December
          </Link>{' '}
          and will cost only $5 to boost to Premium.
        </p>

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

        <Title id='exclusive-offers'>Exclusive offers</Title>
        <p>
          Like most holiday events, there will be some one-time only special
          offers for people willing to put some money into the game. The
          Christmas exclusive packs will be available from December 21st (9AM
          CET) until December 27th (end of day) so be sure to jump on them!
        </p>

        <ul>
          <li>
            <span className='Highlight'>Christmas Tree Pack</span> ($9.99): 3
            Mythic Tomes + 2 Heroic Tomes + 1 Classic Tome +{' '}
            <Coins amount={500} />
          </li>
          <li>
            <span className='Highlight'>Helpful Elf pack</span> ($19.99):{' '}
            <Rare amount={20} /> + <Epic amount={15} /> +{' '}
            <Legendary amount={10} />
          </li>
          <li>
            <span className='Highlight'>Santa Edrik pack</span> ($49.99):{' '}
            <Coins amount={6500} /> + <Rubies amount={650} />
          </li>
        </ul>
      </>
      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/christmas_pack_1.png'
              alt='Christmas Tree Pack ($9.99): 3 Mythic Tomes + 2 Heroic Tomes + 1 Classic Tome + 500 coins'
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/christmas_pack_2.png'
              alt='Helpful Elf pack ($19.99): 20 rare cards + 15 epic cards + 10 legendary cards'
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/christmas_pack_3.png'
              alt='Santa Edrik pack ($49.99): 6,500 coins + 650 rubies'
            />
          </Row.Column>
        </Row>
      </Page.Embed>
      <>
        <p>
          On top of that, <span className='Highlight'>all books</span> will
          yield an extra card until the end of the Christmas event (end of day
          on the 27th). Books rewarded through the Brawl will not.
        </p>

        <Title id='ui-improvements'>UI improvements</Title>

        <Row isDesktopOnly>
          <Row.Column>
            <Spacing top='LARGE'>
              <p>
                Besides some minor quality-of-life improvements, the collection
                pagination has been redesigned from scratch to use a swift
                slider instead of tedious tap/click navigation.
              </p>
            </Spacing>

            <p>
              In case you missed it, a recent update also added a collection
              filter to display cards from all factions, and cards from the
              current deck’s faction + neutral. Pretty handy!
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/pagination.png'
              alt='Pagination of the card collection'
            />
          </Row.Column>
        </Row>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer:
                'The balance changes will be effective with the season reset on January 1st. The Christmas offers will be available from December 21st until December 27th (end of day).',
            },
            {
              id: 'vitality-cards',
              question: 'Will more cards benefit from vitality in the future?',
              answer:
                'Absolutely. Vitality will not be a Swarm-specific ability and will make its way to more cards after we test it with these 2 first.',
            },
          ]}
        />
      </>
    </>
  )
})
