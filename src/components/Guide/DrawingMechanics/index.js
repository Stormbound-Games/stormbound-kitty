import React from 'react'
import { useFela } from 'react-fela'
import Image from 'next/image'
import Link from '~/components/Link'
import Card from '~/components/Card'
import CardBuilderCardDisplay from '~/components/CardBuilderCardDisplay'
import Info from '~/components/Info'
import Only from '~/components/Only'
import PageEmbed from '~/components/PageEmbed'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import CardLink from '~/components/CardLink'
import getInitialCardData from '~/helpers/getInitialCardData'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import styles from './styles'

export default React.memo(function GuideDrawing(props) {
  const { css } = useFela()

  return (
    <>
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

      <Info title='Try it out' icon='stack'>
        <p>
          You can experiment with all the mechanics mentioned in this guide
          directly within the deck dry-runner. Simply open or compose a deck in
          the <Link to='/deck'>deck builder</Link>, then{' '}
          <Only.Desktop>click</Only.Desktop>
          <Only.Mobile>tap</Only.Mobile>{' '}
          <span className='Highlight'>“Practice”</span> in the navigation to
          start.
        </p>
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

      <div className={css(styles.formula)}>
        <Image
          src='/assets/images/formulas/drawing.png'
          alt='f(w) = floor(w * 1.6) + 1'
          width={500}
          height={58}
          layout='intrinsic'
        />
      </div>

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

      <Info
        icon='stack'
        title={
          <>
            Playing a card more than once <Only.Desktop>in a turn</Only.Desktop>
          </>
        }
      >
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
          though the odds are not in favor.
        </p>
      </Info>

      <Title id='queen-of-herds'>Queen of Herds</Title>

      <p>
        Queen of Herds has such an awkward and undisclosed mechanic that it
        deserves having a closer look at how exactly it works.{' '}
      </p>

      <PageEmbed>
        <CardBuilderCardDisplay {...getInitialCardData('S21')} />
      </PageEmbed>

      <p>
        First of all, Queen of Herds <span className='Highlight'>does not</span>{' '}
        respect the cards weight when drawing satyrs from the deck. It uses a
        purely random draw (or two in case of levels 4 and 5). That implies
        playing, say, <CardLink id='S16' />, then playing Queen of Herds, does
        not prevent <CardLink id='S16' /> from being drawn again even though
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
        <PageEmbed>
          <Row>
            <Row.Column width='1/4'>
              <Card {...getResolvedCardData({ id: 'N12', level: 1 })} />
            </Row.Column>
            <Row.Column width='1/4'>
              <Card {...getResolvedCardData({ id: 'N14', level: 4 })} />
            </Row.Column>
            <Row.Column width='1/4'>
              <Card {...getResolvedCardData({ id: 'N22', level: 3 })} />
            </Row.Column>
            <Row.Column width='1/4'>
              <Card {...getResolvedCardData({ id: 'N33', level: 5 })} />
            </Row.Column>
          </Row>
        </PageEmbed>
      </Only.Desktop>

      <ul>
        <li>
          <CardLink id='N12' /> discards a non-pirate card from the hand and
          into the deck. Playing the card itself causes a reweighing, and it is
          assumed (although not confirmed) that the discarded card causes
          another reweighing as well.
        </li>
        <li>
          <CardLink id='N14' /> draws one or two cards (depending on level)
          following the usual weighted random. A reweighing of the deck occurs
          when playing the card itself, like for any other play.
        </li>
        <li>
          <CardLink id='N22' /> discards a non-pirate card from the hand and
          into the deck, then draws a card following the usual weighted random.
          This works similarly to First Mutineer and Freebooters.
        </li>
        <li>
          <CardLink id='N33' />
          —provided it is played as first card of a turn—discards the remaining
          hand and draws 3 or 4 cards following the usual weighted random,
          causing at least 1 reweighing of the deck. It is unclear whether all 3
          cards are discarded at once or sequentially, although the difference
          should be relatively minor (2 reweighing instead of 4).
        </li>
      </ul>

      <Title>Other edge cases</Title>

      <p>
        Finally, let’s have a look at a few last cards with mechanics impacting
        none of which has particularly odd resolution.
      </p>

      <Only.Desktop>
        <Spacing vertical='LARGE'>
          <Row>
            <Row.Column width='1/3'>
              <Card {...getResolvedCardData({ id: 'S3', level: 1 })} />
            </Row.Column>
            <Row.Column width='1/3'>
              <Card {...getResolvedCardData({ id: 'N48', level: 1 })} />
            </Row.Column>
            <Row.Column width='1/3'>
              <Card {...getResolvedCardData({ id: 'N8', level: 1 })} />
            </Row.Column>
          </Row>
        </Spacing>
      </Only.Desktop>

      <p>
        <CardLink id='S3' />
        —which oddly has a pirate-like ability despite being in Swarm of the
        East—is working as one would expect.
      </p>

      <p>
        When played with no bordering enemies, it comes back in the hand
        immediately. Playing the card causes a reweighing of the deck as normal
        and <CardLink id='S3' /> comes back to the hand despite its weight being
        0. This is likely implemented by a “forced-draw” mechanism.
      </p>

      <p>
        <CardLink id='I29' /> works in a very similar fashion. When played
        without an active copy on the board, it comes back to the hand despite
        its weight being 0.
      </p>

      <p>
        <CardLink id='N48' /> simply plays one or two spells from the hand
        (provided they do not cost more than Earyn’s mana cost). Unlike with
        Queen of Herds, these plays do cause a reweighing of the deck (or 2 for
        level 4 and 5). Interestingly enough, the first spell played by{' '}
        <CardLink id='N48' /> will end up with a non-0 weight after the second
        spell is played, which mean it could technically be drawn (although
        unlikely) right away.
      </p>

      <p>
        Finally <CardLink id='N8' /> (and <CardLink id='N38' />) simply add a
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
        play the best turn possible. When playing <CardLink id='N8' /> however,
        you might want to discard <span className='Highlight'>after</span>{' '}
        having played it so the deck gets reweighed with the new token card in
        it, speeding up its first apparition in your hand.
      </p>

      <p>
        When it comes to combos (cards that need to be played together to
        excel), it is recommended not to “break them”. Imagine you have both{' '}
        <CardLink id='W2' /> and <CardLink id='W1' /> in your hand, but there
        are no enemies to freeze with <CardLink id='W2' />. If you end up
        playing or cycling one but not the other, their weights are going to be
        desynchronised, which reduces the likelihood of having them together
        shortly. In such case, it would be wise to cycle <CardLink id='W1' />{' '}
        and play <CardLink id='W2' /> so that both cards end up back in the deck
        with a weight of 0.
      </p>

      <Info title='Try it out' icon='stack'>
        <p>
          You can try all these mechanics and practice your mana curve in the
          deck dry-runner. Simply open or compose a deck in the{' '}
          <Link to='/deck'>deck builder</Link>, then{' '}
          <Only.Desktop>click</Only.Desktop>/<Only.Mobile>tap</Only.Mobile>{' '}
          “Practice” in the navigation to start.
        </p>
      </Info>
    </>
  )
})
