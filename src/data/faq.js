import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import WikiLink from '../components/WikiLink'

export default [
  {
    id: 'general',
    title: 'General',
    entries: [
      {
        id: 'how-to-contribute',
        question: 'How can I contribute/help?',
        answer: (
          <Fragment>
            First of all, thank you for using Stormbound Kitty, it means a lot.
            If you’d like to help, plaese kindly report any bug or oddity you
            find, and suggest features to me on Discord (Kitty#1909). Finally,
            consider{' '}
            <a
              href="https://gum.co/stormbound-kitty"
              target="_blank"
              rel="noopener noreferrer"
            >
              buying me a coffee
            </a>
            !
          </Fragment>
        )
      },
      {
        id: 'chrome-cards-rendering',
        question: 'The cards look odd/broken on Chrome. Why is that?',
        answer: (
          <Fragment>
            <p>
              Chrome has an accessibility setting that prevents text from being
              too small. Because cards need to look “authentic” at any size,
              they use a tiny font size, which might not match that safeguard
              from Chrome.
            </p>

            <p>
              You can deactivate that feature in Chrome’s Settings > Appearance
              > Customise Fonts > Minimum font size. Set it to “tiny”, and
              everything should look good!
            </p>
          </Fragment>
        )
      }
    ]
  },

  {
    id: 'battle-sim',
    title: 'Battle Sim',
    entries: [
      {
        id: 'custom-cards-in-battle-sim',
        question:
          'Why can’t I use cards created with the card builder in my battle sim?',
        answer: (
          <Fragment>
            These tools run inside your browser, there is no database behind
            them. When you share something like a sim or card, the data is
            encoded in the URL. For cards, it’s big because of the free-text
            nature of the name, the ability and the URL. If we were to allow
            custom cards in the battle sim, the encoded data would have to
            contain all the custom cards as well. That’s unpractical.
          </Fragment>
        )
      },
      {
        id: 'mobile-drag-and-drop',
        question:
          'Why can’t I benefit from the cool drag-and-drop features on the mobile version of the battle sim?',
        answer: (
          <Fragment>
            Drag and drop is not an easy thing to implement on the web, and
            unfortunately it gets even trickier on mobile due to the presence of
            scroll and swipe gestures.
          </Fragment>
        )
      },
      {
        id: 'multi-faction-cards',
        question:
          'Why is it possible to import cards from multiple factions in the battle sim since it’s not allowed in the game?',
        answer: (
          <Fragment>
            <p>
              Technically, all cards can be played regardless of faction thanks
              to <WikiLink id="N38" /> and Shadowfen conversion mechanics.
            </p>
            <p>
              Moveover, the battle sim is used a lot for creating puzzles, which
              can be made more or less difficult and/or interesting by making it
              possible to have cards from multiple factions.
            </p>
          </Fragment>
        )
      }
    ]
  },
  {
    id: 'card-builder',
    title: 'Card Builder',
    entries: [
      {
        id: 'card-image-error',
        question:
          'I tried importing an image in the card builder but it failed. Why doesn’t my image work?',
        answer: (
          <Fragment>
            <p>
              There are a couple of reasons why your image could not be loaded.
              One of them is that the website you link it from doesn’t allow it,
              in which case it could be reuploaded somewhere else, or replaced
              with another image.
            </p>

            <p>
              The other possibility is that what you’re linking is not an image
              but a web page containing an image. Make sure to right click on
              the image, then click on something like “Copy image address” to
              the actual URL.
            </p>
          </Fragment>
        )
      }
    ]
  },
  {
    id: 'deck-builder',
    title: 'Deck Builder',
    entries: [
      {
        id: 'incorrect-deck-suggestions',
        question:
          'You say my deck should be improved but it works great! Why is that?',
        answer: (
          <Fragment>
            The deck suggestions are determined based on heuristics and educated
            guesses. They do not result from a thorough analysis of the decks,
            and they definitely are not based on real game data. They are only
            generic suggestions from experimented players.
          </Fragment>
        )
      },
      {
        id: 'personal-card-collection',
        question:
          'Is it possible to import my cards collection inside the deck builder to have the correct levels and all?',
        answer: (
          <Fragment>
            If you took the time to recreate your{' '}
            <Link to="/deck/collection">card collection</Link>, then you can use
            it in the deck builder! Unfortunately the initial process of
            importing your collection is a little tedious given Paladin Studios
            does not provide a public API for Stormbound which enables us to
            query players’ data.
          </Fragment>
        )
      },
      {
        id: 'cross-faction-decks',
        question:
          'Why is it possible to create cross-faction decks since it’s not allowed in the game?',
        answer: (
          <Fragment>
            The point of these tools is not exclusively to reproduce the game
            experience, but to allow players to experiment with ideas and
            concepts and take part in the game’s community. Cross-faction decks
            can be fun to imagine.
          </Fragment>
        )
      }
    ]
  },
  {
    id: 'deck-dry-runner',
    title: 'Deck Dry-Runner',
    entries: [
      {
        id: 'collection-value',
        question: 'What is the total value of the collection?',
        answer: (
          <Fragment>
            It is an arbitrary number to measure the value of a card collection.
            It is based on the rarity and the amount of copies you have of each
            card. It also take into account the initial crafting cost of all
            cards, which is why an entire collection of cards level 1 with no
            extra copies is worth about 2250 stones.
          </Fragment>
        )
      }
    ]
  },
  {
    id: 'cards-collection',
    title: 'Cards Collection',
    entries: [
      {
        id: 'dry-runner-works',
        question: 'How does the dry-runner work?',
        answer: (
          <Fragment>
            The deck dry-runner aims at reproducing in-game drawing and cycling
            mechanics to offer a way to try a deck outside of a game. It can be
            useful to evaluate card cycling, combo efficiency and mana flow.
          </Fragment>
        )
      },
      {
        id: 'drawing-algorithm',
        question: 'What is the drawing algorithm?',
        answer: (
          <Fragment>
            <p>
              Stormbound uses a “weighted random”. That means each card in a
              deck is assigned a certain weight which determines its chances of
              being drawn.
            </p>

            <p>
              At the beginning of the game, an initial routine assigns a weight
              to all cards in the deck in a (truly this time) random way. From
              there, 4 cards are drawn with the usual weighted random to compose
              the initial hand.
            </p>

            <p>
              Every time a card is drawn or cycled, its weight is reseted to 0.
              All the other cards in the deck see their weight increase by
              w=f(w)*1.6 (rounded). Some cards have awkward mechanics such as
              Queen of Herds.
            </p>
          </Fragment>
        )
      }
    ]
  }
]
