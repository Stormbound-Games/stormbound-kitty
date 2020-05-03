import React from 'react'
import { Link } from 'react-router-dom'
import WikiLink from '../components/WikiLink'
import DryRunnerExplanation from '../components/DryRunnerExplanation'

export default [
  {
    id: 'general',
    title: 'General',
    entries: [
      {
        id: 'how-to-contribute',
        question: 'How can I contribute/help?',
        answer: (
          <>
            <p>
              First of all, thank you for using Stormbound Kitty, it means a
              lot. If you’d like to help, please kindly report any bug or oddity
              you find, and suggest features to me on Discord (Kitty#1909).
              Finally, consider{' '}
              <a
                href='https://gum.co/stormbound-kitty'
                target='_blank'
                rel='noopener noreferrer'
              >
                buying me a coffee
              </a>
              ! Any small contribution counts. 💖
            </p>
            <p>
              Special thanks Neicigam (Neicigam#0095) for his kind and valuable
              help in various parts of the site, particularly the dry-runner.
            </p>
          </>
        ),
      },
      {
        id: 'chrome-cards-rendering',
        question: 'The cards look odd/broken on Chrome. Why is that?',
        answer: (
          <>
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
          </>
        ),
      },
    ],
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
          <>
            These tools run inside your browser, there is no database behind
            them. When you share something like a sim or card, the data is
            encoded in the URL. For cards, it’s big because of the free-text
            nature of the name, the ability and the URL. If we were to allow
            custom cards in the battle sim, the encoded data would have to
            contain all the custom cards as well. That’s unpractical.
          </>
        ),
      },
      {
        id: 'mobile-drag-and-drop',
        question:
          'Why can’t I benefit from the cool drag-and-drop features on the mobile version of the battle sim?',
        answer: (
          <>
            Drag and drop is not an easy thing to implement on the web, and
            unfortunately it gets even trickier on mobile due to the presence of
            scroll and swipe gestures.
          </>
        ),
      },
      {
        id: 'multi-faction-cards',
        question:
          'Why is it possible to import cards from multiple factions in the battle sim since it’s not allowed in the game?',
        answer: (
          <>
            <p>
              Technically, all cards can be played regardless of faction thanks
              to <WikiLink id='N38' /> and Shadowfen conversion mechanics.
            </p>
            <p>
              Moveover, the battle sim is used a lot for creating puzzles, which
              can be made more or less difficult and/or interesting by making it
              possible to have cards from multiple factions.
            </p>
          </>
        ),
      },
      {
        id: 'adding-a-puzzle',
        question: 'Is it possible to add new puzzles?',
        answer: (
          <>
            <p>
              Puzzles are made by the community, so if you would like to design
              your own and have them added, just get in touch with me on Discord
              (Kitty#1909). The only constraint is that your puzzle need to
              respect the rules in place. It needs to be one of{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/KittySparkles/stormbound-kitty/blob/master/src/constants/puzzles.js#L39-L47'
              >
                these types
              </a>{' '}
              and can include any of{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/KittySparkles/stormbound-kitty/blob/master/src/constants/puzzles.js#L1-L37'
              >
                these restrictions
              </a>{' '}
              (or none).
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'deck-builder',
    title: 'Deck Builder',
    entries: [
      {
        id: 'adding-a-deck',
        question: 'Can I add my own deck to the suggested ones on the site?',
        answer: (
          <>
            <p>
              Provided your deck performs competitively, I would be happy to
              have it featured amongst the suggested decks. Get in touch with me
              on Discord (Kitty#1909) so we can discuss it.
            </p>

            <p>
              Alternatively, if you happen to have basic knowledge of web
              development and have a GitHub account, you can{' '}
              <a
                href='https://github.com/KittySparkles/stormbound-kitty/blob/master/docs/ADDING_A_DECK.md'
                target='_blank'
                rel='noopener noreferrer'
              >
                follow the guide
              </a>{' '}
              and do it yourself.
            </p>
          </>
        ),
      },
      {
        id: 'incorrect-deck-suggestions',
        question:
          'You say my deck should be improved but it works great! Why is that?',
        answer: (
          <>
            The deck suggestions are determined based on heuristics and educated
            guesses. They do not result from a thorough analysis of the decks,
            and they definitely are not based on real game data. They are only
            generic suggestions from experimented players.
          </>
        ),
      },
      {
        id: 'personal-card-collection',
        question:
          'Is it possible to import my cards collection inside the deck builder to have the correct levels and all?',
        answer: (
          <>
            If you took the time to recreate your{' '}
            <Link to='/collection'>card collection</Link>, then you can use it
            in the deck builder! Unfortunately the initial process of importing
            your collection is a little tedious given Paladin Studios does not
            provide a public API for Stormbound which enables us to query
            players’ data.
          </>
        ),
      },
      {
        id: 'cross-faction-decks',
        question:
          'Why is it possible to create cross-faction decks since it’s not allowed in the game?',
        answer: (
          <>
            The point of these tools is not exclusively to reproduce the game
            experience, but to allow players to experiment with ideas and
            concepts and take part in the game’s community. Cross-faction decks
            can be fun to imagine.
          </>
        ),
      },
      {
        id: 'random-deck',
        question: 'How are random decks generated?',
        answer: (
          <>
            The random deck generator is not 100% random, in the sense that it
            doesn’t just pick 12 cards at random. It makes sure the deck doesn’t
            contain too many spells or too many structures, that the mana curve
            is not too steep, and that combos can still work (freeze, poison…).
            Any deck generated like this should be playable, if not competitive.
          </>
        ),
      },
      {
        id: 'dry-runner-mechanics',
        question:
          'Which mechanics are currently implemented in the dry-run simulator?',
        answer: (
          <>
            <DryRunnerExplanation />
          </>
        ),
      },

      {
        id: 'drawing-algorithm',
        question: 'What is the drawing algorithm?',
        answer: (
          <>
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
              Every time a card is drawn or cycled, its weight is reset to 0.
              All the other cards in the deck see their weight increase to f(w)
              = 1.6 * w + 1 (rounded), where w is their previous weight. Some
              cards, such as Queen of Herds, have awkward mechanics.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'collection',
    title: 'Collection',
    entries: [
      {
        id: 'collection-value',
        question: 'What is the total value of the collection?',
        answer: (
          <>
            It is an arbitrary number to measure the value of a{' '}
            <Link to='/collection'>card collection</Link>. It is based on the
            rarity and the amount of copies you have of each card. It also take
            into account the initial crafting cost of all cards, which is why an
            entire collection of cards level 1 with no extra copies is worth
            about 3000 stones.
          </>
        ),
      },
      {
        id: 'books-calculator',
        question: 'How does the book calculator work?',
        answer: (
          <>
            <p>
              The book calculator calculates the probability of not getting
              Fusion Stones (FS) out of a book (other calculations are just
              small variations of this one). To do that, it lays down all the
              different “drawing sequences”: For example, ‘EEELEL’ (Epic, Epic,
              Epic, Legendary, Epic, Legendary) is a valid and likely sequence
              for a Mythic book. So at the core, it is a function that takes a
              drawing sequence and returns the probability of getting this
              sequence and no fusion stones out of a book.
            </p>
            <p>
              To do this, the calculator stores the non-FS cards left in the
              pool it draws from (Epic and Legendary for a Mythic book) and
              iterates over the sequence cards. With the ‘EEELEL’ sequence: The
              first card is an Epic card, with a probability of 0.7 (70%), the
              probability of it not being the FS epic card is 41/42. It
              substracts 1 from the Epic cards count and goes to the next card.
              The second card is an Epic one too, with a probability of 0.7 *
              40/41 since identical cards cannot be redrawn. It then iterates
              over the whole sequence, returns the resulting probability and
              sums over the different sequences to get the total probability of
              not getting fusion stones out of a Mythic book.
            </p>
            <p>
              Of course this is correct only under the assumption that book
              draws work this way.
            </p>
          </>
        ),
      },
    ],
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
          <>
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
          </>
        ),
      },
    ],
  },
  {
    id: 'stories',
    title: 'Stories',
    entries: [
      {
        id: 'adding-a-story',
        question: 'How can I get my own story published?',
        answer: (
          <>
            <p>
              If you would like to contribute to writing the{' '}
              <Link to='/stories'>Stormbound lore</Link> and have your stories
              published on the site, you can contact me on Discord (Kitty#1909).
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    entries: [
      {
        id: 'adding-a-guide',
        question: 'Could I write a guide and have it published?',
        answer: (
          <>
            <p>
              <Link to='/guides'>Guides</Link> are very handy for beginners to
              learn more about the game and get better, so if you’d like to
              write a guide, that’s fantastic! Get in touch with me on Discord
              (Kitty#1909) so we can discuss feasibility.
            </p>
            <p>
              On a similar note, if you happen to find incorrect, misleading or
              outdated information in an existing guide, please let me know so
              we can fix it together.
            </p>
          </>
        ),
      },
    ],
  },
]
