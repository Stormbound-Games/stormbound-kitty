import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import Card from '../Card'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import Guide from '../Guide'
import Info from '../Info'
import Only from '../Only'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import guides from '../../data/guides'
import getInitialCardData from '../../helpers/getInitialCardData'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import './index.css'

const guide = guides.find(g => g.id === 'DRAWING_GUIDE')

export default React.memo(function GuideDrawing(props) {
  return (
    <Guide {...guide}>
      <p>
        In a card game, the algorithm that determines how cards are drawn is
        extremely important. Take a physical card game as an example: if after
        playing a card, it goes at the bottom of the deck, then it implies all
        cards need to be played before a given card can be played again. If on
        the other hand, the deck is shuffled after playing a card, that changes
        the strategy quite a bit.
      </p>

      <p>
        Stormbound uses something called a{' '}
        <span className='Highlight'>“weighted random”</span>. That means each
        card in a deck is assigned a certain weight which determines its chances
        of being drawn. In such a system, the higher a card’s weight, the higher
        the chance it gets drawn.
      </p>

      <Info title='Try it out' icon='stack' className='GuideDrawing__Info'>
        You can experiment with all the mechanics mentioned in this guide
        directly within the deck dry-runner. Simply open or compose a deck in
        the <Link to='/deck'>deck builder</Link>, then{' '}
        <Only.Desktop>click</Only.Desktop>
        <Only.Mobile>tap</Only.Mobile>{' '}
        <span className='Highlight'>“Practice”</span> in the navigation to
        start.
      </Info>

      <Title>Initial hand</Title>

      <p>
        At the beginning of a match, an initial routine assigns a weight to all
        cards in the deck in a random way. The logic to do so goes more or less
        like this:
      </p>
      <ol>
        <li>
          The deck is initially shuffled. This is to make sure the weights do
          not match the card order (lowest weight on cheaper cards, and higher
          weights on more expensive ones).
        </li>
        <li>The first card of the shuffled deck is assigned a weight of 0.</li>
        <li>
          Every card is then assigned a weight based on the weight of the
          previous card following the formula: weight × 1.6 + 1 (rounded down).
          As a result, the second card has a weight of 1 (0 × 1.6 + 1) and the
          third card of 2 (1 × 1.6 + 1 rounded down) and so on and so forth.
        </li>
        <li>
          This yields the following weights at the beginning of the game: 0, 1,
          2, 4, 7, 12, 20, 33, 53, 85, 137, 220. These numbers were once
          confirmed by Arano, a former member of the development team.
        </li>
      </ol>

      <img
        className='GuideDrawing__Formula'
        src='/assets/images/formula.png'
        alt='f(w) = floor(w * 1.6) + 1'
      />

      <p>
        From there, 4 cards are drawn with the weighted random to compose the
        initial hand. That means the cards with the weights 220, 137, 85 and 53
        are most likely to be drawn, but that’s not a guarantee.
      </p>

      <Title>Drawing and playing</Title>

      <p>
        There are two main concepts to the hand manipulation:{' '}
        <span className='Highlight'>drawing</span> and{' '}
        <span className='Highlight'>playing</span>. Cycling is just a
        combination of both where a card is “played” into the deck (also known
        as “discarded”) and followed by a card draw.
      </p>

      <p>
        When a card is drawn, its weight is reset to 0. A card with a weight of
        0 cannot be drawn again in a weighted random system, and thus cannot be
        played twice in one turn (see note below for dogmatic accuracy).
      </p>

      <p>
        When a card is played, all the other cards from the deck (not from the
        hand) see their weight increase following the initial formula: current
        weight × 1.6 + 1 (rounded down). As an example, a card with a weight of
        12 would end up with a weight of 20. This is what is called a
        “reweighing of the deck” and has been confirmed by Kuldotha, a former
        member of the development team.
      </p>

      <Info icon='stack' title='Playing a card more than once in a turn'>
        <p>
          It is technically possible for a card to be played more than once
          within the same turn, under rare circumstances which are interesting
          to discuss from an academic standpoint but should probably be ignored
          in a day to day play.
        </p>
        <p>
          For a given card to be played and drawn again in the same turn, an
          intermediary play/cycle needs to happen. Indeed, when a card is
          played, it’s put back into the deck with a weight of 0. Another
          play/cycle will cause a reweighing of the deck, which makes the card’s
          weight non null. From there, a subsequent draw (through card ability
          or cycling) can cause the card to be drawn (and played) again even
          though the odds are not in favour.
        </p>
      </Info>

      <Title id='queen-of-herds'>Queen of Herds</Title>

      <p>
        Queen of Herds has such an awkward and undisclosed mechanic that it
        deserves having a closer look at how exactly it works.{' '}
      </p>

      <div className='Article__fullwidth'>
        <CardBuilderCardDisplay {...getInitialCardData('S21')} />
      </div>

      <p>
        First of all, Queen of Herds <span className='Highlight'>does not</span>{' '}
        respect the cards weight when drawing satyrs from the deck. It uses a
        purely random draw (or two in case of levels 4 and 5). That implies
        playing, say, <WikiLink id='S28' />, then playing Queen of Herds, does
        not prevent <WikiLink id='S28' /> from being drawn again even though
        there are other satyrs in the deck. It is definitely possible.
      </p>

      <p>
        Additionally, the cards played by Queen of Herds do not cause a
        reweighing of the deck. This means a card played for free by Queen of
        Herds preserves its current weight. If it was high to begin with, it
        stays high and the card is likely to come back in hand shortly.
      </p>

      <Title id='pirates'>Pirates</Title>

      <p>
        Most pirate cards rely on drawing and cycling mechanics. Unlike Queen of
        Herds however, they behave as one would expect, just like normal
        drawing, playing and cycling although there remains some (low-impacting)
        unknowns.
      </p>

      <Only.Desktop>
        <div className='Article__fullwidth' style={{ '--padding': '120px' }}>
          <Row>
            <Column width='1/4'>
              <Card {...getResolvedCardData({ id: 'N12', level: 1 })} />
            </Column>
            <Column width='1/4'>
              <Card {...getResolvedCardData({ id: 'N14', level: 4 })} />
            </Column>
            <Column width='1/4'>
              <Card {...getResolvedCardData({ id: 'N22', level: 3 })} />
            </Column>
            <Column width='1/4'>
              <Card {...getResolvedCardData({ id: 'N33', level: 5 })} />
            </Column>
          </Row>
        </div>
      </Only.Desktop>

      <ul>
        <li>
          <WikiLink id='N12' /> discards a non-pirate card from the hand and
          into the deck. Playing the card itself causes a reweighing, and it is
          assumed (although not confirmed) that the discarded card causes
          another reweighing as well.
        </li>
        <li>
          <WikiLink id='N14' /> draws one or two cards (depending on level)
          following the usual weighted random. A reweighing of the deck occurs
          when playing the card itself, like for any other play.
        </li>
        <li>
          <WikiLink id='N22' /> discards a non-pirate card from the hand and
          into the deck, then draws a card following the usual weighted random.
          This works similarly to First Mutineer and Freebooters.
        </li>
        <li>
          <WikiLink id='N33' /> — provided it is played as first card of a turn
          — discards the remaining hand and draws 3 or 4 cards following the
          usual weighted random, causing at least 1 reweighing of the deck. It
          is unclear whether all 3 cards are discarded at once or sequentially,
          although the difference should be relatively minor (2 reweighing
          instead of 4).
        </li>
      </ul>

      <Title>Other edge cases</Title>

      <p>
        Finally, let’s have a look at a few last cards with mechanics impacting
        the hand and the deck — none of which has particularly odd resolution.
      </p>

      <Only.Desktop>
        <div className='Guide__embed'>
          <Row>
            <Column width='1/3'>
              <Card {...getResolvedCardData({ id: 'S3', level: 1 })} />
            </Column>
            <Column width='1/3'>
              <Card {...getResolvedCardData({ id: 'N48', level: 1 })} />
            </Column>
            <Column width='1/3'>
              <Card {...getResolvedCardData({ id: 'N8', level: 1 })} />
            </Column>
          </Row>
        </div>
      </Only.Desktop>

      <p>
        <WikiLink id='S3' /> — which oddly has a pirate-like ability despite
        being in Swarm of the East — is working as one would expect.
      </p>

      <p>
        When played with no bordering enemies, it comes back in the hand
        immediately. Playing the card causes a reweighing of the deck as normal
        and <WikiLink id='S3' />
        comes back to the hand despite its weight being 0. This is likely
        implemented by a “forced-draw” mechanism.
      </p>

      <p>
        <WikiLink id='N48' /> simply plays one or two spells from the hand.
        Unlike with Queen of Herds, these plays do cause a reweighing of the
        deck (or 2 for level 4 and 5). Interestingly enough, the first spell
        played by <WikiLink id='N48' /> will end up with a non-0 weight after
        the second spell is played, which mean it could technically be drawn
        (although unlikely) right away.
      </p>

      <p>
        Finally <WikiLink id='N8' /> (and <WikiLink id='N38' />) simply add a
        card to the deck with a weight of 0, without causing an extra reweighing
        of the deck. Only the regular reweighing due to card play occurs.
      </p>

      <Title>Strategy</Title>

      <p>
        Stormbound being a game where the player making the most of their mana
        is likely the one to win, it is usually advised to cycle at every turn.
        The idea is that you want to cycle through your deck rapidly so you can
        play your main cards and combos more frequently. The more you cycle, the
        faster you can go through all the cards of your deck.
      </p>

      <p>
        Whether you should cycle before or after your play(s) varies. Cycling
        before is preferable because it gives all the information first hand to
        play the best turn possible. When playing <WikiLink id='N8' /> however,
        you might want to discard <span className='Highlight'>after</span>{' '}
        having played it so the deck gets reweighed with the new token card in
        it, speeding up its first apparition in your hand.
      </p>

      <p>
        When it comes to combos (cards that need to be played together to
        excel), it is recommended not to “break them”. Imagine you have both{' '}
        <WikiLink id='W2' /> and <WikiLink id='W1' /> in your hand, but there
        are no enemies to freeze with <WikiLink id='W2' />. If you end up
        playing or cycling one but not the other, their weights are going to be
        desynchronised, which reduces the likelihood of having them together
        shortly. In such case, it would be wise to cycle <WikiLink id='W1' />{' '}
        and play <WikiLink id='W2' /> so that both cards end up back in the deck
        with a weight of 0.
      </p>

      <hr />

      <Info title='Try it out' icon='stack'>
        You can try all these mechanics and practive your mana curve in the deck
        dry-runner. Simply open or compose a deck in the{' '}
        <Link to='/deck'>deck builder</Link>, then{' '}
        <Only.Desktop>click</Only.Desktop>/<Only.Mobile>tap</Only.Mobile>{' '}
        “Practice” in the navigation to start.
      </Info>
    </Guide>
  )
})
