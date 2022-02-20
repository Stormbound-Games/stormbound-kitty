import React from 'react'
import Link from '~/components/Link'
import Footnotes, { Footnote } from '~/components/Footnotes'
import Info from '~/components/Info'
import ResourceIcon from '~/components/ResourceIcon'
import { Coins, Rubies, Stones } from '~/components/Resource'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import { RARITY_COPIES } from '~/constants/game'
import CARDS from '~/data/cards'

const THOUSANDS = /\B(?=(\d{3})+(?!\d))/g

const countCopiesForRarity = rarity =>
  (
    CARDS.filter(card => card.rarity === rarity).length *
    RARITY_COPIES[rarity].copies.reduce((a, b) => a + b, 1)
  )
    .toString()
    .replace(THOUSANDS, ',')

export default React.memo(function GuideResources(props) {
  return (
    <>
      <p>
        In this guide, I would like to give some insights on how to best manage
        the resources in this game. This is a work-in-progress and will be
        expanded on in the near future.This guide is based on the July 2020
        update.
      </p>

      <TableOfContents>
        <li>
          <Link href='#resources'>Resources</Link>
          <ul>
            <li>
              <Link href='#coins'>Coins</Link>
            </li>
            <li>
              <Link href='#rubies'>Rubies</Link>
            </li>
            <li>
              <Link href='#fusion-stones'>Fusion Stones</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href='#income'>Income</Link>
          <ul>
            <li>
              <Link href='#general'>General</Link>
            </li>
            <li>
              <Link href='#exchanging'>Exchanging</Link>
            </li>
            <li>
              <Link href='#hoarding'>Hoarding</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href='#spending'>Spending</Link>
          <ul>
            <li>
              <Link href='#setting-a-goal'>Setting a goal</Link>
            </li>
            <li>
              <Link href='#reaching-diamond-1'>Reaching Diamond 1</Link>
            </li>
            <li>
              <Link href='#full-collection-level-5'>
                Full collection level 5
              </Link>
            </li>
          </ul>
        </li>
      </TableOfContents>

      <Info icon='equalizer' title='Income calculator'>
        <p>
          Find a handy <Link to='/calculators/income'>income calculator</Link> (
          <span className='Highlight'>
            up-to-date with the July economy changes
          </span>
          ) to compute how many resources (coins, rubies, fusion stones and
          cards) you get on a daily, weekly, monthly or yearly basis based on
          your playstyle.
        </p>
      </Info>

      <Title id='resources'>Resources</Title>

      <h3 id='coins'>
        <ResourceIcon resource='COIN' /> Coins
      </h3>

      <p>Coins are available through several different means:</p>
      <ul>
        <li>
          Tier 1 and 3 daily missions (<Coins amount={100} /> for tier 1 +{' '}
          <Coins amount={150} /> for tier 3, where the odds of having coins as a
          reward are 6 to 10).
        </li>
        <li>
          Daily victories (<Coins amount={25} /> in Heroes ,{' '}
          <Coins amount={20} /> in Diamond , <Coins amount={15} /> in Platinum ,{' '}
          <Coins amount={10} /> in other leagues, doubled when watching an ad or
          having a Premium Pass) with{' '}
          <Footnote id='coins-tip'>
            a maximum of <Coins amount={400} /> a day
          </Footnote>{' '}
          or <Coins amount={700} /> in case of Premium Pass).
        </li>
        <li>
          First daily victory bonus (<Coins amount={30} />)
        </li>
        <li>
          Monthly season chests (<Coins amount={150} /> in Iron,{' '}
          <Coins amount={300} /> in Bronze, <Coins amount={500} /> in Silver,{' '}
          <Coins amount={800} /> in Gold, <Coins amount={1200} /> in Platinum,{' '}
          <Coins amount={1500} /> in Diamond, <Coins amount={2000} /> in
          Heroes).
        </li>
        <li>Victory bonuses in the Brawl.</li>
        <li>
          Tier 3, 5 and 6 rewards in Draft, or all tiers with the Premium Pass.
        </li>
        <li>
          Duplicate copies above level 5 (<Coins amount={15} />,{' '}
          <Coins amount={30} />, <Coins amount={70} /> or <Coins amount={150} />{' '}
          depending on the rarity of the card).
        </li>
        <li>Shop purchases as part of bundles.</li>
      </ul>

      <h3 id='rubies'>
        <ResourceIcon resource='RUBY' /> Rubies
      </h3>

      <p>Rubies are available through several different means:</p>
      <ul>
        <li>
          Tier 2 daily missions (<Rubies amount={5} />
          ).
        </li>
        <li>
          Monthly season chests (<Rubies amount={5} /> in Bronze,{' '}
          <Rubies amount={10} /> in Silver, <Rubies amount={20} /> in Gold,{' '}
          <Rubies amount={30} /> in Platinum, <Rubies amount={50} /> in Diamond,{' '}
          <Rubies amount={70} /> in Heroes).
        </li>
        <li>
          Weekly Casual Brawl (<Rubies amount={5} /> at Milestone 3,{' '}
          <Rubies amount={15} /> at Milestone 5, <Rubies amount={60} /> at
          Milestone 8 and <Rubies amount={200} /> at Milestone 10).
        </li>
        <li>
          Weekly Warrior Brawl (<Rubies amount={125} /> at Milestone 8 and{' '}
          <Rubies amount={500} /> at Milestone 10).
        </li>
        <li>
          Weekly Ultimate Brawl (<Rubies amount={5} /> at Milestone 2 and{' '}
          <Rubies amount={250} /> at Milestone 8).
        </li>
        <li>Victory bonuses in the Brawl.</li>
        <li>Shop purchases as part of bundles or rubies only.</li>
      </ul>

      <h3 id='fusion-stones'>
        <ResourceIcon resource='STONE' /> Fusion Stones
      </h3>

      <p>Fusion Stones are available through several different means:</p>
      <ul>
        <li>
          Tier 3 daily missions (<Stones amount={2} />, where the odds of having
          fusion stones as a reward are 4 to 10).
        </li>
        <li>
          Weekly Casual Brawl (<Stones amount={1} /> at Milestone 4,{' '}
          <Stones amount={7} /> at Milestone 7).
        </li>
        <li>
          Weekly Warrior Brawl (<Stones amount={4} /> at Milestone 4,{' '}
          <Stones amount={20} /> at Milestone 7).
        </li>
        <li>
          Weekly Ultimate Brawl (<Stones amount={10} /> at Milestone 4,{' '}
          <Stones amount={50} /> at Milestone 7, <Stones amount={200} /> at
          Milestone 10).
        </li>
        <li>
          Heroes Leaderboard (<Stones amount={100} /> for Top 1,{' '}
          <Stones amount={50} /> for Top 10, <Stones amount={25} /> for Top 100,{' '}
          <Stones amount={10} />
          for Top 500).
        </li>
        <li>Victory bonuses in the Brawl.</li>
        <li>
          Tier 1 through 6 rewards in Draft, or all tiers with the Premium Pass.
        </li>
        <li>
          <Link to='/calculators/books'>Sometimes in books</Link>.
        </li>
        <li>Shop purchases as part of bundles.</li>
      </ul>

      <Title id='income'>Income</Title>

      <h3 id='general'>General</h3>

      <p>
        Have a look at the{' '}
        <Link to='/calculators/income'>income calculator</Link> to know how your
        playstyle affects your income. The general advice here is to at least do
        these 2 things:
      </p>

      <ol>
        <li>Open your daily free Humble book for a random card.</li>
        <li>
          Complete your daily missions. Find some people to play with to easily
          complete the tougher missions.
        </li>
      </ol>

      <p>
        Playing on mobile can greatly reduce the time it takes to maximize coins
        through wins, especially with a solid rush deck for this. Ultimate Brawl
        typically isn’t worth the costs beyond Milestone 5 (Mythic Tome) and
        even then you would want to achieve at least a win-rate of 50% (roughly{' '}
        <Coins amount={1780} />
        ).
      </p>

      <h3 id='exchanging'>Exchanging</h3>

      <p>
        Exchanging resources such as <ResourceIcon resource='RUBY' /> rubies for{' '}
        <ResourceIcon resource='COIN' /> coins is generally not worth it. The
        conversion rates are bad and you will most likely find a better use for
        the resource. Duplicate cards at level 5 used to be exchanged for{' '}
        <ResourceIcon resource='STONE' /> fusion stones instead of coins. There
        is some indication this might change again in the future so it is
        recommended you hold on to your duplicates for now.
      </p>

      <h3 id='hoarding'>Hoarding</h3>

      <p>
        If you’re planning on playing Stormbound for a while it is always
        advisable to set aside some resources for sales, offers and certain
        cards or books you might want to get in the shop. It has happened in the
        past that books were temporarily cheaper and people who had saved a lot
        of rubies made good deals.
      </p>

      <Info title='Community rewards' icon='crown'>
        <p>
          There are several rewards handed out in community tournaments and
          social media engagement competitions. Please refer to the official
          Stormbound social channels and the Discord server for more
          information.
        </p>
      </Info>

      <Title id='spending'>Spending</Title>

      <p>
        How to best spend your resources depends on how you want to play the
        game. Casual play or goal orientated. In terms of goals, Stormbound can
        be broken down into a few main ones:
      </p>

      <ul>
        <li>Reaching the top league (Heroes League)</li>
        <li>
          Completing one’s collection (having at least one copy of each card)
        </li>
        <li>Bringing full collection to level 5</li>
      </ul>

      <p>
        I’ll outline the best strategy for using your resources for each goal.
      </p>

      <h3 id='casual-play'>Casual play</h3>

      <p>
        If you’re looking to just play when you can and are not hell-bend on any
        specific goal or grinding resources there is still some advice on how to
        use your time and resources efficiently.
      </p>
      <p>
        This game is all about creating decks. For that, a bigger collection is
        better. The best way to grow your collection fairly evenly in the
        beginning is by buying Noble books, Heroic Tomes and opening your daily
        Humble Book.
      </p>

      <p>
        Once you have most common and rare cards, you could consider keeping
        some <ResourceIcon resource='COIN' /> coins and{' '}
        <ResourceIcon resource='RUBY' /> rubies aside to buy singular cards in
        the shop or save up <ResourceIcon resource='RUBY' /> rubies for a Mythic
        book. You’ll have a feel for the cards and maybe also have some favorite
        cards and/or factions to buy more specific copies from. Please refer to
        the section below for some recommended cards or have a look at the{' '}
        <Link to='/list/ranked'>tier list</Link> to see which cards have high
        value in this game.
      </p>

      <p>
        I advise you to hold on to your <ResourceIcon resource='STONE' /> fusion
        stones until you have good candidate to upgrade it on. This will
        probably be a legendary card as you cannot ever buy those specifically
        in the shop. Crafting a card you haven’t gotten yet greatly diminishes
        the value of <ResourceIcon resource='STONE' /> fusion stones, so think
        twice about doing that.
      </p>

      <p>
        Upgrading cards can get costly so be mindful of what you upgrade. It is
        not a great idea to try and upgrade everything but rather focus on the
        cards you use. If you cannot play much, make sure you open your daily
        free card and aim to complete your daily missions, favoring the{' '}
        <Coins amount={150} /> mission over the <Stones amount={2} /> mission
        (each mission can be re-rolled once a day before completing).
      </p>

      <h3 id='reaching-diamond-1'>Reaching Heroes League</h3>

      <p>
        Solely reaching the top-league can be achieved within 6 months of
        starting the game if planned correctly. It would be best to focus on a
        single (cheap) deck to do so. Read{' '}
        <Link to='/guides/d1-with-sf-commons'>
          Kitty’s guide on achieving it with a mostly common SF deck
        </Link>
        , or try out <Link to='/guides/reckless-rush'>Reckless Rush</Link>
        ’s deck.
      </p>
      <p>
        The reason why a cheap deck, i.e. low rarity cards, is best is because
        you need higher level cards in order to be able to compete in the
        Diamond and Heroes leagues (and to some extent the Platinum league). It
        can take a long time to find the right copies of epic and legendary
        cards, and the latter are hard to come by, so for getting to Diamond 1
        fast it is highly recommended to build a deck without.
      </p>
      <p>
        Resource-wise it is simple: buy Noble Books until you have most cards in
        the deck and then focus on buying copies of those cards when they appear
        in the shop. Save <ResourceIcon resource='RUBY' /> rubies for any epic
        card copies you might have in your deck, and with a high surplus buy
        Heroic Tomes.
      </p>
      <p>
        Leave Brawls beyond Milestone 1 aside as it is costly, the many
        modifiers will probably make your deck less competitive and the rewards
        are skewed towards higher tier cards. That being said,{' '}
        <Link to='/deck/3xn1n2s1n3s24s2n67s6n24n15s8s11/detail'>
          Reckless Rush
        </Link>
        ’s deck does perform well in several current Brawl modifiers. However,
        even then it is probably not worth trying to go any further than the{' '}
        fourth milestone.
      </p>

      <h3 id='full-collection-level-5'>Full collection level 5</h3>

      <p>
        This goal is a lot harder to achieve than the other two. Consider the
        following. The amount of cards needed for each rarity tier is:
      </p>
      <ul>
        <li>Common: {countCopiesForRarity('common')} copies</li>
        <li>Rare: {countCopiesForRarity('rare')} copies</li>
        <li>Epic: {countCopiesForRarity('epic')} copies</li>
        <li>Legendary: {countCopiesForRarity('legendary')} copies</li>
      </ul>

      <p>
        Upgrading your full collection to level 5 costs{' '}
        <Coins amount={CARDS.filter(card => !card.token).length * 1450} />,
        which would take you at least a year of max grind to save up, including
        in-game rewards and no Brawl.
      </p>
      <p>
        Since Sheepyard has taken over development of the game, it’s very likely
        the game’s collection and economy will change before you get to complete
        your collection. I recommend not going straight for the complete level 5
        collection goal because the grind will be very long and arduous (getting
        max coins each day will require about 2.5 hours game play on mobile, and
        about 4 hours on Steam).
      </p>
      <p>
        However, there are two tools on this website that can greatly help in
        getting you to complete your collection should you want to shoot for it.
        Uploading your <Link to='/collection'>collection</Link>, and using the
        <Link to='/calculators/income'>income calculator</Link>. With those you
        can see how many more cards you need of each rarity and how to adjust
        your income to match that. You might find for instance it’s better for
        you to buy Heroic Tomes rather than Mythic Tomes (since the way the
        cards are distributed and generally rewarded makes the rare cards the
        hardest to complete). You might find preferring{' '}
        <ResourceIcon resource='STONE' /> fusion stones missions better than the{' '}
        <ResourceIcon resource='COIN' /> coins missions if you’ve saved up
        enough and looking for final copies.
      </p>

      <p>
        How you’ve gone about building your collection thusfar affects what’s
        the best income strategy for you.
      </p>

      <Footnotes>
        <p id='coins-tip'>
          (*) It is technically possible to earn <Coins amount={415} /> from
          battles per day despite the coins cap. To do so, reach{' '}
          <Coins amount={395} /> then win another game (with ads), bringing the
          total to 415.{' '}
          <Link href='#coins-tip-ref' aria-label='Back to content'>
            ↩
          </Link>
        </p>
      </Footnotes>
    </>
  )
})
