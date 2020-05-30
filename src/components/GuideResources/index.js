import React from 'react'
import { Link } from 'react-router-dom'
import Guide from '../Guide'
import Info from '../Info'
import ResourceIcon from '../ResourceIcon'
import { Coins } from '../Resource'
import Title from '../Title'
import guides from '../../data/guides'
import cards from '../../data/cards'
import './index.css'

const guide = guides.find(g => g.id === 'RESOURCES_GUIDE')

export default React.memo(function GuideDrawing(props) {
  return (
    <Guide {...guide}>
      <p>
        In this guide, I would like to give some insights on how to best manage
        the resources in this game. This is a work-in-progress and will be
        expanded on in the near future. This guide is based on the latest update
        as of May 2020.
      </p>

      <Title>Resources</Title>

      <h3>
        <ResourceIcon resource='COIN' /> Coins
      </h3>

      <p>Coins are available through 5 different means:</p>
      <ul>
        <li>
          Daily missions (50, 80 or 120 depending on the quest difficulty).
        </li>
        <li>
          Daily victories (30 extra for the first daily win, as well as 5, 10 or
          20 depending on whether the game is played on mobile or Steam, with or
          without ads — for a maximum of 250 a day*).
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
        It is technically possible to earn <Coins amount={265} /> from battles
        per day despite the coins cap. To do so, reach <Coins amount={245} />{' '}
        then win another game (with ads), bringing the total to 265.
      </Info>

      <h3>
        <ResourceIcon resource='RUBY' /> Rubies
      </h3>

      <p>Rubies are available through 4 different means:</p>
      <ul>
        <li>Some daily missions (5).</li>
        <li>
          Monthly season chests (5 in Bronze, 10 in Silver, 20 in Gold, 30 in
          Platinum, 50 in Diamond).
        </li>
        <li>Weekly Brawl (5 at Milestone 2, 250 at Milestone 8).</li>
        <li>Shop purchases as part of bundles or rubies only.</li>
      </ul>

      <h3>
        <ResourceIcon resource='STONE' /> Fusion Stones
      </h3>

      <p>Fusion Stones are available through 3 different means:</p>
      <ul>
        <li>Weekly Brawl (10 at Milestone 4, 50 at Milestone 7).</li>
        <li>
          <Link to='/collection/books'>Sometimes in tomes and books</Link>.
        </li>
        <li>Shop purchases as part of bundles.</li>
      </ul>
      <p style={{ marginBottom: '3em' }}>
        Note: Fusion Stones used to be rewarded in exchange of lvl 5 card
        duplicates but these are now replaced with coins.
      </p>

      <Info title='Community rewards' icon='crown'>
        There are several rewards handed out in community tournaments and social
        media engagement competitions. Please refer to the official Stormbound
        social channels and the Discord server for more information.
      </Info>

      <Title>General Tactics</Title>

      <p>
        How to best use your resources depends on your goals and values. In
        terms of goals, Stormbound can be broken down into a few:
      </p>

      <ul>
        <li>Reaching the top league (Diamond 1)</li>
        <li>
          Completing one’s collection (having at least one copy of each card)
        </li>
        <li>Bringing full collection to level 5</li>
        <li>Getting to the top of the weekly Brawl leaderboard</li>
      </ul>

      <p>
        Some of these goals are a lot harder to achieve. Consider that upgrading
        your full collection to level 5 costs you <Coins amount='272,600' />,
        which would take you at least 500 days to grind with in-game rewards. As
        a <abbr title='Free-To-Play'>F2P</abbr> player myself, I’ve run multiple
        calculations and it woud take over 4 years of playing in the current
        state to get to a full collection at level 5. It is very likely the game
        will change before then, as would the calculations, so I’ll leave this
        for now.
      </p>

      <p>
        Perhaps more important is to look at other goals and what you want to
        get out of this game. Most of you will have decided to play or stick
        with Stormbound for the fun of it. As an intricate strategy game there
        are a lot of great plays to be found in trying out different decks and
        figuring out the changing meta of the weekly Brawl.
      </p>

      <p>
        Personally, I’ve found that building a main deck that can get you to
        Platinum 1, and then upgrading cards that you want to use with in the
        current Brawl, while building other decks to have fun with in Ranked
        Gold/Platinum is best.
      </p>

      <p>
        Obviously you might also want to set yourself a different challenge,
        such as trying to reach Diamond 1 in the least amount of days from a new
        account, or with the lowest average card level.
      </p>

      <p>
        The main point being that your resource management depends a little bit
        on your personal goals. However, it is possible to give some general
        advice on how to best use coins, rubies and fusion stones.
      </p>

      <Title>Grinding</Title>

      <p>
        My main tip is to make your daily grinding as easy as possible. There
        are daily missions for Ironclad Bolstering, spells, structures, token
        units, push units forward, Swarm, freeze, push ’n pull with Ironclad,
        poison, mana Winter, convert, amongst others so make decks to complete
        these easily. You can also play with friends to complete these
        challenges.
      </p>

      <p>
        If you don’t have much time to play, prioritise completing your daily
        challenges. For the daily wins, build a good rush deck. It takes about
        an hour to win the 14 games necessary to reach the daily coins cap (13
        with ads + 1 without for 265 coins).
      </p>

      <Title>Hoarding</Title>

      <p>
        If you’re planning on playing for a while it is always advisable to set
        aside some resources for sales, offers and certain cards or books/tomes
        you might want to get in the shop. It happened in the past that books
        were temporarily cheaper and people having saved a lot of rubies made
        good deals.
      </p>

      <Title>Spending</Title>

      <h3>
        <ResourceIcon resource='COIN' /> Coins
      </h3>

      <p>
        In the beginning it is advisable to expand your collection by purchasing
        Noble Books. However, in the long-term it is inefficient to keep buying
        these. Depending on your strategy and the amount of commons in your
        preferred deck(s), it can be best to buy singular specific cards in the
        shop.
      </p>

      <p>
        If you are in it for the long-run, it’s almost exclusively better to
        save your coins for high value cards in the shop, and using your coins
        for Brawl (in which getting to the Mythic Tome for under{' '}
        <Coins amount='1,800' /> is a rough goal). Have a look at the{' '}
        <Link to='/list/ranked'>tier-list</Link> to see which cards have high
        value in this game.
      </p>

      <h3>
        <ResourceIcon resource='RUBY' /> Rubies
      </h3>

      <p>
        As with coins, using rubies on specific (high value) cards in the shop
        for use your preferred deck(s) can be more efficient. The Classic Tome
        isn’t worth the value, especially compared with the cost of a Noble
        Book. Rubies in general get a terrible coin exchange. If your goal is to
        bring the full collection to level 5, it is most efficient to buy Heroic
        Tomes.
      </p>

      <h3>
        <ResourceIcon resource='STONE' /> Fusion Stones
      </h3>

      <p>
        It is not advisable to use these to craft cards as it diminishes the
        value significantly compared to using it for duplicates. As the rarest
        of resources I would recommend holding on to these until you have a good
        use for them, usually a specific Epic or Legendary card. However, if you
        want to complete your collection it is best to hold off until the end to
        fill out the gaps in your collection.
      </p>

      <p>
        Unfortunately it’s difficult to draw a definitive conclusion on how best
        to use your resources as it depends on your play style and goals.
      </p>

      <p>
        To help you in making these decisions, here are some stats and figures:
      </p>
      <ul>
        <li>
          There are {cards.filter(card => !card.token).length} different cards
          to collect in the game.
        </li>
        <li>
          7,451 copies needed in total with distribution being 44.3% for
          commons, 33.6% for rares, 16.5% for epics and 5.6% for legendaries.
        </li>
        <li>
          Upgrading your collection to have all cards level 5 costs{' '}
          <Coins amount='272,600' />.
        </li>
        <li>
          The closest you can get to matching the card distribution after
          considering the cards already gained through ranking and the campaign,
          is by aiming for daily ruby mission, playing the weekly Brawl up to
          the Mythic Tome if it costs you less than <Coins amount='1,800' />,
          and buying Heroic Tomes.
        </li>
      </ul>

      <hr />

      <p>
        At the end of the day, you have to figure out what you want from the
        game to know how to best spend your resources!
      </p>
    </Guide>
  )
})
