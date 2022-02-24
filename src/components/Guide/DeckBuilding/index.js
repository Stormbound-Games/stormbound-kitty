import React from 'react'
import Card from '~/components/Card'
import HorizontalRule from '~/components/HorizontalRule'
import Link from '~/components/Link'
import Notice from '~/components/Notice'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'
import getResolvedCardData from '~/helpers/getResolvedCardData'

export default React.memo(function GuideDeck(props) {
  return (
    <>
      <p>
        So, you want to build or improve your deck! You came to the right place.
        In this guide, I will explain everything you need to know to compose
        solid and competitive decks. First, let’s run a basic breakdown before
        diving into the topic.
      </p>

      <ul>
        <li>A deck has 12 cards in it.</li>
        <li>
          Your first turn will be 3 or 4 mana depending on whether you play
          first or second, then 4 or 5 mana.
        </li>
        <li>
          You draw 4 cards each turn and can (and usually should) cycle one each
          turn.
        </li>
      </ul>

      <HorizontalRule />

      <TableOfContents>
        <li>
          <Link href='#cost'>Cost</Link>
        </li>
        <li>
          <Link href='#win-conditions'>Win conditions</Link>
        </li>
        <li>
          <Link href='#capabilities'>Capabilities</Link>
        </li>
        <li>
          <Link href='#synergies'>Synergies</Link>
        </li>
        <li>
          <Link href='#core'>Core</Link>
        </li>
        <li>
          <Link href='#redundancies'>Redundancies</Link>
        </li>
      </TableOfContents>

      <Title id='cost'>Cost</Title>

      <p>
        If you have more than 4 cards in your deck which cost 4 mana or greater
        on the first turn, you run a moderate chance of having one, or worse,
        two turns doing nothing.
      </p>

      <p>
        Furthermore, if you sport too many spells, you may have a first turn
        which, while technically affordable, has no valid targets, or won’t
        advance your front line.
      </p>

      <p>
        Consider what would be the earliest turn for you to play a full hand of
        4 cards. For some, it is a disgusting low 5 mana (
        <CardLink id='N1' />, <CardLink id='N2' />, <CardLink id='W1' />,{' '}
        <CardLink id='W2' />
        ), for others it won’t happen before 12 mana (4×3 mana cost cards for
        instance).
      </p>

      <p>
        Usually (albeit not always), playing more cards is more advantageous
        than playing a big one.
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <Row>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'N1', level: 1 })} />
              </Row.Column>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'N2', level: 1 })} />
              </Row.Column>
            </Row>
          </Row.Column>
          <Row.Column>
            <Row>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'W1', level: 1 })} />
              </Row.Column>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'W2', level: 1 })} />
              </Row.Column>
            </Row>
          </Row.Column>
        </Row>
      </PageEmbed>

      <Title id='win-conditions'>Win Conditions</Title>

      <p>
        There are three ways to actually win, ranked below as most-to-least
        effective:
      </p>

      <ol>
        <li>Direct damage to the base (“chip”) </li>
        <li>Two-cells movement units (“rushers”)</li>
        <li>Growth (high-strength units)</li>
      </ol>

      <p>
        You must have at least one of these if you plan on reliably achieving
        victory!
      </p>

      <Spacing vertical='LARGE'>
        <Row>
          <Row.Column width='1/3'>
            <Card {...getResolvedCardData({ id: 'S13', level: 5 })} />
          </Row.Column>
          <Row.Column width='1/3'>
            <Card {...getResolvedCardData({ id: 'N28', level: 5 })} />
          </Row.Column>
          <Row.Column width='1/3'>
            <Card {...getResolvedCardData({ id: 'N54', level: 5 })} />
          </Row.Column>
        </Row>
      </Spacing>

      <Title id='capabilities'>Capabilities</Title>

      <p>
        First and foremost, you need some units who can advance the front
        line—if they don’t on play, they will on the next. Structures can’t
        walk, and take up available space on the board. Advancing the front line
        gives more space to play more cards.
      </p>

      <p>
        Single movement units can clear up space, but they don’t share the
        front. Units which block the front, and help hold the front, are
        necessary. Structures <em>hold</em> the front, but won’t advance it;
        however they are immune to poisoning and freezing, as well as a number
        of attack effects and spells.
      </p>

      <p>
        Secondly, you need your game winner, as mentioned above. You must have
        at least one of these in your deck—you cannot expect to reliably stall
        out and casually pass some units through for the win. Not reliably at
        least.
      </p>

      <p>
        Thirdly, you need some means to deal with hard to reach, or clusters of,
        enemies such as <CardLink id='N21' />, <CardLink id='N11' />,{' '}
        <CardLink id='N47' />, <CardLink id='N29' />, etc. These cards can keep
        you in the game and are necessary. You need at least one, in some form.
        If they are cheap (3 or less) these are the cards you consider holding
        for a turn or two when cycling, in case you need them.
      </p>

      <p>
        Between these controls and the ability of immobile units to simply
        absorb the opponent’s big units, big units are the least reliable game
        winner.
      </p>

      <Title id='synergies'>Synergies</Title>

      <p>
        This is about how cards work together in combination. Try and find a
        few. Some will be obvious such as <CardLink id='S1' /> &{' '}
        <CardLink id='S9' />, <CardLink id='I2' /> & <CardLink id='I19' />,{' '}
        <CardLink id='F2' /> & <CardLink id='F11' />, <CardLink id='W2' /> &{' '}
        <CardLink id='W4' />…
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <Row>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'S1', level: 1 })} />
              </Row.Column>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'S9', level: 1 })} />
              </Row.Column>
            </Row>
          </Row.Column>
          <Row.Column>
            <Row>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'I2', level: 1 })} />
              </Row.Column>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'I19', level: 1 })} />
              </Row.Column>
            </Row>
          </Row.Column>
        </Row>
        <Row isDesktopOnly>
          <Row.Column>
            <Row>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'F2', level: 1 })} />
              </Row.Column>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'F11', level: 1 })} />
              </Row.Column>
            </Row>
          </Row.Column>
          <Row.Column>
            <Row>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'W2', level: 1 })} />
              </Row.Column>
              <Row.Column>
                <Card {...getResolvedCardData({ id: 'W4', level: 1 })} />
              </Row.Column>
            </Row>
          </Row.Column>
        </Row>
      </PageEmbed>

      <p>
        Some are less obvious, but still extraordinarily useful: for instance{' '}
        <CardLink id='I1' /> detonating a <CardLink id='I12' /> to drive back
        the opponent’s front.
      </p>

      <p>
        <CardLink id='N9' /> synergizes remarkably well with a number of cards,
        such as <CardLink id='I16' />, <CardLink id='F17' />,{' '}
        <CardLink id='S12' />, <CardLink id='N38' />, and so on while also
        taking care of big units.
      </p>

      <p>
        When building your deck, try to make sure you have multiple synergies
        available (i.e. <CardLink id='I8' /> to combo with <CardLink id='N1' />{' '}
        & <CardLink id='I6' />) <strong className='Highlight'>and</strong> not
        just one (i.e. running <CardLink id='W1' /> in a deck with only{' '}
        <CardLink id='W2' /> to freeze, or <CardLink id='N43' /> with only{' '}
        <CardLink id='N10' />
        ).
      </p>

      <Title id='core'>Core</Title>

      <p>Given that:</p>

      <ul>
        <li>a deck is composed of 12 cards</li>
        <li>
          you will have 3 or 4 mana on your first turn (4 or 5 on the next)
        </li>
        <li>
          you want to be able to connect multiple card plays as early as
          possible
        </li>
        <li>you draw 4 cards each turn</li>
        <li>and can (and usually should) cycle one each turn</li>
      </ul>

      <p>
        … there is a 1/12 chance that any card will be in your hand. But since
        you draw a third of the deck (4 out of 12) into your hand, from turn 1
        you have a 1/3 chance that any given card is among the 4/12 that makes
        your starting hand. Since the game does not allow for multiples
        occurrences of the same card in a hand at one time—if you do not have
        the card you would like, then the likelihood of getting it when cycling
        is significantly greater.
      </p>

      <p>
        <strong className='Highlight'>
          Your first turn gives you 3 or 4 mana
        </strong>{' '}
        (depending on who goes first). The number of cards you can play at 3
        mana are any which cost 3 or less.
      </p>

      <p>
        You will be able to play multiple cards only if you are using one of the
        few cards which cost 1 mana, and also have a card which costs 2 in the
        same hand. If you do not have one, you can always cycle any other card.
        Efficiency chooses those which cost 5 or more—which you cannot play on
        the following turn.
      </p>

      <p>
        At 4 mana, you can play 2×2 cost cards, or any 1 man card and either a 3
        2-, 3-, and even 4-mana cards can be played together with 1-mana cards
        when you have 5 mana available, that is 2 turns into the game. Combos
        can and should be built and active by this point.
      </p>

      <p>
        You won’t be able to play two 3-mana cards together before you have 6
        mana. Anything costing more is still several turns away. Cycle them
        until the timing is perfect.
      </p>

      <p>
        These low-cast cards make up the core of your deck, as you will be able
        to play them every turn since the first.
      </p>

      <Title id='redundancies'>Redundancies</Title>

      <p>
        Are you running multiple cards which do the same thing? Do you really
        need <CardLink id='N36' /> <em>and</em> <CardLink id='F14' />?{' '}
        <CardLink id='N29' /> <em>and</em> <CardLink id='N18' />?
      </p>

      <p>
        Or are some of your cards strongly lacking synergy? <CardLink id='F4' />{' '}
        is risky in a deck which relies on growth, or which can’t place 0
        movement, low cost units to detonate it.
      </p>

      <p>
        If you are running a deck which focuses on growth (i.e.{' '}
        <CardLink id='N15' />, <CardLink id='I11' />, <CardLink id='N20' />,
        etc.) then focus on units over structures or spells (i.e.{' '}
        <CardLink id='N11' />
        rather than <CardLink id='N21' />, <CardLink id='N19' /> rather than{' '}
        <CardLink id='N13' />
        ). Growth is also partially redundant with 2 movement cards as they run
        straight into the opponent’s base before you can use a spell to boost
        them.
      </p>

      <p>
        Note that multiple game winners (i.e. <CardLink id='I15' /> and{' '}
        <CardLink id='I12' />) are not necessarily redundant; however if you
        have 5 of them, your deck is probably too expensive. Try focusing on two
        or three that have synergy with other cards in your deck (2 movement
        cards need a close enough front to run from for instance).
      </p>

      <Notice spacing={{ top: 'LARGEST', bottom: 'NONE' }}>
        Most important advice for last… Have Fun! This is a game. One we play to
        have fun. One with a pleasing aesthetic and strategy. Don’t take it too
        seriously. Just have fun.&nbsp;:)
      </Notice>
    </>
  )
})
