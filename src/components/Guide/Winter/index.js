import React from 'react'
import Link from '~/components/Link'
import CardLink from '~/components/CardLink'
import FeaturedDeck from '~/components/FeaturedDeck'
import Info from '~/components/Info'
import Notice from '~/components/Notice'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'

export default React.memo(function GuideWinter(props) {
  return (
    <>
      <p>
        Welcome to this beginner’s guide to Winter Pact. Note that this was
        authored before the elders and ancients were introduced to the game, so
        it is not the most up to date strategies for Winter.
      </p>

      <TableOfContents>
        <li>
          <Link href='#make-the-deck'>Make the deck</Link>
          <ul>
            <li>
              <Link href='#core-cards'>Core cards</Link>
            </li>
            <li>
              <Link href='#filler-cards'>Filler cards</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href='#how-to-use'>How to use</Link>
          <ul>
            <li>
              <Link href='#broken-earth-drakes'>Broken Earth Drakes</Link>
            </li>
            <li>
              <Link href='#yowling-weavers'>Yowling Weavers</Link>
            </li>
            <li>
              <Link href='#rockworkers'>Rockworkers</Link>
            </li>
            <li>
              <Link href='#lady-rime'>Lady Rime</Link>
            </li>
            <li>
              <Link href='#gift-of-the-wise'>Gift of the Wise</Link>
            </li>
            <li>
              <Link href='#2-tiles-moving-units'>2-tiles moving units</Link>
            </li>
            <li>
              <Link href='#cheap-units'>Cheap units</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href='#fix-your-deck'>Fix your deck</Link>
          <ul>
            <li>
              <Link href='#the-deck-doesnt-work-in-the-early-game'>
                The deck doesn’t work in the early game
              </Link>
            </li>
            <li>
              <Link href='#the-deck-doesnt-work-in-the-late-game'>
                The deck doesn’t work in the late game
              </Link>
            </li>
            <li>
              <Link href='#i-dont-usually-use-all-my-mana'>
                I don’t usually use all my mana
              </Link>
            </li>
            <li>
              <Link href='#i-cant-defend-against-the-enemys-pressure'>
                I can’t defend against the enemy’s pressure
              </Link>
            </li>
          </ul>
        </li>
      </TableOfContents>

      <Title id='make-the-deck'>Make the deck</Title>
      <p>The deck has two different goals:</p>
      <ul>
        <li>Clear the board whenever needed</li>
        <li>Use 2-tiles moving units to deal damage to the enemy’s base</li>
      </ul>

      <Spacing bottom='LARGE'>
        <p>
          To do so, certain cards are required—and will be the core of our
          deck—while others can be swapped depending upon their levels.
        </p>
      </Spacing>

      <Info title='July 2020 nerfs'>
        <p>
          This guide was written before the July 2020 update which included some
          consequent nerfs to Frozen Core and Gift of the Wise. The guide
          remains viable, but some things might have changed a little.
        </p>
      </Info>

      <h3 id='core-cards'>Core cards</h3>
      <ul>
        <li>
          <CardLink id='N3' />
        </li>
        <li>
          <CardLink id='N16' />
        </li>
        <li>
          <CardLink id='W13' />
        </li>
        <li>
          <CardLink id='W12' />
        </li>
        <li>
          <CardLink id='W15' />
        </li>
        <li>
          <CardLink id='W19' />
        </li>
        <li>
          At least two 2-tiles moving units: <CardLink id='N12' />,{' '}
          <CardLink id='N28' />, <CardLink id='N39' />, <CardLink id='W17' />
        </li>
        <li>
          At least one dragon other than <CardLink id='W15' />:{' '}
          <CardLink id='W5' />, or alternatively both
        </li>
      </ul>

      <h3 id='filler-cards'>Filler cards</h3>
      <ul>
        <li>
          <CardLink id='N13' /> + <CardLink id='N39' /> if both are leveled up
        </li>
        <li>
          <CardLink id='N1' />, <CardLink id='W2' />, <CardLink id='N4' />
        </li>
        <li>
          <CardLink id='N11' />
        </li>
        <li>
          <CardLink id='N9' /> (only if level 4+)
        </li>
        <li>
          <CardLink id='W12' /> (only if level 3+)
        </li>
        <li>
          <CardLink id='W3' /> + <CardLink id='W18' /> if both are leveled up
        </li>
        <li>
          <CardLink id='W7' /> if it can be triggered often
        </li>
      </ul>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <FeaturedDeck
              id='3xn3n11n12n16w5n18n28w12w13w15w19w21'
              name='Winterfell'
              author='WinterBoii'
              tags={['HIGH_LEVELS']}
              faction='winter'
            />
          </Row.Column>
          <Row.Column>
            <p>
              If you have doubts about which cards to use, skip to{' '}
              <Link href='#how-to-use'>How to use</Link> &gt; Best combos and
              then decide.
            </p>

            <p>
              My Winterfell deck which took me and some other players to high
              Platinum/low Diamond with level 4 cards. So don’t worry, you don’t
              need max cards to actually get high! Find a full explanation of
              the gameplay below.
            </p>
            <p>
              For a more comprehensive deep-dive into building successful and
              efficient decks, refer to{' '}
              <Link to='/guides/deck'>the deck building guide</Link>.
            </p>
          </Row.Column>
        </Row>
      </PageEmbed>

      <Title id='how-to-use'>How to use</Title>
      <p>
        The <span className='Highlight'>playstyle</span> is quite simple: you
        play the usual game, and additionally you send the 2-tiles moving units
        into the enemy’s base, while also clearing out enemy units with your{' '}
        <CardLink id='W15' />.
      </p>
      <p>
        The strength of this deck relies in <CardLink id='W15' /> paired with
        dragons and buildings: you’ll keep your frontline (or at least, part of
        it) while the enemy most likely won’t, giving you the opportunity to
        apply pressure or just send 2-tiles moving units into the enemy’s base.
      </p>
      <p>
        Here are some of the <span className='Highlight'>best combos</span> this
        deck can offer, so try to play as many as possible if you have the
        cards, and the card levels, to do so.
      </p>

      <ul>
        <li>
          <span className='Highlight'>Clear the map #1:</span>{' '}
          <CardLink id='W15' /> will deal damage to anything that isn’t a dragon
          or a structure, for this reason players usually use{' '}
          <CardLink id='N13' />/<CardLink id='W13' /> first, and then{' '}
          <CardLink id='W15' /> the next turn. The building will stay alive,
          while the troops won’t—you’ll keep your frontline while the enemy
          won’t.
        </li>
        <li>
          <span className='Highlight'>Clear the map #2:</span>{' '}
          <CardLink id='W15' /> won’t kill dragons—as such, if you play{' '}
          <CardLink id='W5' /> or <CardLink id='N18' />, they won’t die due to{' '}
          <CardLink id='W15' />
          ’s effect.
        </li>
        <li>
          <span className='Highlight'>No units:</span> <CardLink id='W17' /> has
          -1 strength for every friendly unit on board, so it’s usually played
          after <CardLink id='W15' /> (since most friendly units will be dead).
        </li>
        <li>
          <span className='Highlight'>Clear a spot:</span> <CardLink id='W5' />{' '}
          will kill a non dragon unit every time it attacks, you can use it to
          kill a friendly unit on the enemy’s baseline, then send some 2-tiles
          runner to seal the deal.
        </li>
        <li>
          <span className='Highlight'>Buildings:</span> <CardLink id='W13' />/
          <CardLink id='N13' /> and then <CardLink id='N39' /> (best combo in
          terms of sheer 2-tiles moving unit strength to mana ratio)
        </li>
      </ul>

      <p>
        As for the{' '}
        <span className='Highlight'>remaining cards of your deck</span>, it’s a
        good idea to add what you have leveled up—let’s analyse my thought
        process while making my deck, posted in the page above.
      </p>

      <ul>
        <li>
          I have <CardLink id='N39' /> level 1 so I opted not to add them as
          well as <CardLink id='N13' />.
        </li>
        <li>
          I added <CardLink id='N11' /> just to have something to target tough
          spots.
        </li>
        <li>
          Since my <CardLink id='N1' /> is level 2, I opted to add Beasts of
          Terror to face Satyr decks as well as Shadowfen <CardLink id='F23' />{' '}
          decks, which after the last update have seen quite the rise compared
          to how popular they were before. I didn’t want to have{' '}
          <CardLink id='W2' /> or <CardLink id='N4' /> because they’re static
          cards (they don’t move when played).
        </li>
        <li>
          <CardLink id='W12' /> is my heavy tank as well as the finisher: since
          I don’t have <CardLink id='N39' /> and <CardLink id='W17' /> leveled
          up, I won’t deal a lot of damage via 2-tiles moving runners and as
          such I needed something to actually finish the game once it started to
          become long.
        </li>
      </ul>

      <p>
        Finally, here are some{' '}
        <span className='Highlight'>advanced advices</span> which you should
        keep in mind while playing.
      </p>

      <h3 id='broken-earth-drakes'>Broken Earth Drakes</h3>
      <p>
        <CardLink id='W15' /> triggers only if it’s killed outside the baseline,
        so if needed use a unit (possibly a cheap one) to gain frontline if
        you’re pushed back in your baseline and then use <CardLink id='W15' />.
      </p>
      <p>
        Keep in mind how much damage your <CardLink id='W15' /> does–as a
        general rule, always sacrifice it against one of the opponents’ heavier
        units on board.
      </p>
      <p>
        Sometimes, you can play a bit different by just moving the{' '}
        <CardLink id='W15' /> up one tile, and then the enemies will kill it as
        soon as their turn starts—disadvantage: they’ll lose their units but not
        their frontline.
      </p>
      <p>
        You can also play <CardLink id='W15' /> so that it will die your next
        turn. This will cause the opponent to use something to kill it, and then
        drop the units, or just play the units but have <CardLink id='W15' />{' '}
        deal damage to all of them as soon as your turn starts.
      </p>
      <h3 id='yowling-weavers'>Yowling Weavers</h3>
      <p>
        <CardLink id='W5' /> will kill one of your non dragon units every time
        it attacks, including when it enters the enemy’s base to deal damage. As
        such, don’t use it to attack the enemy units if you have strong units on
        board, but rather use it as a shield (like you would use{' '}
        <CardLink id='N13' /> in front of a heavy units). <CardLink id='W5' />{' '}
        are usually used to attack as the first unit you play if you don’t have
        any other friendly units, to avoid killing your troops.
      </p>
      <p>
        If you’re placing <CardLink id='W5' /> in the enemy’s baseline, place it
        on the right if you have other units (even more if they’re quite
        heavy)—as you may know, units starts moving from front to back and from
        left to right, which means if the enemy’s baseline is full of your units
        and <CardLink id='W5' /> is in the right corner, it will be the last
        troop to go in, thus avoiding killing your units.
      </p>

      <h3 id='#rockworkers'>Rockworkers</h3>
      <p>
        Don’t play them on your baseline unless you’re sure the drop won’t be in
        the central tiles of your baseline–if the drop is in said spots, you’ll
        have an unreachable spot between <CardLink id='N13' /> and the corner.
        Same thing applies while playing <CardLink id='N13' />.
      </p>
      <p>
        Use other units to direct the <CardLink id='N13' /> drop in 1+
        spots—close off the “bad tiles” where you don’t want the drop to go, and
        leave only 1 or 2 opened.
      </p>

      <h3 id='lady-rime'>Lady Rime</h3>
      <p>
        Lady Rime spends the mana leftover in your turn to gain strength,
        meaning that mana gain cards like <CardLink id='W9' /> and{' '}
        <CardLink id='W19' /> are crucial to making her work.
      </p>
      <p>
        Cards such as <CardLink id='W5' />, <CardLink id='W13' />,{' '}
        <CardLink id='W7' />, and <CardLink id='N19' /> can help maintain board
        presence until you have at least 9 mana, when you ideally play{' '}
        <CardLink id='W19' />
        and <CardLink id='W10' /> in an aggressive position.
      </p>
      <p>
        It’s also important to have a secondary runner such as{' '}
        <CardLink id='N12' />, <CardLink id='N28' />, or <CardLink id='W17' />{' '}
        to finish games in a <CardLink id='W10' /> deck. Ideally, you would have{' '}
        <CardLink id='N12' /> in addition to a more expensive runner.
      </p>
      <p>
        Other important cards may include <CardLink id='W2' /> for slowing any
        large-strength enemies, <CardLink id='N14' /> to help maximize{' '}
        <CardLink id='W19' /> in case <CardLink id='W10' /> isn’t able to be
        played, and, as always, some cheap neutral cards such as{' '}
        <CardLink id='N1' /> and <CardLink id='W13' />.
      </p>
      <p>
        Another option is using <CardLink id='N8' /> instead of{' '}
        <CardLink id='N12' />: Mirz’s 0-cost tokens synergize well with{' '}
        <CardLink id='W10' /> as they don’t detract from <CardLink id='W10' />
        ’s strength when played.
      </p>

      <h3 id='gift-of-the-wise'>Gift of the Wise</h3>
      <p>
        That’s most likely your 9+ mana play at each turn you get it—if you want
        to swap a card, I’d recommend making sure that you can still play{' '}
        <CardLink id='W19' /> afterwards.
      </p>
      <p>
        Example: you have 9 mana left and 3 cards, two cards are{' '}
        <CardLink id='W19' /> and <CardLink id='W13' />. If you play{' '}
        <CardLink id='W13' /> first, then swap a card, you won’t be able to play
        <CardLink id='W19' /> anymore, and may miss the opportunity to play the
        card you just got.
      </p>

      <h3 id='2-tiles-moving-units'>2-Tiles Moving Units (2-TMU)</h3>
      <p>
        If you’re confident you can defend the next turn, prioritize sending the
        2-TMU into the enemy’s base rather than keep adding strenght to the
        board–remember your best card is <CardLink id='W15' />, and you don’t
        want a lot of your units to be cleared by it if you do play it the next
        turn to defend.
      </p>
      <p>
        If you do lose your frontline, don’t worry—these runners can take it
        back quite quickly, so it’s not a big issue. If the enemy plants units
        in your baseline, it’s always good to have 2-TMU to clear multiple units
        at once.
      </p>

      <h3 id='cheap-units'>Cheap units</h3>
      <p>
        However you make your deck, remember one thing: some games have a late
        game, but every game has an early game. You want to make sure you have
        something cheap that can move, gain frontline, and kill the enemy
        troops. Adding 2 more buildings just because <CardLink id='W15' /> won’t
        kill them isn’t viable—your objective is to win by sending units into
        the enemy baseline, and as such you need something that moves.
      </p>
      <p>
        Remember to swap a card every turn, unless your think your current hand
        is the best possible one in that situation!
      </p>

      <Title id='fix-your-deck'>Fix your deck</Title>
      <p>
        You’ve followed the guide but something isn’t quite working? Let’s take
        a look at the possible scenarios.
      </p>

      <h3 id='the-deck-doesnt-work-in-the-early-game'>
        The deck doesn’t work in the early game
      </h3>
      <p>
        Too many static cards or too many expensive cards. Solution: swap out
        something you don’t use a lot (most likely, the card you cycle the most)
        and add a cheap card.
      </p>

      <h3 id='the-deck-doesnt-work-in-the-late-game'>
        The deck doesn’t work in the late game
      </h3>
      <p>
        This deck archetype is really good in the late game—if it doesn’t work,
        you may have too many cheap/static units, and you need something to
        actually seal the deal: more 2-TMU or <CardLink id='W21' />.
      </p>

      <h3 id='i-dont-usually-use-all-my-mana'>
        I don’t usually use all my mana
      </h3>
      <p>
        That’s because you have too many cards with either an odd or even mana
        cost—just swap some.
      </p>

      <h3 id='i-cant-defend-against-the-enemys-pressure'>
        I can’t defend against the enemy’s pressure
      </h3>
      <p>
        The causes may be the same ones as why you might{' '}
        <Link href='#the-deck-doesnt-work-in-the-early-game'>
          struggle in early game
        </Link>{' '}
        or you might be misusing <CardLink id='W15' />
        —either way I’d recommend to read again{' '}
        <Link href='#how-to-use'>How to use</Link>.
      </p>

      <Notice spacing={{ top: 'LARGER' }}>
        For more detailed advices &amp; responses, please check out the
        Stormbound Discord and we’ll be happy to help. Best of luck in your
        matches!
      </Notice>
    </>
  )
})
