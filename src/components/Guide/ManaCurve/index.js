import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import DeckStatsChart from '~/components/DeckStatsChart'
import HorizontalRule from '~/components/HorizontalRule'
import Info from '~/components/Info'
import Only from '~/components/Only'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import TableOfContents from '~/components/TableOfContents'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'
import serialization from '~/helpers/serialization'
import toSentence from '~/helpers/toSentence'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import modifyDeck from '~/helpers/modifyDeck'
import { BRAWLS } from '~/constants/brawl'

const manaBrawls = BRAWLS.filter(brawl => brawl.id.includes('MANA')).map(
  brawl => brawl.label
)

const Graph = props => {
  const cards = serialization.deck
    .deserialize(props.id)
    .map(getResolvedCardData)
  const deck = modifyDeck(cards, props.modifier)

  return (
    <DeckStatsChart
      deck={deck}
      modifier={props.modifier}
      syncId={props.syncId}
    />
  )
}

export default React.memo(function GuideManaCurve(props) {
  const { css } = useFela()

  return (
    <>
      <p>
        <span className='Highlight'>Mana</span>. As explained at length in the{' '}
        <Link to='/guides/complete'>complete guide</Link> and the{' '}
        <Link to='/guides/deck'>deck building guide</Link>, mana management is
        everything in a Stormbound battle. The game essentially boils down to
        who can make the most out of their mana.
      </p>

      <p>
        Making an efficient deck from a mana standpoint is not that trivial
        however. There are a lot of things to take into consideration, and it is
        sometimes difficult to assess the effect of a card and its cost on the
        overall deck.
      </p>

      <Spacing vertical='LARGER'>
        <blockquote>
          <p>
            “Lower your mana curve and add a finisher.”
            <br /> &mdash; Every deck advice ever
          </p>
        </blockquote>
      </Spacing>

      <p>
        In this short guide, we will demystify the so-called “mana curve”, see
        how to analyse it and how to improve it. By the end of it, you should be
        able to understand where mana-related problems lie and how to solve
        them.
      </p>

      <TableOfContents>
        <li>
          <Link href='#anatomy-of-the-graph'>Anatomy of the graph</Link>
        </li>
        <li>
          <Link href='#other-considerations'>Other consideration</Link>
        </li>
        <li>
          <Link href='#brawl-modifiers'>Brawl modifiers</Link>
        </li>
        <li>
          <Link href='#how-it-works'>How it works</Link>
        </li>
      </TableOfContents>

      <HorizontalRule />

      <Info icon='stack' title='Deck Details'>
        <p>
          To analyse the mana curve of <em>your</em> deck, compose it in the{' '}
          <Link to='/deck'>deck builder</Link>, then follow the “Insights” link
          in the navigation to switch to the detail view. You will be offered a
          graph representing the mana curve, as well as some suggestions to
          improve your deck.
        </p>
      </Info>

      <Title id='anatomy-of-the-graph'>Anatomy of the graph</Title>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <Graph id='5xn1n2i1n3n6i5n13i7n18i13i20n39' />{' '}
          </Row.Column>
          <Row.Column>
            <p>
              A mana curve graph is made of two lines: the{' '}
              <span className={css({ color: '#3985af' })}>mana line</span>,
              which represents the{' '}
              <span className='Highlight'>
                likelihood of spending all the available mana
              </span>{' '}
              on a given turn and the{' '}
              <span className={css({ color: 'var(--affordable)' })}>
                cards line
              </span>{' '}
              for the{' '}
              <span className='Highlight'>
                likelihood of playing all 4 cards
              </span>{' '}
              on a given turn.
            </p>
            <p>
              This likelihood is represented as a percentage on the Y axis, from
              0 to 100%. On the opposite axis, the X axis, are the turns, from 3
              mana onwards.
            </p>
            <p>
              The intersection of the two lines marks a decisive point in the
              reading of such graph, as we will see more in detail in the next
              few sections.
            </p>
          </Row.Column>
        </Row>
      </PageEmbed>

      <h3>The mana line</h3>

      <p>
        The mana line (in{' '}
        <span className={css({ color: '#3985af' })}>blue</span>) represents the
        likelihood of spending all the available mana. As the game progresses
        and the allocated mana becomes greater, it becomes less and less likely
        to be able to spend it all. This is because at some point, one has too
        much mana for the cards in hand.
      </p>

      <p>
        The best—not to mention theoretical—mana line is a horizontal line at
        the 100% mark. That would mean spending all the available mana on every
        turn of the game without having any leftover at any turn, regardless of
        how long the game lasts. The only card in the game making it possible to
        spend an infinite amount of mana is Lady Rime, and it is a) impossible
        to have her at every turn and b) not taken into consideration in this
        simulation.
      </p>

      <p>
        <strong className='Highlight'>
          The ideal mana line stays high for as long as possible.
        </strong>{' '}
        The higher it stays, the most mana is being used every turn, which
        translates into better board control or speed.
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <p>
              In the graph <Only.Desktop>on the right</Only.Desktop>
              <Only.Mobile>below</Only.Mobile>, the mana line is steady and very
              high in the first 5 turns, which is very good. It means the first
              few turns will almost always use all the available mana, which is
              what one would want.
            </p>
            <p>
              However, we see that starting turn mana 8, the likelihood of
              having too much mana is getting greater and greater. This is
              indicative of a{' '}
              <Link to='/deck/3xn1n2s1n3s24s2n67s6n15s8n63s11/detail'>
                rush deck
              </Link>
              , which will perform increasingly worse as the game progresses.
            </p>
          </Row.Column>
          <Row.Column>
            <Graph id='3xn1n2s1n3s24s2n67s6n15s8n63s11' />
          </Row.Column>
        </Row>
      </PageEmbed>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <Graph id='1xf2n62n19f24n21n22n41n25n69n44n72n54' />
          </Row.Column>
          <Row.Column>
            <p>
              In the graph <Only.Desktop>on the left</Only.Desktop>
              <Only.Mobile>above</Only.Mobile>, the mana line is incredibly
              spiky. This is a bad sign, as it means one turn out of two will
              have a high chance of wasting some (possibly a lot) of mana.
            </p>
            <p>
              There is virtually no way to spend all mana on the first turn,
              which is not great. The 2nd turn, at 4 mana, is actually great,
              with virtually no way <em>not</em> to spend all mana. Turn 5
              however, which is a critical turn to assert board dominance, is
              fragile and subject to randomness.
            </p>
          </Row.Column>
        </Row>
      </PageEmbed>

      <h3>The cards line</h3>

      <p>
        The cards line (in{' '}
        <span className={css({ color: 'var(--affordable)' })}>green</span>)
        represents the likelihood of playing all 4 cards from the hand in a
        given turn. It is impossible for it to be non-null on the 3-mana turn
        since it would imply one or more of the 4 cards cost 0 mana (which can
        happen in Brawl as we will see later). As the game progresses and the
        allocated mana becomes greater, it becomes more and more likely to be
        able to play all 4 cards from the hand.
      </p>

      <p>
        There again, the best and theoretical cards line is straight and
        sticking to the 100% line, since it would imply being able to play the
        full hand on every turn of the game, since the very beginning of the
        game.
      </p>

      <p>
        <strong className='Highlight'>
          The ideal cards line gets high as quick as possible.
        </strong>{' '}
        This translates into playing a lot of cards, which is usually critical
        for board control and speed.
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <p>
              In the graph <Only.Desktop>on the right</Only.Desktop>
              <Only.Mobile>below</Only.Mobile>, the cards line is stuck at 0%
              for just a few turns, then starts going up increasingly fast.
            </p>
            <p>
              By turn mana 7, it becomes possible—albeit unlikely—to play the
              full hand. Every turn from there makes it more and more likely to
              be able to do so.
            </p>
            <p>
              From turn mana 10 on, the chances of being able to play all 4
              cards are passing over 50% and reach over 90% by turn 13, which
              might potentially be a little late depending on the randomness of
              the cards.
            </p>
          </Row.Column>
          <Row.Column>
            <Graph id='3xn1s1n3n23n4n13s8n63n16s13n39n46' />
          </Row.Column>
        </Row>
      </PageEmbed>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <Graph id='5xn1n2w2n3n4n14n18w13w16w15w19n58' />
          </Row.Column>
          <Row.Column>
            <p>
              In the graph <Only.Desktop>on the left</Only.Desktop>
              <Only.Mobile>above</Only.Mobile>, the cards line is close to null
              on turn mana 7, and jumps to the 40% mark by turn mana 8 thanks to
              Gift of the Wise which grants free mana. This makes it more likely
              to be able to play all cards on that turn and the subsequent ones.
            </p>
            <p>
              It increases relatively slowly, as the ability to play all these
              expensive cards truly relies on Gift of the Wise to begin with. In
              a deck like this, turn mana 8 is decisive and likely make or break
              for the game. That’s why the simulation never cycles Gift of the
              Wise at turn mana 7 if it is in the hand.
            </p>
          </Row.Column>
        </Row>
      </PageEmbed>

      <HorizontalRule />

      <p>
        Both the following graphs are for the{' '}
        <Link to='/deck/1xn3n4n5n11n12n13n16n28n30n32n34n52/detail'>
          same deck
        </Link>{' '}
        (with a{' '}
        <Link to='/deck/1xn3n4n5n9n11n12n13n16n28n30n32n52/detail'>
          single card change
        </Link>
        ).
      </p>
      <p>
        On the first one, we notice a very awkward turn mana 4, with a high
        chance of wasting mana, which is not ideal that early in the game. This
        is indicator of having too many cards costing an odd number of mana
        (namely 3- and 5-drops).{' '}
      </p>
      <p>
        By changing a single 5-drop for a 4-drop, we have greatly smoothened the
        early mana line making for a less random early game.
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <Graph
              id='1xn3n4n5n11n12n13n16n28n30n32n34n52'
              syncId='comparison'
            />
          </Row.Column>
          <Row.Column>
            <Graph
              id='1xn3n4n5n9n11n12n13n16n28n30n32n52'
              syncId='comparison'
            />
          </Row.Column>
        </Row>
      </PageEmbed>

      <Title id='other-considerations'>Other considerations</Title>

      <p>
        It is important to remember that this data visualisation is still just
        an approximation of the real picture. A game of Stormbound involves many
        different mechanics which cannot be efficiently represented with a
        simplistic algorithm.
      </p>

      <p>
        Here are the mechanics that <em>are</em> currently implemented in the
        representation of the mana curve:
      </p>
      <ul>
        <li>
          Cycling the most expensive card when there is not enough mana to play
          the full hand. While this is a little reductive, cycling the card with
          the highest mana cost is not an uncommon move, especially in early
          game where board control is critical.
        </li>
        <li>
          <CardLink id='W12' /> and <CardLink id='W19' /> granting mana. Both of
          these cards have been properly implemented, and their mana gain is
          taken into account in the evaluation of these chances.
        </li>
        <li>
          Not cycling Gift of the Wise at turn mana 7 to make for high-value
          combos at turn mana 8. There again, maybe a little reductive as this
          is situational, but for heavy/mana-ramp decks, having Gift of the Wise
          at turn mana 8 is quite critical to come back from an early push and
          take the board back.
        </li>
        <li>
          Cards which cannot be played on the first turn. This includes{' '}
          <CardLink id='W1' />, <CardLink id='N9' />, <CardLink id='N63' /> and{' '}
          <CardLink id='S10' /> due to lack of enemies, as well as{' '}
          <CardLink id='F4' />, and other potions (which are cheapened in Brawl)
          due to lack of friendly units.
        </li>
      </ul>

      <p>
        This leaves us with the following mechanics yet to be implemented for a
        more accurate depiction of the mana curve: Frozen Core and Dawnsparks
        for mana-ramp Winter decks; Counselor Ahmi for Satyr decks; pirates and
        particularly Freebooters; Collector Mirz and Harvesters of Souls for
        larger-than-12 decks; and finally Archdruid Earyn for free plays.
      </p>

      <Title id='brawl-modifiers'>Brawl modifiers</Title>

      <p>
        A certain amount of Brawls decrease the mana cost of some cards (
        {toSentence(manaBrawls, 'and')}). The spell Brawl in particular makes
        for very interesting graphs which are interesting to look at.
      </p>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <Graph
              id='5xn1n2n23n14w5n18n29n44n48w19w21w23'
              modifier='SPELL_MANA'
            />
          </Row.Column>
          <Row.Column>
            <p>
              The graph <Only.Desktop>on the left</Only.Desktop>
              <Only.Mobile>above</Only.Mobile> for{' '}
              <Link to='/deck/5xn1n2n23n14w5n18n29n44n48w19w21w23/detail'>
                Frostkhan’s Eye Tempest deck
              </Link>{' '}
              is pretty astonishing, because both lines almost intersect on turn
              mana 6, which is incredibly early due to Gift of the Wise only
              costing 6 mana in that Brawl.
            </p>
            <p>
              This means on turn mana 6, it is likely to have played all cards{' '}
              <em>and have leftover mana</em>. Other notable point is that it is
              already possible—although very unlikely—to play all 4 cards at
              turn mana 4.
            </p>
          </Row.Column>
        </Row>
      </PageEmbed>

      <PageEmbed>
        <Row isDesktopOnly>
          <Row.Column>
            <p>
              In the graph <Only.Desktop>on the right</Only.Desktop>
              <Only.Mobile>below</Only.Mobile> from{' '}
              <Link to='/deck/5xn1n2f3n3f8f4n67n9n15f10n40n76/detail'>
                The_mirc’s spell Brawl deck
              </Link>
              , the cards line does not start at 0, which is particularly
              interesting.
            </p>
            <p>
              That means that as the first player, on the very first turn, it is
              already not only possible but also not highly unlikely to play the
              full hand. This is due to the high number of 0-, 1- and 2-mana
              cards in the deck.
            </p>
          </Row.Column>
          <Row.Column>
            <Graph id='5xn1n2f3n3f8f4n67n9n15f10n40n76' modifier='SPELL_MANA' />
          </Row.Column>
        </Row>
      </PageEmbed>

      <Title id='how-it-works'>How it works</Title>

      <p>
        This graph relies on being able to compute the odds of being able to
        spend all available mana, and to play all cards on a single turn. It
        then determine these odds for every turn from 3 until one of them reach
        its extreme (0% for the mana line, 100% for the cards line).
      </p>

      <p>
        For a given turn, it computes all the possible unique hands there can be
        for the deck, which yields 495 sequences of 4 cards. For each hand it
        checks whether it is possible to spend all mana. If it is not because
        there is not enough mana, it cycles the most expensive card (with the
        exception of Gift of the Wise at turn mana 6). From there, it gets 8 new
        hands, and see how many can spend all mana. Eventually, we get to
        retrieve how many hands out of the initial 495 can spend all the
        available mana on a given.
      </p>

      <p>
        Computing the chances of being able to play all 4 cards are very
        similar, and takes account cycling in the same way.
      </p>

      <Spacing top='LARGER'>
        <p>
          <em>
            Special thanks to Troxyz#5675 for the original idea and
            implementation draft, and 123499#2723 for their help with the
            underlying logic and algorithms.
          </em>
        </p>
      </Spacing>
    </>
  )
})
