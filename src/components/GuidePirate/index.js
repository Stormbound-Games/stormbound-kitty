import React from 'react'
import BattleSimApp from '../BattleSimApp'
import CardLink from '../CardLink'
import Guide from '../Guide'
import Link from '../Link'
import TableOfContents from '../TableOfContents'
import Title from '../Title'
import getGuide from '../../helpers/getGuide'

const guide = getGuide('PIRATE_GUIDE')

const Board = props => (
  <Guide.FullWidth>
    <BattleSimApp environment='neutral' mode='DISPLAY' simId={props.id} />
    {props.caption ? <p>{props.caption}</p> : null}
  </Guide.FullWidth>
)

export default React.memo(function GuidePirate(props) {
  return (
    <Guide {...guide}>
      <p>
        Welcome to the Pirate Guide! It is recommended that you read the{' '}
        <Link to='/guides/complete'>complete guide by Arikrat</Link> as well as
        the <Link to='/guides/drawing'>drawing guide by Kitty</Link>, as they
        contain useful information that will be referenced throughout this
        guide.
      </p>

      <TableOfContents>
        <li>
          <Link href='#overview'>Overview and Meta Disclaimer</Link>
        </li>
        <li>
          <Link href='#the-cards'>The Cards</Link>
          <ul>
            <li>
              <Link href='#N12'>First Mutineer</Link>
            </li>
            <li>
              <Link href='#N42'>Lucky Charmers</Link>
            </li>
            <li>
              <Link href='#N14'>Freebooters</Link>
            </li>
            <li>
              <Link href='#N5'>Northsea Dog</Link>
            </li>
            <li>
              <Link href='#N33'>Snake Eyes</Link>
            </li>
            <li>
              <Link href='#N16'>Westwind Sailors</Link>
            </li>
            <li>
              <Link href='#N30'>Bluesail Raiders</Link>
            </li>
            <li>
              <Link href='#N19'>Cabin Girls</Link>
            </li>
            <li>
              <Link href='#N22'>Goldgrubbers</Link>
            </li>
            <li>
              <Link href='#N72'>Seasick Bouncers</Link>
            </li>
            <li>
              <Link href='#N77'>Rogue Sheep</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href='#battle-styles'>Battle Styles</Link>
          <ul>
            <li>
              <Link href='#rush'>Rush</Link>
            </li>
            <li>
              <Link href='#stall'>Stall</Link>
            </li>
            <li>
              <Link href='#shuffle'>Shuffle</Link>
            </li>
            <li>
              <Link href='#pure'>Pure</Link>
            </li>
            <li>
              <Link href='#hybrid'>Hybrid</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href='#summary'>Summary</Link>
        </li>
      </TableOfContents>

      <Title id='overview'>Overview</Title>
      <p>
        Pirates are a neutral race in stormbound with heavy emphasis on
        card/hand interactions, as well as having a large quantity of vanilla
        units (units without abilities).
      </p>

      <p>
        <span className='Highlight'>Disclaimer:</span> Pirates are not near the
        top of the meta, and they have never been. As new cards are added and
        old cards changed, pirates certainly stand a fighting chance, however as
        of now, pirate decks are not a common occurrence.
      </p>
      <p>
        There is always a slight advantage to playing an unusual deck type, that
        being people will be less able to predict and react to your strategy. In
        some cases with pirate decks especially, you can conceal the true
        identity of your deck until a critical moment (see “Pure” strategy).
      </p>

      <Title id='the-cards'>The Cards</Title>

      <p>
        Different pirate cards are good at progressing different game plans. I
        will list out all of the different pirate cards, as well as the good
        deckfits, in order of importance (most → least) for a pirate deck (by my
        personal assessment).
      </p>
      <p>
        Battle styles marked with an asterisk (*) are optional in some cases.
      </p>

      <h3 id='N12'>
        <CardLink id='N12' />
      </h3>
      <p>
        Even though it may come as a surprise, First Mutineer has the widest
        utility of all the pirate cards. Its strengths include: being a runner,
        hand manipulation and having a relatively low cost.
      </p>
      <p>
        <span className='Highlight'>Battle styles:</span> Rush, Stall, Shuffle,
        Pure
      </p>

      <h3 id='N42'>
        <CardLink id='N42' />
      </h3>
      <p>
        Lucky charmers is a defining power play, and often a win condition, to
        many pirate decks. It is somewhat debatable if a deck can even be
        considered a pirate deck without this card, however for the sake of this
        guide, any deck that capitalizes on the strength of pirates counts.
      </p>
      <p>
        <span className='Highlight'>Battle styles:</span> Pure, Stall*, Shuffle*
      </p>

      <h3 id='N14'>
        <CardLink id='N14' />
      </h3>
      <p>
        A very greedy card useful for hand refill in the late game, as well as
        fishing out useful cards at crucial moments.
      </p>
      <p>
        <span className='Highlight'>Battle styles:</span> Stall, Pure, Shuffle,
        Rush*
      </p>

      <h3 id='N5'>
        <CardLink id='N5' />
      </h3>
      <p>
        My favorite card in the game. Northsea Dog is a major shock development
        on the board when the enemy least expects it. Usually gets more value if
        you have lots of mana, or very cheap cards.
      </p>
      <p>
        <span className='Highlight'>Battle styles:</span> Rush, Pure, Stall*,
        Shuffle*
      </p>

      <h3 id='N33'>
        <CardLink id='N33' />
      </h3>
      <p>
        Snake Eyes is the largest card cycle play there is, making him excel at
        finding the cards you need and pitching the cards you don’t!
      </p>
      <p>
        <span className='Highlight'>Battle styles:</span> Shuffle, Pure, Stall*
      </p>

      <h3 id='N16'>
        <CardLink id='N16' />
      </h3>
      <p>A solid vanilla card that everyone knows and loves.</p>
      <p>
        <span className='Highlight'>Battle styles:</span> Pure, Rush*, Stall*,
        Shuffle*
      </p>

      <h3 id='N30'>
        <CardLink id='N30' />
      </h3>
      <p>
        Not the best runner in the world, but good enough to justify its
        inclusion for the sake of pirate synergy with Lucky Charmers. Although
        it will have many battle styles listed, most of its inclusions are
        purely due to its useability as a runner, but in many cases can (and
        should) be swapped with an objectively better runner of similar cost if
        Lucky Charmers is not in the deck.
      </p>

      <p>
        <span className='Highlight'>Battle styles:</span> Pure, Stall*,
        Shuffle*, Rush*
      </p>

      <h3 id='N19'>
        <CardLink id='N19' />
      </h3>
      <p>
        A sticky unit that is difficult for the opponent to remove thanks to its
        high stats.
      </p>
      <p>
        <span className='Highlight'>Battle Styles:</span> Pure, Stall*, Rush*,
        Shuffle*
      </p>

      <h3 id='N22'>
        <CardLink id='N22' />
      </h3>
      <p>
        Goldgrubbers is a really cool card that is just really not efficient.
        Its one use (to cycle through the deck) does a worse job at than 2 cheap
        units that could be played instead (and would still cycle the deck just
        as fast). Mildly usable for slower game plans.
      </p>
      <p>
        <span className='Highlight'>Battle styles:</span> Pure, Shuffle*, Stall*
      </p>

      <h3 id='N72'>
        <CardLink id='N72' />
      </h3>
      <p>
        I strongly dislike this card. Very slow. Worse version of Lucky
        Charmers. Cool for certain Brawl I guess.
      </p>
      <p>
        <span className='Highlight'>Battle styles:</span> Stall*, Pure*
      </p>

      <h3 id='N77'>
        <CardLink id='N77' />
      </h3>
      <p>At the time this guide was made, this card is useless.</p>

      <Title id='battle-styles'>Battles styles:</Title>

      <p>
        Pirate synergies can be used in a variety of deck types. I will not be
        covering all possible uses for each pirate, just the decks that
        capitalize on pirate synergy with the hand, deck, and each other.
      </p>

      <h3 id='rush'>Rush</h3>
      <p>
        Rush decks are great at killing your opponent fast with cheap cards.
        Northsea Dog is a very good card for those willing to use it, and First
        Mutineer can grant much needed discard in order to trigger Northsea
        Dog’s effect as well as being a solid runner. Freebooters is also usable
        for transitioning into the mid-game with some hand refill, but may
        threaten your First Mutineer + Northsea Dog combo at times. No other
        pirate synergy is all that effective for rush decks, as many pirates are
        too expensive to match a rush game plan.
      </p>
      <p>
        Deck construction should involve many cheap cards, and should avoid
        unnecessary pirates, as they may prevent the First Mutineer + Northsea
        Dog synergy.
      </p>

      <h3 id='stall'>Stall</h3>
      <p>
        The opposite of a rush deck, stall decks seek to control the board and
        stall into the late game. For a late-game pirate deck, Freebooters grant
        a massive card advantage over your opponents, and Snake Eyes assist in
        digging for your big plays. Utilising Lucky Charmers’ synergy is not
        necessary for all slow decks, and can be replaced by any other value
        play/win condition. If you use Lucky Charmers in this style of deck,
        then you will need to add more pirates into the deck to support. If you
        find yourself composing a deck of 8+ pirates, then move to the “Pure”
        strategy.
      </p>

      <h3 id='shuffle'>Shuffle</h3>
      <p>
        Shuffle strategy tends to be really fun to use, but often not played in
        a very serious manner. It uses the shuffle effects of Collector Mirz and
        Havesters of Souls to obtain valuable units, which it the searches for
        using Freebooters, Snake Eyes, and perhaps Goldgrubbers.
      </p>
      <p>
        Deck construction should usually involve a solid quantity of cheap cards
        to improve cycle speed, and it is even possible to include the First
        Mutineer + Northsea Dog combo in this deck type as well.
      </p>

      <h3 id='pure'>Pure</h3>
      <p>
        The previous strategies are simply regular deck archetypes that use a
        small handful of pirates for their benefits. “Pure” pirate decks, on the
        other hand, are the most clearly recognizable “pirate decks” that seek
        to capitalise on *all* of pirate strengths. Because this is the most
        “piratey” kind of deck, I will walk through it with more detail.
      </p>
      <p>
        “Pure” pirate decks tend to have at least 8 or more pirate cards in
        them. The reason is to maximise the value and reliability of Lucky
        Charmers, which is the main focus of a “pure” pirate deck. Pirates tend
        to have rather high costs, so when making a deck with so many, it's
        important that you make your non-pirate cards fill in the early curve
        and push your frontline in preparation for later turns (examples include
        Dopplebocks, Gifted Recruits, Green Prototypes, Destructobots, Wild
        Saberpaws, etc.). Ideally you have 3 or 4 cards that cost 2 or less, and
        no more than 2 cards costing 6+ mana.
      </p>
      <p>
        Once you have constructed a “pure” pirate deck, you will then need to
        know how to play it. Here is a summary of each turn based on mana value,
        and what you should be attempting to accomplish each turn:
      </p>

      <h4>3-5 Mana</h4>

      <p>
        The first few turns have a good chance at winning the game for you,
        during these turns you should try to:
      </p>
      <ul>
        <li>Use all your mana each turn.</li>
        <li>Put strength on the board to preserve your line.</li>
        <li>
          Cycle cards to put Lucky Charmers and Snake Eyes in your hand (Lucky
          is more important).
        </li>
        <li>Play, discard, or redraw all of your non-Pirates.</li>
        <li>Have units in any of the following positions:</li>
      </ul>

      <Board id='LCwsLCwyTjE0QjEsNVQzQjEsLCwxTjVCMSw0TjNCMSwsLCwsLCwsLDtSMTBOLUIxME47M00wOzs=' />

      <p>All of this is in preparation for the next turn.</p>

      <h4>6 Mana</h4>
      <p>
        This is the turn that will end most battles and your goals are simple:
      </p>
      <ol>
        <li>
          Play Lucky Charmers next to the enemy base in a way that it is
          protected.
        </li>
        <li>Redraw a card.</li>
        <li>Obtain Snake Eyes and 2-movement units.</li>
      </ol>

      <p>
        This move may be especially effective for a deck that might not have
        been expecting it. You can often trick your opponents by focusing on
        your non-pirate cards and some of the more general use ones (like
        Westwind Sailors) and subverting their expectations as to what they need
        to react to.
      </p>
      <p>
        If attacking may cost you your life, you might choose to defend instead.
      </p>
      <p>
        If you can't put it on the base, or don't have a full hand of pirates
        that's fine, although you might consider waiting another turn. Do
        remember though: playing other cards and waiting may result in drawing
        some of your non-Pirates back into your hand.
      </p>

      <h4>7+ Mana</h4>
      <p>
        Assuming your opponent has not conceded or died, your next goals should
        be:
      </p>
      <ol>
        <li>Rush if you can finish them off.</li>
        <li>
          Play Snake Eyes (Only if you have a good board presence), followed by
          cheap non-Pirates (this is why you want them at 1 or 2 mana).
        </li>
        <li>Cycle as many cards as possible.</li>
      </ol>
      <p>
        The purpose of Snake Eyes and the cycling is to get Lucky Charmers back
        in your hand as soon as possible. If you are lucky (pun intended), you
        should be able to play it by the 8- or 9-mana turn.
      </p>
      <p>
        Repeat this process: Lucky Charmers then cycle, Lucky Charmers, cycle,
        Lucky Charmers and so on until you win.
      </p>

      <h3>Hybrid</h3>
      <p>
        A Hybrid deck is one that combines the “pure” pirate strategy of playing
        a high value Lucky Charmers and cycling them back into your hand, as
        well as the strategy of another deck. Attempts to do this are often not
        the most successful since the deck tends to be worse than the sum of its
        parts.
      </p>
      <p>
        Examples include: dragon-pirate, structure-pirate, freeze-pirate,
        construct-pirate, etc.
      </p>

      <Title id='summary'>Summary</Title>
      <p>
        Pirates are a unique race in stormbound that sparks unusual strategies.
        It can often be hard to use pirates to their full effectiveness, but
        with practice, you will be able to predict and abuse card drawing and
        cycling, and subvert the expectations of your opponent to your own
        benefit.
      </p>
    </Guide>
  )
})
