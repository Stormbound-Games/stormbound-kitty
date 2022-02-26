import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import CardLink from '~/components/CardLink'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import CheapenedBrawl from '~/components/CheapenedBrawl'
import FAQSection from '~/components/FAQSection'
import Image from '~/components/Image'
import Info from '~/components/Info'
import NerfCompensationInfo from '~/components/NerfCompensationInfo'
import Row from '~/components/Row'
import {
  Rare,
  Epic,
  Legendary,
  Coins,
  Rubies,
  Stones,
} from '~/components/Resource'
import ResourceIcon from '~/components/ResourceIcon'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function ReleaseNotesApril2021(props) {
  return (
    <>
      <>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          April, bringing balance changes, new cards, new avatars, some UI
          improvements and some exclusive offers as usual!
        </p>

        <TableOfContents>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-card'>New card</Link>
          </li>
          <li>
            <Link href='#heroes-league-improvements'>
              Heroes League improvements
            </Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened Brawl</Link>
          </li>
          <li>
            <Link href='#exclusive-offers'>Exclusive offers</Link>
          </li>
          <li>
            <Link href='#new-login-system'>New login system</Link>
          </li>
          <li>
            <Link href='#qol-improvements'>Quality of Life improvements</Link>
          </li>
          <li>
            <Link href='#new-avatars'>New avatars</Link>
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
            <CardLink id='N8' /> no longer has movement (down from 1).
          </li>
          <li>
            <CardLink id='N79' /> now cost 3 mana (down from 5) and have
            3/4/5/6/7 strength (down from 5/6/7/9/11).
          </li>
          <li>
            <CardLink id='N35' />
            ’s ability now only considers each unique surrounding{' '}
            <span className='Highlight'>primary</span> unit types. For instance,{' '}
            <CardLink id='F27' /> would be considered Ravens only in such case,
            not Elders. <CardLink id='N76' /> is treated as an Elder only, not a
            Hero.
          </li>
        </ul>

        <NerfCompensationInfo />

        <Title id='new-card'>New card</Title>

        <p>
          Yet another temple will make its entrance in April, the Temple of
          Life, a new rare structure from Winterpact.
        </p>
      </>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('W29')} />
      </Page.Embed>

      <>
        <Row isDesktopOnly extend={{ alignItems: 'center' }}>
          <Row.Column>
            <Image
              src='/assets/images/releases/pack_temple_of_life.png'
              alt='Temple of Life pack ($9.99): 5 copies of Temple of Life, 5 fusions stones and 750 coins'
              withAvif
            />
          </Row.Column>
          <Row.Column>
            <p>
              As usual, there will be an exclusive pack to quickly get access to
              some copies of the new card between April 9th and April 16th.
            </p>
            <p>
              It will cost $9.99, and will grant the following:{' '}
              <ResourceIcon resource='RARE' /> 5 copies of <CardLink id='W29' />
              , <Stones amount={5} /> and <Coins amount={750} />.
            </p>
          </Row.Column>
        </Row>

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
            The <ResourceIcon resource='HERO_CROWN' /> Hero Crowns gains and
            losses after a battle often felt too high.
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
            more balanced. The <ResourceIcon resource='HERO_CROWN' /> Hero
            Crowns will be used to match players in Heroes League, and players’
            league and cards level within their played deck will be taken into
            account in any other league.
            <br />
            As a result, we hope to build a system where gold farmers are more
            likely to be matched with other gold farmers instead of people who
            are trying to climb. Additionally, the difference in{' '}
            <ResourceIcon resource='HERO_CROWN' /> Hero Crowns in Heroes League
            matches should be lower.
          </li>

          <li>
            When a Heroes League player gets matched with a Diamond player, the
            Diamond’s player amount of <ResourceIcon resource='HERO_CROWN' />{' '}
            Hero Crowns is assumed to be 1000. This should decrease the{' '}
            <ResourceIcon resource='HERO_CROWN' /> Hero Crowns losses/gains in
            such matches.
          </li>
        </ol>

        <p>
          We hope these improvements are enough to make the Heroes League more
          enjoyable to everyone. In any case, we are going to analyze data and
          listen to your feedback within the next few weeks to see how it feels.
          We have a few other improvement ideas if needed.
        </p>

        <Title id='cheapened-brawl'>Cheapened Brawl</Title>
        <p>
          Similar to{' '}
          <Link to='/releases/11-2020#cheapened-braawl'>
            what happened in November
          </Link>
          , the Brawl starting on April 1st (and only that one) is going to be
          cheaper. All fight will cost 50% of their original price.
        </p>
        <CheapenedBrawl ratio={1 / 2} difficulty='LEGACY' />

        <Title id='exclusive-offers'>Exclusive offers</Title>

        <p>
          As usual, exclusive packs will be available from April 1st until April
          5th:
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
      </>

      <Page.Embed>
        <Row isDesktopOnly>
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
      </Page.Embed>

      <>
        <p>
          On top of that, all rubies offer will grant additional rubies between
          April 1st and April 5th (end of day), respectively +5%, +10%, +15%,
          +25% and +50% rubies.
        </p>

        <Title id='new-login-system'>New login system</Title>

        <p>
          This has been a loooong time coming, but we are finally about to have
          a new login system. It’s not quite done yet, but we are hoping to see
          it live some time during the month of April.
        </p>

        <p>
          The new system will let people sign in with their Google account or
          Apple ID. It will be possible to merge your Kongregate account to your
          new account (and vice verse). As a result, new players will no longer
          have to create a Kongregate account.
        </p>

        <Info icon='hammer' title='Open beta test'>
          <p>
            We are currently considering beta-testers who will be thanked with
            in-game rewards at the end of the program. If you would like to
            volunteer, please send a message in #login-testing on{' '}
            <Link href='https://discord.gg/stormbound'>Discord</Link>. Kindly
            mention the device you use, the country you live in and your player
            ID. We can only onboard a few people, so we won’t take everyone.
          </p>
        </Info>

        <Title id='qol-improvements'>Quality of Life improvements</Title>

        <p>
          This release will also bring quite some quality of life improvements.
          In no particular order, I feel like it is worth mentioning:
        </p>
        <ul>
          <li>There will be a way to sort the friends list.</li>
          <li>Tapping a player’s ID will copy it to the clipboard.</li>
          <li>
            The <CardLink id='T15'>Ancient Token</CardLink>’s image and 3D model
            will be renewed.
          </li>
          <li>
            The Diamond 1 cap preventing to fall down the rank has been removed.
          </li>
        </ul>

        <Title id='new-avatars'>New avatars</Title>

        <p>
          There will be new avatars featuring <CardLink id='N69' />,{' '}
          <CardLink id='I2' /> and <CardLink id='N58' />, costing{' '}
          <Coins amount={1000} /> a piece. Three more avatars featuring lovely
          flowers for <Rubies amount={200} /> each.
        </p>

        <Row>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/avatar_flower_pink.png'
              alt='Cute anthromorphised pink flower'
              withAvif
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/avatar_flower_blue.png'
              alt='Cute anthromorphised blue flower'
              withAvif
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/avatar_flower_gold.png'
              alt='Cute anthromorphised orange flower'
              withAvif
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
                'The balance changes will be up with the season reset as always. The exclusive packs will be available between April 1st and April 5th. The Temple of Life pack will be available for a week starting April 9th. ',
            },
            {
              id: 'daily-check-in-calendar',
              question: 'Will there be a daily check-in calendar in April?',
              answer:
                'Yes! The daily check-in calendar will be extended in April, just like it did in March. Still $4.99 to boost to Premium.',
            },
          ]}
        />
      </>
    </>
  )
})
