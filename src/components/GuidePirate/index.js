import React from 'react'
import { Link } from 'react-router-dom'
import CardLink from '../CardLink'
import Guide from '../Guide'
import Title from '../Title'
import getGuide from '../../helpers/getGuide'

const guide = getGuide('PIRATE_GUIDE')

export default React.memo(function GuidePirate(props) {
  return (
    <Guide {...guide}>
      <p>
        Welcome to the Pirate Guide! It is recommended that you read the{' '}
        <Link to='/guides/complete'>complete guide by Arikrat</Link>, it
        contains useful information that will be referenced throughout this
        guide.
      </p>

      <ol style={{ marginTop: '3em', columns: '16em' }}>
        <li>
          <a href='#deck-building'>Deck building</a>
          <ul>
            <li>
              <a href='#core-cards'>Core cards</a>
            </li>
            <li>
              <a href='#filler-cards'>Filler cards</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#meta'>Meta</a>
          <ul>
            <li>
              <a href='#early-game'>Early game</a>
            </li>
            <li>
              <a href='#middle-and-late-game'>Middle and late game</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#combat'>Combat</a>
          <ul>
            <li>
              <a href='#3--to-5-mana-turns'>3- to 5-mana turn</a>
            </li>
            <li>
              <a href='#6-mana-turn'>6-mana turn</a>
            </li>
            <li>
              <a href='#7-mana-turn-and-onward'>7-mana turn and onward</a>
            </li>
          </ul>
        </li>
        <li>
          <a href='#dealing-with-strategy'>Dealing with strategy</a>
          <ul>
            <li>
              <a href='#rush-decks'>Rush decks</a>
            </li>
            <li>
              <a href='#control-stall-decks'>Control/stall decks</a>
            </li>
            <li>
              <a href='#chip-decks'>Chip decks</a>
            </li>
            <li>
              <a href='#poison-convert-decks'>Poison/convert decks</a>
            </li>
            <li>
              <a href='#klaxi-rof-decks'>Klaxi/RoF decks</a>
            </li>
            <li>
              <a href='#beef-decks'>Beef decks</a>
            </li>
            <li>
              <a href='#dragon-decks'>Dragon decks</a>
            </li>
            <li>
              <a href='#pirate-decks'>Pirate decks</a>
            </li>
          </ul>
        </li>
      </ol>

      <Title id='deck-building'>Deck Building</Title>

      <h3 id='core-cards'>Core Cards</h3>

      <p>
        The core of a pirate deck is the pirates, but the most important pirate
        is <CardLink id='N42' />. <CardLink id='N42' /> being the beef and main
        win condition, your main goal when making your pirate deck should be
        making <CardLink id='N42' /> as easy and effective to play as possible.
      </p>

      <p>The core of your deck should consist of the following:</p>

      <ul>
        <li>
          <span className='Highlight'>Beef</span>: <CardLink id='N42' />,{' '}
          <CardLink id='N5' /> (only high mana)
        </li>
        <li>
          <span className='Highlight'>Rush</span>: <CardLink id='N12' />,{' '}
          <CardLink id='N30' />
        </li>
        <li>
          <span className='Highlight'>Cycle</span>: <CardLink id='N33' />,{' '}
          <CardLink id='N22' />, <CardLink id='N14' /> (mostly high mana)
        </li>
        <li>
          <span className='Highlight'>Other</span>: <CardLink id='N16' />,{' '}
          <CardLink id='N19' />
        </li>
      </ul>

      <p>
        Although every pirate is not required for a good pirate deck, it is
        important to note that every pirate removed is a chance at not getting
        max strength <CardLink id='N42' />.
      </p>

      <h3 id='filler-cards'>Filler Cards</h3>

      <p>
        Although there are only ~3 spaces left in your deck, this is where there
        is variation between pirate decks. The best filler cards are cheap
        cards, with good strength and movement. Preferably =/&lt; 2 Mana.
      </p>

      <p>
        Examples include: <CardLink id='N2' />, <CardLink id='N3' />,{' '}
        <CardLink id='N1' />, <CardLink id='N4' />, <CardLink id='N62' />, and
        other cheap faction cards.
      </p>

      <p>
        The flaws with having mostly pirates is it sets your Mana curve rather
        high. This is one reason that your filler should be cheap, there are
        more reasons that I will come back to later.
      </p>

      <Title id='meta'>Meta</Title>

      <h3 id='early-game'>Early game</h3>

      <p>
        The strategy of a pirate deck changes significantly at level 1 and 2,
        and it is not very favorable. I would not recommend a full pirate deck
        to new players, rather just toss <CardLink id='N12' /> and{' '}
        <CardLink id='N5' />
        in your deck and it will likely give you some value.
      </p>

      <h3 id='middle-and-late-game'>Middle and late game</h3>

      <p>
        At level 3+, the pirate deck begins to show its true colors. A good
        pirate deck has 2 win conditions, those being beefy units and 2-movement
        units. Make sure to upgrade your cards, as pirate decks get
        significantly stronger every upgrade.
      </p>

      <Title id='combat'>Combat</Title>

      <p>
        Thanks to the pirates abilities to cycle cards, there is a good optimal
        strategy for the first few turns, I will go over what your goals should
        be at each point in the game.
      </p>

      <h3 id='3--to-5-mana-turns'>3- to 5-mana turns</h3>

      <p>
        The first few turns have a good chance at winning the game for you,
        during these turns you should try to:
      </p>

      <ol>
        <li>Use all your mana each turn</li>
        <li>Put strength on the board</li>
        <li>
          Cycle cards to put <CardLink id='N42' /> and <CardLink id='N33' /> in
          your hand (<CardLink id='N42' /> is more important)
        </li>
        <li>Play, discard, or redraw all of your non-pirates</li>
        <li>Have units in any of the following positions:</li>
      </ol>

      <img
        src='https://i.imgur.com/czp7VjD.png'
        alt='Optimal position for finishing move with pirates'
      />

      <p>All of this is in preparation for the next turn.</p>

      <h3 id='6-mana-turn'>6-mana turn</h3>

      <p>
        This is the turn that will end most battles and your goals are simple:
      </p>

      <ol>
        <li>
          Play <CardLink id='N42' /> next to the enemy base in a way that it is
          protected
        </li>
        <li>Redraw a card</li>
        <li>
          Obtain <CardLink id='N33' /> and 2-movement units
        </li>
      </ol>

      <p>
        If attacking may cost you your life, you might choose to defend instead.
      </p>

      <p>
        If you can’t put it on the base, or don’t have a full hand of pirates
        that’s fine, although you might consider waiting another turn. Do
        remember though: playing other cards and waiting may result in drawing
        some of your non-pirates back into your hand.
      </p>

      <h3 id='7-mana-turn-and-onward'>7-mana turn and onward</h3>

      <p>
        Assuming your opponent has not conceided or died, your next goals should
        be:
      </p>

      <ol>
        <li>Rush if you can finish them off</li>
        <li>
          Play <CardLink id='N33' /> (only if you have a good board presence),
          followed by cheap non-pirates (this is why you want them at 1 or 2
          mana)
        </li>
        <li>Cycle as many cards as possible</li>
      </ol>

      <p>
        The purpose of <CardLink id='N33' /> and the cycling is to get{' '}
        <CardLink id='N42' /> back in your hand as soon as possible. If you are
        Lucky, you should be able to play it by the 8 or 9-mana turn.
      </p>

      <p>
        Repeat this process: <CardLink id='N42' /> then cycle,{' '}
        <CardLink id='N42' />, cycle, <CardLink id='N42' /> and so on until you
        win.
      </p>

      <p>
        As you get higher and higher in mana costs, you will also be able to get
        more value out of <CardLink id='N5' /> and <CardLink id='N14' />.
        Pirates do fairly well in the late game.
      </p>

      <Title id='dealing-with-strategy'>Dealing with strategy</Title>

      <p>
        Pirate decks are alright early game, if you’re lucky you can even have
        an amazing early game. Pirates also get progressively stronger up to a
        very high mana amount. Here’s what to do against various strategies.
      </p>

      <h3 id='rush-decks'>Rush decks</h3>

      <p>
        Just make sure they don’t get any closer than the middle mane, if you
        are placing <CardLink id='N42' />, you can let them get a little closer.
        Be weary of <CardLink id='N52' /> and Herald’s Hymn.
      </p>

      <h3 id='control-stall-decks'>Control/stall decks</h3>

      <p>
        Be fast, place <CardLink id='N42' /> before they get a good spot on the
        board. If they freeze it, try to prevent future freezing and do as much
        rush damage as possible.
      </p>

      <p>
        Avoid late game as much as possible, Visions of the Grove and Lady Rime
        will ruin your day.
      </p>

      <h3 id='chip-decks'>Chip decks</h3>

      <p>Same as normal, avoid rush damage, never be vulnerable.</p>

      <h3 id='poison-convert-decks'>Poison/convert decks</h3>

      <p>
        Use beefy units to get them to use <CardLink id='F15' /> early, then use
        <CardLink id='N42' />. Or just go for it and hope for the best.
      </p>

      <p>
        Just make sure they don’t convert all of your units and keep your
        frontline up for <CardLink id='N42' />.
      </p>

      <h3 id='klaxi-rof-decks'>Klaxi/RoF decks</h3>

      <p>
        <CardLink id='F23' /> likely won’t be an issue, just kill as many frogs
        as you can whilst putting strength on the board.
      </p>

      <h3 id='beef-decks'>Beef decks</h3>

      <p>
        Your beef is faster than theirs, just rush for <CardLink id='N42' /> on
        base.
      </p>

      <h3 id='dragon-decks'>Dragon decks</h3>

      <p>
        Kill as many dragons as possible, don’t let them get close but be sure
        to leave an opening by their base for <CardLink id='N42' />.
      </p>

      <h3 id='pirate-decks'>Pirate decks</h3>

      <p>
        You can identify a pirate deck if they play quite a few pirates, or they
        use generic cards. Don’t let them have a good spot for{' '}
        <CardLink id='N42' />, and make sure your <CardLink id='N42' /> is
        closer to their base then theirs is to yours.
      </p>

      <p>
        Hope for the best when fighting pirates and remember that they will have
        similar cards to you. And if you are fighting MooreFunn though, you
        might as well concede while you still can.
      </p>
    </Guide>
  )
})
