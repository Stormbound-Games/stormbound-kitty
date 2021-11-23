import React from 'react'
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
import TableOfContents from '~/components/TableOfContents'
import {
  Coins,
  Rubies,
  Stones,
  Rare,
  Epic,
  Legendary,
} from '~/components/Resource'
import Title from '~/components/Title'
import getInitialCardData from '~/helpers/getInitialCardData'

export default React.memo(function ReleaseNotesDecember2021(props) {
  return (
    <>
      <Page.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          December bringing balance changes, a new card, some generous offers
          and various bonuses!
        </p>

        <TableOfContents>
          <li>
            <Link href='#disclaimer'>Disclaimer</Link>
          </li>
          <li>
            <Link href='#balance-changes'>Balance changes</Link>
          </li>
          <li>
            <Link href='#new-card'>New card</Link>
          </li>
          <li>
            <Link href='#card-upgrading-tutorial'>Card upgrading tutorial</Link>
          </li>
          <li>
            <Link href='#card-level-cap'>Card level ap</Link>
          </li>
          <li>
            <Link href='#christmas-offers'>Christmas offers</Link>
          </li>
          <li>
            <Link href='#cheapened-brawl'>Cheapened and special Brawl</Link>
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

        <Title id='disclaimer'>Disclaimer</Title>

        <p>
          The team is currently focusing most of its efforts onto the
          development of the upcoming{' '}
          <span className='Highlight'>Draft mode</span>. We hope to be able to
          wrap it up in January!
        </p>

        <p>
          We are also finalizing the new authentication system to let people
          sign in with their Google account or Apple ID. It will be possible to
          merge your Kongregate account to your new account (and vice versa). As
          a result, new players will no longer have to create a Kongregate
          account.
        </p>

        <Title id='balance-changes'>Balance changes</Title>

        <p>
          This release, just like any other, will bring some balance changes.
        </p>

        <ul>
          <li>
            <CardLink id='N47' />
            ’s strength is now 4/5/6/7/8 (up from 3/4/4/6/7).
          </li>
          <li>
            <CardLink id='N75' />’ ability now grants 2/2/3/3/4 (up from
            1/1/2/2/3).
          </li>
          <li>
            <CardLink id='N17' />’ strength is now 3/4/5/6/7 (up from
            3/4/4/5/6).
          </li>
          <li>
            <CardLink id='I27' />’ ability now sets strength back to 2/3/4/5/6
            strength (down from 3/4/5/6/7).
          </li>
          <li>
            <CardLink id='F8' /> now costs 2 mana at level 1 (down from 3) and
            its ability spawns 3 or 4 toads (down from 4).
          </li>
        </ul>

        <NerfCompensationInfo ids={['I27']} />

        <Title id='new-card'>New card</Title>

        <p>
          The day before Christmas (December 23rd), a new card will be released.
          It will join the few common cards with the ability to do chip damage!
        </p>
      </Page.Narrow>

      <Page.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('N91')} />
      </Page.Embed>

      <Page.Narrow>
        <Spacing top='LARGEST'>
          <p>
            As usual, there will be an exclusive pack to collect early copies of
            the new card. It will cost $9.99 and bring 10 copies of the card +{' '}
            <Stones amount={5} /> + <Coins amount={750} />. It will be available
            between December 23rd and January 1st.
          </p>
        </Spacing>

        <Image
          extend={{ marginTop: 0, marginBottom: 0 }}
          src='/assets/images/releases/pack-minion-launchers.png'
          alt='Minion Launchers pack: 10 copies of Minion Launchers + 5 Fusion Stones + 750 coins'
          withAvif
        />

        <Title id='card-upgrading-tutorial'>Card upgrading tutorial</Title>

        <p>
          Upgrading card is essential to the Stormbound experience. However, it
          is not necessarily too obvious for new players how it works.
        </p>

        <p>
          We are introducing a card upgrading tutorial for new players who have
          never upgraded any cards. The tutorial will guide them through the
          upgrading system, and will make each player have a level 2{' '}
          <CardLink id='N2' /> card at the end of it.
        </p>

        <p>
          There is a second part of the tutorial that gives out{' '}
          <Stones amount={6} />, so players can decide themselves if they want
          to level up another common card right away or keep them for later.
        </p>

        <Title id='card-level-cap'>Card level cap</Title>

        <p>
          A lot has been done to improve matchmaking over the last year, from
          algorithmic changes to base health caps. We are finally introducing a
          level cap based on the player’s league, the same way the fortress
          level cap works.
        </p>

        <ul>
          <li>Starters League: Card level capped to 2</li>
          <li>
            <span style={{ color: 'var(--iron)' }}>Iron League</span>: Card
            level capped to 2
          </li>
          <li>
            <span style={{ color: 'var(--bronze)' }}>Bronze League</span>: Card
            level capped to 2
          </li>
          <li>
            <span style={{ color: 'var(--silver)' }}>Silver League</span>: Card
            level capped to 3
          </li>
          <li>
            <span style={{ color: 'var(--gold)' }}>Gold League</span>: Card
            level capped to 3
          </li>
          <li>
            <span style={{ color: 'var(--platinum)' }}>Platinum League</span>:
            Card level capped to 5
          </li>
          <li>
            <span style={{ color: 'var(--diamond)' }}>Diamond League</span>:
            Card level capped to 5
          </li>
          <li>
            <span style={{ color: 'var(--heroes)' }}>Heroes League</span>: Card
            level capped to 5
          </li>
        </ul>

        <p>
          We hope this to be the final stone in solving the matchmaking
          difficulties once and for all, leveling the play field on a per league
          basis.
        </p>

        <Title id='christmas-offers'>Christmas offers</Title>

        <p>
          Like most holiday events, there will be some one-time only special
          offers for people willing to put some money into the game. The
          Christmas exclusive packs will be available from December 20th (9AM
          CET) until the end of the next Brawl!
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
            <span className='Highlight'>Christmas Brawl pack</span> ($19.99): 15
            copies of <CardLink id='N91' /> + a special avatar +{' '}
            <Rubies amount={200} /> + <Stones amount={10} />
          </li>
          <li>
            <span className='Highlight'>Santa Edrik pack</span> ($49.99):{' '}
            <Coins amount={6500} /> + <Rubies amount={650} />
          </li>
          <li>
            <span className='Highlight'>Sapphire Bundle</span> ($6.99): 1 book
            of Temples + <Stones amount={25} />. This one pack can be bought as
            many times as desired!
          </li>
        </ul>
      </Page.Narrow>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/christmas_pack_1.png'
              alt='Christmas Tree Pack ($9.99): 3 Mythic Tomes + 2 Heroic Tomes + 1 Classic Tome + 500 coins'
            />
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/christmas_pack_2.png'
              alt='Helpful Elf pack ($19.99): 20 rare cards + 15 epic cards + 10 legendary cards'
            />
          </Row.Column>
        </Row>
        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/christmas_pack_3.png'
              alt='Santa Edrik pack ($49.99): 6,500 coins + 650 rubies'
            />
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/christmas_pack_4.png'
              alt='Sapphire Bundle pack ($6.99): 1 Book of Temples + 25 Fusion Stones'
            />
          </Row.Column>
        </Row>
      </Page.Embed>

      <Page.Narrow>
        <p>
          On top of that, <span className='Highlight'>all books</span>{' '}
          (including Noble, but not the Humble book) will yield an extra card
          until the end of the Christmas event. Similarly, the paid bundles
          yielding coins and rubies will grant{' '}
          <span className='Highlight'>+30% more resources</span> for the
          duration of the Christmas event.
        </p>

        <CheapenedBrawl ratio={0.5} title='Cheapened and special Brawl'>
          <p>
            Similar to previous events, the Brawl starting on Christmas 20th
            (and only that one) is going to be cheaper. All fights will be 50%
            off. Owners of the Premium Pass will also have their usual discount
            applied, leading to a 60% reduction.
          </p>

          <p>
            Something quite unique about this Brawl will be the introduction of
            a new modifier (in all difficulties). A 0-mana cost level 1 (unless
            owned and leveled) <CardLink id='N91' /> card will be added to
            everyone’s deck (thus causing all decks to have 13 cards).
          </p>
        </CheapenedBrawl>

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
                  usual. The Christmas event itself (on which all the exclusive
                  offers and bonuses are bound) will start on Christmas 20th and
                  end with the next Brawl, on the following Sunday.
                </>
              ),
            },
          ]}
        />
      </Page.Narrow>
    </>
  )
})
