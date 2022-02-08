import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Guide from '~/components/Guide'
import Image from '~/components/Image'
import Info from '~/components/Info'
import Only from '~/components/Only'
import Page from '~/components/Page'
import {
  Coins,
  Stones,
  Common,
  Rare,
  Epic,
  Legendary,
} from '~/components/Resource'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Table from '~/components/Table'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'

export default React.memo(function GuideDraft(props) {
  const { css } = useFela()

  return (
    <>
      <Page.Narrow>
        <p>
          Draft was added early 2022 as a new game mode which, unlike Brawl, is
          made for everyone by putting every player on a level-playing field,
          regardless of their Fortress Level or card collection.
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

        <Title id='synopsis'>Synopsis</Title>

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
        <Title id='terminology'>Terminology</Title>

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

        <Title id='how-to-enter'>How to enter</Title>

        <p>
          Only players with at least 11 base health can participate in the draft
          mode.
        </p>

        <p>
          A draft session costs 1 “entry card”. Entry cards are special
          resources which are necessary to start a draft session. A player can
          have a maximum of 3 entry cards at a given time — that’s the upper cap
          for that resource and they do not expire so they can be saved from one
          week to the next. Entry cards can be obtained the following ways:
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

        <Title id='rewards'>Rewards</Title>

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

        <Title id='matchmaking'>Matchmaking</Title>

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

        <Title id='drafting-a-deck'>Drafting a deck</Title>

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
        <Title id='leveling-up-cards'>Leveling up cards</Title>

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

        <Title id='replacing-cards'>Replacing cards</Title>

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
      </Page.Narrow>
    </>
  )
})
