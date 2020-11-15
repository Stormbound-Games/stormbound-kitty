import React from 'react'
import { Link } from 'react-router-dom'
import Guide from '../Guide'
import Info from '../Info'
import ResourceIcon from '../ResourceIcon'
import { Coins, Stones } from '../Resource'
import Title from '../Title'
import { RARITY_COPIES } from '../../constants/game'
import cards from '../../data/cards'
import getGuide from '../../helpers/getGuide'
import './index.css'

const guide = getGuide('RESOURCES_GUIDE')
const THOUSANDS = /\B(?=(\d{3})+(?!\d))/g

const countCopiesForRarity = rarity =>
  (
    cards.filter(card => card.rarity === rarity).length *
    RARITY_COPIES[rarity].copies.reduce((a, b) => a + b, 1)
  )
    .toString()
    .replace(THOUSANDS, ',')

export default React.memo(function GuideResources(props) {
  return (
    <Guide {...guide}>
      <p>
        In this guide, I would like to give some insights on how to best manage
        the resources in this game. This is a work-in-progress and will be
        expanded on in the near future.This guide is based on the July 2020
        update.
      </p>

      <ol style={{ columns: '16em' }}>
        <li>
          <a href='#resources'>Resources</a>
          <ul>
            <li>
              <a href='#coins'>Coins</a>
            </li>
            <li>
              <a href='#rubies'>Rubies</a>
            </li>
            <li>
              <a href='#fusion-stones'>Fusion Stones</a>
            </li>
          </ul>
        </li>

        <li>
          <a href='#income'>Income</a>
          <ul>
            <li>
              <a href='#general'>General</a>
            </li>
            <li>
              <a href='#exchanging'>Exchanging</a>
            </li>
            <li>
              <a href='#hoarding'>Hoarding</a>
            </li>
          </ul>
        </li>

        <li>
          <a href='#spending'>Spending</a>
          <ul>
            <li>
              <a href='#setting-a-goal'>Setting a goal</a>
            </li>
            <li>
              <a href='#reaching-diamond-1'>Reaching Diamond 1</a>
            </li>
            <li>
              <a href='#full-collection-level-5'>Full collection level 5</a>
            </li>
          </ul>
        </li>
      </ol>

      <Info icon='wand' title='Income calculator'>
        Find a handy <Link to='/calculators/income'>income calculator</Link> (
        <span className='Highlight'>
          up-to-date with the July economy changes
        </span>
        ) to compute how many resources (coins, rubies, fusion stones and cards)
        you get on a daily, weekly, monthly or yearly basis based on your
        playstyle .
      </Info>

      <Title id='resources'>Resources</Title>

      <h3 id='coins'>
        <ResourceIcon resource='COIN' /> Coins
      </h3>

      <p>Coins are available through 5 different means:</p>
      <ul>
        <li>
          Tier 1 and 3 daily missions (100 for tier 1 + 150 for tier 3, where
          the odds of having coins as a reward are 6 to 10).
        </li>
        <li>
          Daily victories (30 extra for the first daily win, as well as 5, 10 or
          20 depending on whether the game is played on mobile or Steam, with or
          without ads—for a maximum of 400 a day*).
        </li>
        <li>
          Monthly season chests (150 in Iron, 300 in Bronze, 500 in Silver, 800
          in Gold, 1200 in Platinum, 1800 in Diamond).
        </li>
        <li>
          Duplicate copies above level 5 (15, 30, 70 or 150 depending on the
          rarity of the card).
        </li>
        <li>Shop purchases as part of bundles.</li>
      </ul>

      <Info title='Coins tip'>
        It is technically possible to earn <Coins amount={415} /> from battles
        per day despite the coins cap. To do so, reach <Coins amount={395} />{' '}
        then win another game (with ads), bringing the total to 415.
      </Info>

      <h3 id='rubies'>
        <ResourceIcon resource='RUBY' /> Rubies
      </h3>

      <p>Rubies are available through 4 different means:</p>
      <ul>
        <li>Tier 2 daily missions (5).</li>
        <li>
          Monthly season chests (5 in Bronze, 10 in Silver, 20 in Gold, 30 in
          Platinum, 50 in Diamond).
        </li>
        <li>Weekly Brawl (5 at Milestone 2, 250 at Milestone 8).</li>
        <li>Shop purchases as part of bundles or rubies only.</li>
      </ul>

      <h3 id='fusion-stones'>
        <ResourceIcon resource='STONE' /> Fusion Stones
      </h3>

      <p>Fusion Stones are available through 4 different means:</p>
      <ul>
        <li>
          Tier 3 daily missions (2, where the odds of having fusion stones as a
          reward are 4 to 10).
        </li>
        <li>
          Weekly Brawl (10 at Milestone 4, 50 at Milestone 7, 200 at Milestone
          10).
        </li>
        <li>
          <Link to='/calculators/books'>Sometimes in tomes and books</Link>.
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
        Playing on mobile can greatly reduce the time it takes to maximise coins
        through wins, especially with a solid rush deck for this. Brawl
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
        cards or books/tomes you might want to get in the shop. It has happened
        in the past that books and tomes were temporarily cheaper and people who
        had saved a lot of rubies made good deals.
      </p>

      <Info title='Community rewards' icon='crown'>
        There are several rewards handed out in community tournaments and social
        media engagement competitions. Please refer to the official Stormbound
        social channels and the Discord server for more information.
      </Info>

      <Title id='spending'>Spending</Title>

      <p>
        How to best spend your resources depends on how you want to play the
        game. Casual play or goal orientated. In terms of goals, Stormbound can
        be broken down into a few main ones:
      </p>

      <ul>
        <li>Reaching the top league (Diamond 1)</li>
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
        beginning is by buying Noble Books, Heroic Tomes and opening your daily
        Humble Book.
      </p>

      <p>
        Once you have most common and rare cards, you could consider keeping
        some <ResourceIcon resource='COIN' /> coins and{' '}
        <ResourceIcon resource='RUBY' /> rubies aside to buy singular cards in
        the shop or save up <ResourceIcon resource='RUBY' /> rubies for a Mythic
        Tome. You’ll have a feel for the cards and maybe also have some
        favourite cards and/or factions to buy more specific copies from. Please
        refer to the section below for some recommended cards or have a look at
        the <Link to='/list/ranked'>tier list</Link> to see which cards have
        high value in this game.
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
        free card and aim to complete your daily missions, favouring the{' '}
        <Coins amount={150} /> mission over the <Stones amount={2} /> mission
        (each mission can be re-rolled once a day before completing).
      </p>

      <h3 id='reaching-diamond-1'>Reaching Diamond 1</h3>

      <p>
        Solely reaching the top-league can be achieved within 6 months of
        starting the game if planned correctly. It would be best to focus on a
        single (cheap) deck to do so. Read{' '}
        <Link to='/guides/d1-with-sf-commons'>
          Kitty’s guide on achieving it with a mostly common SF deck
        </Link>
        , or try out{' '}
        <Link to='/deck/3xn1n2s1n3s24s2n67s6n15s8n63s11/detail'>
          Reckless Rush
        </Link>
        ’s deck.
      </p>
      <p>
        The reason why a cheap deck, i.e. low rarity cards, is best is because
        you need higher level cards in order to be able to compete in the
        Diamond league (and to some extent the Platinum league). It can take a
        long time to find the right copies of epic and legendary cards, and the
        latter are hard to come by, so for getting to Diamond 1 fast it is
        highly recommended to build a deck without.
      </p>
      <p>
        Resource-wise it is simple: buy Noble Books until you have most cards in
        the deck and then focus on buying copies of those cards when they appear
        in the shop. Save <ResourceIcon resource='RUBY' /> rubies for any epic
        card copies you might have in your deck, and with a high surplus buy
        Heroic Tomes.
      </p>
      <p>
        Leave Brawl beyond Milestone 1 aside as it is costly, the many modifiers
        will probably make your deck less competitive and the rewards are skewed
        towards higher tier cards. That being said,{' '}
        <Link to='/deck/3xn1n2s1n3s24s2n67s6n15s8n63s11/detail'>
          Reckless Rush
        </Link>
        ’s deck does perform well in several current Brawl modifiers. However,
        even then it is probably not worth trying to go any further than the{' '}
        <Stones amount={10} /> milestone.
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
        <Coins amount={cards.filter(card => !card.token).length * 1450} />,
        which would take you at least 410 days of max grind to save up,
        including in-game rewards and no Brawl.
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
    </Guide>
  )
})
