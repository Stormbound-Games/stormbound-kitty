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
      <Page.Narrow>
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
            <CardLink id='S4' />’ ability now spawns a dragon with 4/5/6/7/8
            strength (up from 3/4/5/6/7).
          </li>
          <li>
            <CardLink id='F13' /> now costs 3 mana (down from 4) and its
            strength is now 3/4/5/6/7 (down from 4/5/5/7/8).
          </li>
          <li>
            <CardLink id='W17' />’ strength is now 7/8/9/11/13 (up from
            6/7/8/10/12).
          </li>
          <li>
            <CardLink id='W18' />’ strength is now 5/6/7/8/10 (up from
            4/5/6/7/8).
          </li>
        </ul>

        <Title id='draft-mode'>Draft mode</Title>

        <p>
          The draft mode is finally here! There is a lot to explain, so we’re
          going to do that bit by bit, so it’s digestible.
        </p>

        <TableOfContents>
          <li>
            <Link href='#synopsis'>Synopsis</Link>
          </li>
          <li>
            <Link href='#terminology'>Terminology</Link>
          </li>
          <li>
            <Link href='#how-to-enter'>How to enter</Link>
          </li>
          <li>
            <Link href='#rewards'>Rewards</Link>
          </li>
          <li>
            <Link href='#matchmaking'>Matchmaking</Link>
          </li>
          <li>
            <Link href='#drafting-a-deck'>Drafting a deck</Link>
          </li>
          <li>
            <Link href='#leveling-up-cards'>Leveling up cards</Link>
          </li>
          <li>
            <Link href='#replacing-cards'>Replacing cards</Link>
          </li>
        </TableOfContents>

        <h3 id='synopsis'>Synopsis</h3>

        <p>
          In a nutshell, the draft mode is an event where players compete in a
          series of matches with a unique deck that gets “drafted” specifically
          for the event. Cards may get swapped or upgraded after every match,
          leading to previously unseen decks and hopefully some different
          strategies from your typical ladder gameplay.
        </p>

        <p>
          The draft runs weekly from Monday to Wednesday (therefore without
          overlap with the Brawl). Each player is able to play up to 3 draft
          “sessions” in order to get rewards during that timeframe. After which,
          it is still possible to play draft mode until the event ends, but
          without rewards — just for fun (while still earning coins for
          victories, as usual).
        </p>

        <p>
          A session ends when the player wins 6 matches or loses 3 times, which
          ever comes first, leading to sessions lasting between 3 and 8 matches.
        </p>
      </Page.Narrow>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/draft_main_menu.png'
              alt='Screenshot of the main Stormbound menu showcasing a “Draft” button to enter Draft mode, and a locked “Brawl” button'
              withAvif
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/draft_main_screen.png'
              alt='Screenshot of the main Draft mode screen showcasing the current status of the Draft session'
              withAvif
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/draft_life_loss.png'
              alt='Screenshot of the loss screen showing that the player lost a life and that they only have 2 lives left'
              withAvif
            />
          </Row.Column>
        </Row>
      </Page.Embed>

      <Page.Narrow>
        <h3 id='terminology'>Terminology</h3>

        <ul>
          <li>
            <span className='Highlight'>Session:</span> A series of up to 8
            matches ending with the player having lost 3 times, or the player
            having won 6 matches, based on the same drafted deck.
          </li>
          <li>
            <span className='Highlight'>Entry card:</span> A special resource
            enabling the player to start a draft session.
          </li>
        </ul>

        <h3 id='how-to-enter'>How to enter</h3>

        <p>
          Only players with at least 11 base health can participate in the draft
          mode.
        </p>

        <p>
          A draft session costs 1 “entry card”. Entry cards are special
          resources which are necessary to start a draft session. A player can
          have a maximum of 3 entry cards at a given time — that’s the upper cap
          for that resource. Entry cards can be obtained the following ways:
        </p>
        <ul>
          <li>
            An entry card can be collected freely once a week by watching an ad
            in the card shop tab.
          </li>
          <li>
            Entry cards can be bought for a few dollars. One entry card +{' '}
            <Coins amount={100} /> costs $2.99, two entry cards +{' '}
            <Coins amount={300} /> for $4.99.
          </li>
          <li>
            An entry card can be skipped altogether by paying{' '}
            <Coins amount={600} /> to start a draft session.
          </li>
        </ul>

        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/draft_entry_card.png'
              alt='Screenshot of the shop interface showcasing the ability to watch an ad to receive an entry card for the Draft mode'
              withAvif
            />
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/draft_entry_dialog.png'
              alt='Screenshot of the entry dialog for the Draft mode asking for an entry card or 600 coins'
              withAvif
            />
          </Row.Column>
        </Row>

        <h3 id='rewards'>Rewards</h3>

        <p>
          The content of the chest retrieved at the end of a draft session
          depends on how many matches the player won, between 0 and 6 (as well
          as whether or not they own the Premium Pass). Here is the content of
          the 7 different chests:
        </p>

        <Spacing vertical='LARGE'>
          <Table>
            <thead>
              <tr>
                <th className={css({ width: '80px' })}>Wins</th>
                <th>Rewards</th>
                <th>Premium Pass extras</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={css({ width: '80px' })}>
                  0<Only.Mobile> wins</Only.Mobile>
                </td>
                <td>
                  <Common amount={2} /> + <Rare amount={1} />
                </td>
                <td>
                  <Coins amount={50} /> + <Stones amount={1} />
                </td>
              </tr>
              <tr>
                <td className={css({ width: '80px' })}>
                  1<Only.Mobile> win</Only.Mobile>
                </td>
                <td>
                  <Common amount={3} /> + <Rare amount={2} /> +{' '}
                  <Epic amount={1} /> + <Stones amount={1} />
                </td>
                <td>
                  <Coins amount={100} /> + <Stones amount={1} />
                </td>
              </tr>
              <tr>
                <td className={css({ width: '80px' })}>
                  2<Only.Mobile> wins</Only.Mobile>
                </td>
                <td>
                  <Rare amount={4} /> + <Epic amount={2} /> +{' '}
                  <Stones amount={2} />
                </td>
                <td>
                  <Coins amount={100} /> + <Stones amount={1} />
                </td>
              </tr>
              <tr>
                <td className={css({ width: '80px' })}>
                  3<Only.Mobile> wins</Only.Mobile>
                </td>
                <td>
                  <Rare amount={4} /> + <Epic amount={2} /> +{' '}
                  <Stones amount={3} /> + <Coins amount={150} />
                </td>
                <td>
                  <Coins amount={100} /> + <Stones amount={1} /> +{' '}
                  <Epic amount={1} />
                </td>
              </tr>
              <tr>
                <td className={css({ width: '80px' })}>
                  4<Only.Mobile> wins</Only.Mobile>
                </td>
                <td>
                  <Epic amount={4} /> + <Legendary amount={2} /> +{' '}
                  <Stones amount={4} />
                </td>
                <td>
                  <Coins amount={150} /> + <Stones amount={1} /> +{' '}
                  <Epic amount={1} />
                </td>
              </tr>
              <tr>
                <td className={css({ width: '80px' })}>
                  5<Only.Mobile> wins</Only.Mobile>
                </td>
                <td>
                  <Epic amount={5} /> + <Legendary amount={2} /> +{' '}
                  <Stones amount={5} /> + <Coins amount={250} />
                </td>
                <td>
                  <Coins amount={250} /> + <Stones amount={2} /> +{' '}
                  <Legendary amount={1} />
                </td>
              </tr>
              <tr>
                <td className={css({ width: '80px' })}>
                  6<Only.Mobile> wins</Only.Mobile>
                </td>
                <td>
                  <Epic amount={4} /> + <Legendary amount={3} /> +{' '}
                  <Stones amount={6} /> + <Coins amount={600} />
                </td>
                <td>
                  <Coins amount={400} /> + <Stones amount={3} /> +{' '}
                  <Legendary amount={1} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Spacing>

        <p>
          Additionally, it is worth noting that victories will yield{' '}
          <Coins amount={10} /> + an additional <Coins amount={10} /> for
          watching an ad or for having the Premium Pass, regardless of the
          league of the player.
        </p>

        <h3 id='matchmaking'>Matchmaking</h3>

        <p>
          Players are matched based on the amount of battles they have done
          within their session. So players having fought 1 time will be matched
          with other players having fought only 1 match so far.
        </p>
        <p>
          The pools widen for higher number of matches to make sure players can
          find opponents: so players played 5, 6 or 7 times are all in the same
          matchmaking pool.
        </p>

        <p>
          This is important because the base health grows throughout matches
          (regardless of their outcome). All players start at 10 base health,
          and every match increases it by 1. This means the base health can
          never go above 17 (for the last match).
        </p>

        <Image
          src='/assets/images/releases/draft_base_upgrade.png'
          alt='Screenshot of the base health increase screen after a match'
          withAvif
          extend={{ medium: { maxWidth: '50%' } }}
        />

        <h3 id='drafting-a-deck'>Drafting a deck</h3>

        <p>
          Drafting a deck is done at the beginning of the draft session and
          consists of picking a total of 12 cards, each time from a set of 3
          different options.
        </p>

        <p>
          Cards are always drafted at level 1, and all cards from the game can
          be drafted, regardless whether the player owns them or not. This truly
          puts all players on a level-playing field.
        </p>

        <p>The draws happen in that order:</p>

        <ol>
          <li>
            <Legendary amount={3} /> from different factions, resulting in a
            faction choice
          </li>
          <li>
            <Epic amount={3} /> from your faction, resulting in an archetype
            choice
          </li>
          <li>
            <Rare amount={3} /> with a mana cost of 3- from faction + neutral
          </li>
          <li>
            <Rare amount={3} /> with a mana cost of 4- from faction + neutral
          </li>
          <li>
            <Rare amount={3} /> from faction + neutral
          </li>
          <li>
            <Rare amount={3} /> from faction + neutral
          </li>
          <li>
            <Common amount={3} /> with a mana cost of 3- from faction + neutral
          </li>
          <li>
            <Common amount={3} /> with a mana cost of 4- from faction + neutral
          </li>
          <li>
            <Common amount={3} /> from faction + neutral
          </li>
          <li>
            <Common amount={3} /> from faction + neutral
          </li>
          <li>
            <Epic amount={3} /> from faction + neutral
          </li>
          <li>
            <Legendary amount={3} /> from the neutral faction
          </li>
        </ol>

        <p>
          Note that for all rolls where the pool of cards is the current faction
          + the neutral faction, there will be at least one card from your
          faction, and at least one neutral card amongst the 3. This makes sure
          a roll doesn’t offer 3 neutral or 3 faction cards.
        </p>
      </Page.Narrow>

      <Page.Embed>
        <Row isDesktopOnly>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/draft_card_pick_1.png'
              alt='Screenshot of the deck building interface, offering a choice between 3 different cards for the 1st pick'
              withAvif
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/draft_card_pick_2.png'
              alt='Screenshot of the deck building interface, offering a choice between 3 different cards for the 6th pick, with the incomplete deck shown at the bottom'
              withAvif
            />
          </Row.Column>
          <Row.Column width='1/3'>
            <Image
              src='/assets/images/releases/draft_deck_complete.png'
              alt='Screenshot of the deck building interface when the deck is complete, indicating so'
              withAvif
            />
          </Row.Column>
        </Row>
      </Page.Embed>

      <Page.Narrow>
        <h3 id='leveling-up-cards'>Leveling up cards</h3>

        <p>
          With every match, it is possible to refine the deck to make it more
          competitive. Regardless of the outcome of a match, it offers the
          ability to level up 3 cards from the deck.
        </p>

        <p>
          Which cards can be upgraded is also drafted. That means each upgrade
          gets picked amongst 3 cards. There is also some logic to avoid the
          same card being upgraded on a loop while all other cards stay level 1.
          So all in all, the deck should improve somewhat uniformly throughout a
          session.
        </p>

        <h3 id='replacing-cards'>Replacing cards</h3>

        <p>
          Losing a match also provides the ability to replace a card from the
          deck. Because of the 3 loss limit, it is only possible to replace 2
          cards in total.
        </p>

        <p>
          Which card to replace is entirely up to the player, so any of the 12
          cards can be discarded. In exchange, 3 level 1 cards from the same
          rarity get offered as options. This means replacing a leveled-up card
          will still yield a level 1 card.
        </p>

        <Row isDesktopOnly>
          <Row.Column>
            <Image
              src='/assets/images/releases/draft_card_replace_1.png'
              alt='Screenshot of the card replacement interface, offering to pick a card to replace'
              withAvif
            />
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/draft_card_replace_2.png'
              alt='Screenshot of the card replacement interface, displaying the selected card to replace with a “Remove” button to confirm'
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
              answer: <>TBA.</>,
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
      </Page.Narrow>
    </>
  )
})
