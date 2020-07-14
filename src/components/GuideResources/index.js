import React from 'react'
import { Link } from 'react-router-dom'
import Guide from '../Guide'
import Info from '../Info'
import ResourceIcon from '../ResourceIcon'
import { Coins, Rubies } from '../Resource'
import Title from '../Title'
import WikiLink from '../WikiLink'
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

      <ol>
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
          <a href='#general-tactics'>General Tactics</a>
          <ul>
            <li>
              <a href='#grinding'>Grinding</a>
            </li>
            <li>
              <a href='#hoarding'>Hoarding</a>
            </li>
            <li>
              <a href='#spending'>Spending</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#the-card-shop'>The Card Shop</a>
          <ul>
            <li>
              <a href='#cheap-core-cards'>Cheap Core Cards</a>
            </li>
            <li>
              <a href='#faction-cards'>Faction Cards</a>
            </li>
            <li>
              <a href='#ruby-purchases'>Ruby Purchases</a>
            </li>
          </ul>
        </li>
      </ol>

      <Title id='resources'>Resources</Title>

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

      <Title id='general-tactics'>General Tactics</Title>

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
        your full collection to level 5 costs you{' '}
        <Coins amount={cards.filter(card => !card.token).length * 1450} />,
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

      <h3 id='grinding'>Grinding</h3>

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
        an hour to win the 11 games necessary to reach the daily coins cap.
      </p>

      <h3 id='hoarding'>Hoarding</h3>

      <p>
        If you’re planning on playing for a while it is always advisable to set
        aside some resources for sales, offers and certain cards or books/tomes
        you might want to get in the shop. It happened in the past that books
        were temporarily cheaper and people having saved a lot of rubies made
        good deals.
      </p>

      <h3 id='spending'>Spending</h3>

      <h4>
        <ResourceIcon resource='COIN' /> Coins
      </h4>

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

      <h4>
        <ResourceIcon resource='RUBY' /> Rubies
      </h4>

      <p>
        As with coins, using rubies on specific (high value) cards in the shop
        for use your preferred deck(s) can be more efficient. The Classic Tome
        isn’t worth the value, especially compared with the cost of a Noble
        Book. Rubies in general get a terrible coin exchange. If your goal is to
        bring the full collection to level 5, it is most efficient to buy Heroic
        Tomes.
      </p>

      <h4>
        <ResourceIcon resource='STONE' /> Fusion Stones
      </h4>

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

      <Title id='the-card-shop'>The Card Shop</Title>

      <p>
        Buying cards in the shop is a bit less efficient than getting 3 random
        cards from a noble book, but can be a good way to forgo randomness and
        to get important cards to a higher level faster. This helps to prepare
        for the Diamond league and even Diamond 1 as early as possible.
      </p>

      <h3 id='cheap-core-cards'>Cheap Core Cards</h3>

      <blockquote>
        <p>
          “Not every game has a late game, but every game has an early game.”
        </p>
      </blockquote>

      <p>
        This old adage applies to Stormbound as well as anywhere. Your cards
        below 4 mana are your troopers, your opening gambit, the backbone upon
        which your strategy is built. In longer games, they are often played
        multiple times, so that 1 more strength can quickly add up over the
        course of a game. Definitely more than upgrading a more expensive unit.
      </p>

      <p>
        This is why it is important to level up cheap units as soon as possible.
        Getting cards to level 3 is fairly quick and should be done naturally by
        buying Noble books, but the stretches from 3 to 4 and from 4 to 5 are
        much larger. So if you want to speed this process up, starting from card
        level 3, buying one or two copies (if possible) is recommended for the
        following cards:
      </p>

      <ul>
        <li>
          <WikiLink id='N1' /> is an incredibly cheap mover which is why it is
          included in many a deck given how important movement is early game.
        </li>
        <li>
          <WikiLink id='N3' /> is also a cheap unit with movement without any
          penalty, which makes it an essential tool of most decks.
        </li>
        <li>
          <WikiLink id='N4' /> does not move but is cheap and robust, which is a
          good card to put units on the board.
        </li>
        <li>
          <WikiLink id='N16' /> is a little more expensive than the
          aforementioned cards but has decent strength and one movement, making
          it very efficient.
        </li>
        <li>
          <WikiLink id='N9' /> becomes invaluable at level 5 for a lot of
          non-rush decks against Elders.
        </li>
        <li>
          <WikiLink id='N63' />: this is a really powerful spell for a low cost,
          but there is a caveat because it doesn’t always have a target. For
          this reason it is better in decks that are capable of setting up
          scenarios where it gets value — for instance in rush decks to clear
          blockers, or to send the defending units of your opponent into their
          own base.
        </li>
      </ul>

      <h3 id='faction-cards'>Faction Cards</h3>

      <p>
        Depending on your main faction, you might also want to consider the
        following cards.
      </p>

      <p>
        <span className='Highlight'>Swarm</span> tends to be used mainly for
        cheap and fast decks, so it only makes sense to invest mainly in these
        type of cards:
      </p>
      <ul>
        <li>
          <WikiLink id='N2' />
        </li>
        <li>
          <WikiLink id='S1' />
        </li>
        <li>
          <WikiLink id='S24' />
        </li>
        <li>
          <WikiLink id='S6' />
        </li>
        <li>
          <WikiLink id='N15' />
        </li>
      </ul>

      <p>
        <span className='Highlight'>Winter</span> on the other hand is very
        late-game oriented. Some common and rare cards might be worth investing
        into depending on what strategies you like, including:
      </p>
      <ul>
        <li>
          <WikiLink id='N14' />
        </li>
        <li>
          <WikiLink id='W9' />
        </li>
        <li>
          <WikiLink id='N13' />
        </li>
        <li>
          <WikiLink id='N47' />
        </li>
        <li>
          <WikiLink id='W27' />
        </li>
        <li>
          <WikiLink id='N44' />
        </li>
        <li>
          <WikiLink id='W17' />
        </li>
        <li>
          <WikiLink id='W21' />
        </li>
      </ul>

      <p>
        <span className='Highlight'>Shadowfen</span> is very versatile and can
        be played either rush or control, depending on opportunities and
        play-style:
      </p>
      <ul>
        <li>
          <WikiLink id='F4' />
        </li>
        <li>
          <WikiLink id='F3' />
        </li>
        <li>
          <WikiLink id='F7' />
        </li>
        <li>
          <WikiLink id='F25' />
        </li>
        <li>
          <WikiLink id='F14' /> (which is commonly considered the best 4-mana
          card in the game at level 5)
        </li>
      </ul>

      <p>
        <span className='Highlight'>Ironclad</span> relies a lot on its epic
        cards to shine, so there are not so many cards that are definitely worth
        purchasing when maining Ironclad:
      </p>
      <ul>
        <li>
          <WikiLink id='N2' />
        </li>
        <li>
          <WikiLink id='I1' />
        </li>
        <li>
          <WikiLink id='I7' />
        </li>
      </ul>

      <h3 id='ruby-purchases'>Ruby Purchases</h3>

      <p>
        Now, rubies are a lot more rare than coins, so you should think twice
        about spending them on the shop where you only get a single epic card
        for <Rubies amount={20} />.
      </p>
      <p>
        In most cases, if you want epics, saving up to buy a Heroic or Mythic
        book is probably always the better investment. However, there are a few
        epic cards that are very good and spending rubies on them is not wrong
        per se. It might be different from player to player, depending on taste
        and play-style, and you definitely shouldn’t spread your rubies too thin
        among all of them. Like I said, books are better.
      </p>

      <p>
        <span className='Highlight'>Neutral</span>
      </p>
      <ul>
        <li>
          <WikiLink id='N67' /> is the cheapest neutral runner in the game and
          can also be used to stay static which is sometimes needed — making it
          ideal for rush decks, mainly Swarm or Shadowfen.
        </li>
        <li>
          <WikiLink id='N23' /> is a very cheap spell which can bring a lot of
          value and easily finds its place in control decks.
        </li>
        <li>
          <WikiLink id='N74' /> is a very strong neutral Elder with incredible
          strength at all level and offering solid board control.
        </li>
        <li>
          <WikiLink id='N34' /> tends to be mainly for Ironclad due to{' '}
          <WikiLink id='I2' /> but can be efficiently used in a variety of
          decks.
        </li>
        <li>
          <WikiLink id='N39' /> is a great defensive and offensive tool for all
          decks running structures.
        </li>
      </ul>

      <p>
        <span className='Highlight'>Swarm</span>
      </p>
      <ul>
        <li>
          <WikiLink id='S2' /> is a cheap runner with a penalty that becomes
          more and more marginal as the base health increases, making it the
          perfect backbone of many rush decks.
        </li>
        <li>
          <WikiLink id='S11' /> is an often overlooked card but has become more
          popular thanks to its presence in the highly-competitive{' '}
          <Link to='/deck/3n13n23s13n33s243s23n633n673s63n153s83s11/detail'>
            Reckless Rush deck
          </Link>
          .
        </li>
        <li>
          <WikiLink id='S28' /> is a very valuable Elder, especially when
          combined with <WikiLink id='S21' /> for control decks.
        </li>
      </ul>

      <p>
        <span className='Highlight'>Winter</span>
      </p>
      <ul>
        <li>
          <WikiLink id='W19' /> is the backbone of a larger number of Winter
          decks especially control and mana-ramp, literally granting free mana.
        </li>
      </ul>

      <p>
        <span className='Highlight'>Ironclad</span>
      </p>
      <ul>
        <li>
          <WikiLink id='I8' /> is a cheap construct providing a lot of value for
          a relatively simple condition, making it a de factor part of many
          Ironclad decks.
        </li>
        <li>
          <WikiLink id='I28' /> is a strong Elder with incredible chip
          capabilities, giving a non-marginal edge in games lasting passed early
          game.
        </li>
      </ul>

      <p>
        <span className='Highlight'>Shadowfen</span>
      </p>
      <ul>
        <li>
          <WikiLink id='F8' /> is an incredibly cheap spell spawning a lot of
          units, opening a lot of combos with cards such as{' '}
          <WikiLink id='F23' />, <WikiLink id='F17' /> and <WikiLink id='N76' />
          .
        </li>
        <li>
          <WikiLink id='F28' /> is the only way for Shadowfen to do chip damage,
          and can be precisely controlled with self-harm and poisoning.
        </li>
      </ul>

      <p>
        At the end of the day, you have to figure out what you want from the
        game to know how to best spend your resources!
      </p>
    </Guide>
  )
})
