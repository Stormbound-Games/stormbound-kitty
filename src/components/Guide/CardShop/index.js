import React from 'react'
import Link from '~/components/Link'
import Info from '~/components/Info'
import { Coins, Rubies } from '~/components/Resource'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'

export default React.memo(function GuideCardShop(props) {
  return (
    <>
      <p>
        Buying cards in the shop is a bit less efficient than getting 3 random
        cards from a Noble book, but can be a good way to forgo randomness and
        to get important cards to a higher level faster.
      </p>
      <p>
        This helps to prepare for the Diamond league and even Diamond 1 as early
        as possible. Just be aware that coins are a lot more precious since the{' '}
        <Link to='/releases/07-2020'>July update</Link>, and unless you go for
        the coin cap on a regular basis, buying more than one copy of a card
        will take a large bite out of your weekly <Coins amount={700} /> from
        quests.
      </p>

      <Info title='About resources'>
        <p>
          For a complete guide on Stormbound resources, how to get them and how
          to make the most of them, please refer to the{' '}
          <Link to='/guides/resources'>dedicated resources guide</Link> by{' '}
          <Link to='/members/roman'>Roman</Link>.
        </p>
      </Info>

      <Title id='cheap-core-cards'>Cheap Core Cards</Title>
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
          <CardLink id='N1' /> is an incredibly cheap mover which is why it is
          included in many a deck given how important movement is early game.
        </li>
        <li>
          <CardLink id='N3' /> is also a cheap unit with movement without any
          penalty, which makes it an essential tool of most decks.
        </li>
        <li>
          <CardLink id='N4' /> does not move but is cheap and robust, which is a
          good card to put units on the board.
        </li>
        <li>
          <CardLink id='N16' /> is a little more expensive than the
          aforementioned cards but has decent strength and one movement, making
          it very efficient.
        </li>
        <li>
          <CardLink id='N9' /> becomes invaluable at level 5 for a lot of
          non-rush decks against Elders.
        </li>
        <li>
          <CardLink id='N63' />: this is a really powerful spell for a low cost,
          but there is a caveat because it doesn’t always have a target. For
          this reason it is better in decks that are capable of setting up
          scenarios where it gets value—for instance in rush decks to clear
          blockers, or to send the defending units of your opponent into their
          own base.
        </li>
        <li>
          <CardLink id='N60' /> was buffed from 6 to 5 mana and is now, with a
          maximum of 12 strength at level 5, one of the strongest 5-mana cards.
          The confusion ability is just a bonus, but I expect the archetype to
          become both more viable and popular. I also definitely expect this
          card to get nerfed down to 10 strength at max level, so take this
          recommendation with a grain of salt, but for now you definitely want
          this.
        </li>
      </ul>
      <Title id='faction-cards'>Faction Cards</Title>
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
          <CardLink id='N2' />
        </li>
        <li>
          <CardLink id='S1' />
        </li>
        <li>
          <CardLink id='S24' />
        </li>
        <li>
          <CardLink id='S6' />
        </li>
        <li>
          <CardLink id='N15' />
        </li>
      </ul>

      <p>
        <span className='Highlight'>Winter</span> on the other hand is quite
        late-game oriented, despite the aggressive nerfs to mana-oriented cards
        like <CardLink id='W9' /> and <CardLink id='W19' /> in July 2020. Some
        common and rare cards might be worth investing into depending on what
        strategies you like. But overall, until Winter either gets early-game
        cards worth mentioning (besides <CardLink id='W5' />) or their mana
        manipulation capabilities back to pre-nerf levels, the list is reduced
        to:
      </p>

      <ul>
        <li>
          <CardLink id='N14' />
        </li>
        <li>
          <CardLink id='N13' />
        </li>
        <li>
          <CardLink id='N47' />
        </li>
        <li>
          <CardLink id='N44' />
        </li>
        <li>
          <CardLink id='W17' />
        </li>
      </ul>
      <p>
        <span className='Highlight'>Shadowfen</span> is very versatile and can
        be played either rush or control, depending on opportunities and
        play-style:
      </p>
      <ul>
        <li>
          <CardLink id='F4' />
        </li>
        <li>
          <CardLink id='F3' />
        </li>
        <li>
          <CardLink id='F7' />
        </li>
        <li>
          <CardLink id='F25' />
        </li>
        <li>
          <CardLink id='F14' /> (which is commonly considered the best 4-mana
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
          <CardLink id='N2' />
        </li>
        <li>
          <CardLink id='I1' />
        </li>
        <li>
          <CardLink id='I7' />
        </li>
      </ul>
      <Title id='ruby-purchases'>Ruby Purchases</Title>
      <p>
        Now, rubies are a little more scarce than coins, so you should think
        twice about spending them on the shop where you only get a single epic
        card for <Rubies amount={20} />. That being said, you get{' '}
        <Rubies amount={5} /> per day from quests, and <Rubies amount={5} />{' '}
        from an early Brawl milestone per week, amounting to{' '}
        <Rubies amount={40} /> per week.
      </p>
      <p>
        In most cases, if you want epics, saving up to buy a Heroic or Mythic
        Tome is probably always the better investment. However, there are a few
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
          <CardLink id='N67' /> is the cheapest neutral runner in the game and
          can also be used to stay static which is sometimes needed—making it
          ideal for rush decks, mainly Swarm or Shadowfen.
        </li>
        <li>
          <CardLink id='N23' /> is a very cheap spell which can bring a lot of
          value and easily finds its place in control decks.
        </li>
        <li>
          <CardLink id='N74' /> is a very strong neutral Elder with incredible
          strength at all level and offering solid board control.
        </li>
        <li>
          <CardLink id='N34' /> tends to be mainly for Ironclad due to{' '}
          <CardLink id='I2' /> but can be efficiently used in a variety of
          decks.
        </li>
        <li>
          <CardLink id='N39' /> is a great defensive and offensive tool for all
          decks running structures.
        </li>
      </ul>
      <p>
        <span className='Highlight'>Swarm</span>
      </p>
      <ul>
        <li>
          <CardLink id='S2' /> is a cheap runner with a penalty that becomes
          more and more marginal as the base health increases, making it the
          perfect backbone of many rush decks.
        </li>
        <li>
          <CardLink id='S11' /> is an often overlooked card but has become more
          popular thanks to its presence in the highly-competitive{' '}
          <Link to='/deck/3xn1n2s1n3s24s2n67s6n24n15s8s11/detail'>
            Reckless Rush deck
          </Link>
          .
        </li>
        <li>
          <CardLink id='S28' /> is a very valuable Elder, even though it can no
          longer be spawned by <CardLink id='S21' />.
        </li>
      </ul>
      <p>
        <span className='Highlight'>Winter</span>
      </p>
      <p>
        Winter is in a bit of a bad state after the July nerfs to the only
        remaining good Winter staples Gift of the Wise and Frozen Core, making
        it the true neutral faction. It remains to be seen whether a deck
        focused on confusion under the Winter-Feline alliance finds a place in
        the meta, where you can stall the game long enough to get access to the
        powerful Winter late game, but I am very skeptical. The only hope for
        Winter is some tender care and affection in the next patch.
      </p>
      <p>
        <span className='Highlight'>Ironclad</span>
      </p>
      <ul>
        <li>
          <CardLink id='I8' /> is a cheap construct providing a lot of value for
          a relatively simple condition, making it a de factor part of many
          Ironclad decks.
        </li>
        <li>
          <CardLink id='I28' /> is a strong Elder with incredible chip
          capabilities, giving a non-marginal edge in games lasting passed early
          game.
        </li>
      </ul>
      <p>
        <span className='Highlight'>Shadowfen</span>
      </p>
      <ul>
        <li>
          <CardLink id='F8' /> is an incredibly cheap spell spawning a lot of
          units, opening a lot of combos with cards such as{' '}
          <CardLink id='F23' />, <CardLink id='F17' /> and <CardLink id='N76' />
          .
        </li>
        <li>
          <CardLink id='F28' /> is the only way for Shadowfen to do chip damage,
          and can be precisely controlled with self-harm and poisoning.
        </li>
      </ul>
      <p>
        At the end of the day, you have to figure out what you want from the
        game to know how to best spend your resources!
      </p>
    </>
  )
})
