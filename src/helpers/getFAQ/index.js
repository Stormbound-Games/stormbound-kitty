import React from 'react'
import Link from '~/components/Link'
import CardLink from '~/components/CardLink'
import DryRunnerExplanation from '~/components/DryRunnerExplanation'
import getRawCardData from '~/helpers/getRawCardData'
import { UNVALUED_CARDS } from '~/constants/misc'

const getFAQ = () => [
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
              First of all, thank you for using Stormbound-Kitty, it means a
              lot. If you’d like to help, please kindly report any bug or oddity
              you find, and suggest features to me on Discord (Kitty#1909).
              Finally, consider <Link to='/about'>buying me a coffee</Link>! Any
              small contribution counts. 💖
            </p>
            <p>
              Special thanks <Link to='/members/neicigam'>Neicigam</Link>{' '}
              (Neicigam#0095), <Link to='/members/jumboduck'>Jumboduck</Link>{' '}
              (Jumboduck#8771), <Link to='/members/arthisroo'>ArthisRoo</Link>{' '}
              (ArthisRoo#7189) for their kind and valuable help with the
              dry-runner, the deck advice and overall maintenance respectively.
            </p>
          </>
        ),
      },
      {
        id: 'are-you-from-sheepyard',
        question: 'Are you working for Sheepyard?',
        answer: (
          <>
            <p>
              Yes and no. I am contracting for Sheepyard on a monthly basis for
              authoring and publishing the{' '}
              <Link to='/releases'>release notes</Link> for the game. It is a
              mutually beneficial partnership: Sheepyard gets to use this
              relatively well-known site for official announcements, and I get
              paid for the work I do on official communication.
            </p>
            <p>
              That being said, Sheepyard only pays for the work I do on release
              notes. Literally everything else on the site is pro-bono work from
              my side. You can learn more about it and how to help in the{' '}
              <Link to='/about'>about page</Link>.
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
              You can deactivate that feature in Chrome’s Settings → Appearance
              → Customize Fonts → Minimum font size. Set it to “tiny”, and
              everything should look good!
            </p>
          </>
        ),
      },
      {
        id: 'where-to-get-all-cards-data',
        question: 'Where can I get all the cards’ data?',
        answer: (
          <>
            <p>
              If you are looking for a way to consume all the cards’ data to
              build something related to Stormbound (a Discord bot, a tool…),
              you can get{' '}
              <Link href='https://github.com/KittySparkles/stormbound-kitty/blob/main/src/data/cards.json'>
                the JSON file
              </Link>{' '}
              I maintain from GitHub. It contains all cards in the game in their
              current state in a rather digestible format. Values varying across
              levels such as strength are authored as strings and might have to
              be unpacked manually (e.g. <code>1/2/3/4/5</code>).
            </p>
            <p>
              Regarding{' '}
              <Link href='https://github.com/KittySparkles/stormbound-kitty/tree/main/public/assets/images'>
                images
              </Link>
              (such as cards’ art), feel free to hot-link them from the site to
              avoid having to host them yourself. Please, be mindful of
              bandwidth though (although it will mostly likely be fine).
            </p>
          </>
        ),
      },
    ],
  },

  {
    id: 'battle-sim',
    title: 'Battle Simulator',
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
            nature of the name, the ability and the image URL (if any). If we
            were to allow custom cards in the battle sim, the encoded data for a
            sim would have to contain all the custom cards’ data as well. That’s
            unpractical.
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
              to <CardLink id='N38' /> and Shadowfen conversion mechanics.
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
              <Link href='https://github.com/KittySparkles/stormbound-kitty/blob/main/src/constants/puzzles.js#L39-L47'>
                these types
              </Link>{' '}
              and can include any of{' '}
              <Link href='https://github.com/KittySparkles/stormbound-kitty/blob/main/src/constants/puzzles.js#L1-L37'>
                these restrictions
              </Link>{' '}
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
        id: 'game-deck-id',
        question: 'Are the deck IDs the same on the site and in the game?',
        answer: (
          <>
            <p>
              They are not, as the site had deck IDs as far back as March 2019,
              while the game didn’t offer that feature until November 2021. They
              are also not directly compatible since the card IDs they rely on
              are different between the site and the game. For instance,{' '}
              <CardLink id='N1' />’ ID is <code>N1</code> on the site, but{' '}
              <code>u007</code> in Stormbound. Additionally, Stormbound’s deck
              IDs do not include card levels, because they are always inferred
              by the player’s collection, which is not the case for decks on the
              site.
            </p>
            <p>
              That being said, the <Link to='/deck'>deck builder</Link> provides
              a way to import a deck ID <strong>from</strong> the game, and its
              share feature also provides the deck ID <strong>for</strong> the
              game, so it can be pasted into Stormbound. This way, you can
              import your decks from the game to analyse and perfect them onto
              the site, then back into the game once you’re happy with them.
            </p>
          </>
        ),
      },
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
              <Link href='https://github.com/KittySparkles/stormbound-kitty/blob/main/docs/ADDING_A_DECK.md'>
                follow the guide
              </Link>{' '}
              and do it yourself.
            </p>
          </>
        ),
      },
      {
        id: 'incorrect-deck-advice',
        question:
          'You say my deck should be improved but it works great! Why is that?',
        answer: (
          <>
            The deck advice are determined based on heuristics and educated
            guesses. They do not result from a thorough analysis of the decks,
            and they definitely are not based on real game data. They are only
            generic suggestions from experienced players.
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
        id: 'advanced-search',
        question: 'What is the advanced card search?',
        answer: (
          <>
            <p>
              The advanced card search (also present in the collection manager)
              relies on some sort of “tokens”. For instance,{' '}
              <code>is:epic</code> will filter out all non-epic cards.{' '}
              <code>is:wp</code> shows winter cards only. And the nice thing
              about this is that they are cumulative. So{' '}
              <code>is:epic is:wp is:dragon</code> yields Yowling Weavers for
              instance.
            </p>
            <p>Here is a list of all filters available:</p>
            <ul>
              <li>
                Race filters: <code>is:&lt;race&gt;</code> (e.g.{' '}
                <code>is:feline</code>)
              </li>
              <li>
                Faction filters: <code>is:&lt;faction&gt;</code> (e.g.{' '}
                <code>is:winter</code>, including aliases like <code>sf</code>,{' '}
                <code>ic</code>, <code>wp</code>…)
              </li>
              <li>
                Rarity filters: <code>is:&lt;rarity&gt;</code> (e.g.{' '}
                <code>is:epic</code>)
              </li>
              <li>
                Type filters: <code>is:&lt;type&gt;</code> (e.g.{' '}
                <code>is:spell</code>)
              </li>
              <li>
                Modifier filters: <code>is:hero</code> and <code>is:elder</code>
              </li>
              <li>
                Strength (<code>str</code> or <code>strength</code>), mana (
                <code>man</code> or <code>mana</code>), movement (
                <code>move</code>, <code>movement</code>, <code>spe</code> or{' '}
                <code>speed</code>) filters:{' '}
              </li>
              <ul>
                <li>
                  with a static value: <code>mana:4</code>
                </li>
                <li>
                  above a certain value: <code>mana:4+</code>/
                  <code>mana:&gt;4</code>
                </li>
                <li>
                  below a certain value: <code>mana:4-</code>/
                  <code>mana:&lt;4</code>
                </li>
                <li>
                  within 2 specific values: <code>mana:4-6</code>
                </li>
              </ul>
              <li>
                Ability filters: <code>has:&lt;ability&gt;</code> (e.g.{' '}
                <code>has:freeze</code>, <code>has:drain</code>)
              </li>
            </ul>
            <p>
              Currently <span className='Highlight'>not</span> supported:
            </p>
            <ul>
              <li>
                Negative filters, such as looking for cards that are{' '}
                <span className='Highlight'>not</span> something{' '}
              </li>
              <li>
                Level/status filters—right now the search is collection-agnostic
              </li>
            </ul>
            <p>
              All in all, it should be relatively resilient. In theory, you
              cannot really break it per se. Worst case scenario, your search is
              not understood or non-sensical (e.g.{' '}
              <code>is:winter is:shadowfen</code>) and no results are returned.
            </p>
          </>
        ),
      },
      {
        id: 'dry-runner-mechanics',
        question:
          'Which mechanics are currently implemented in the dry-run simulator?',
        answer: <DryRunnerExplanation />,
      },
    ],
  },
  {
    id: 'collection',
    title: 'Collection',
    entries: [
      {
        id: 'collection-benefits',
        question:
          'What is the point of maintaining my card collection on the site?',
        answer: (
          <>
            <p>
              While it is understandably cumbersome to initially create one’s
              collection on the site, it eventually offers quite some
              interesting benefits:
            </p>
            <ul>
              <li>
                The <Link to='/deck'>deck builder</Link> will automatically load
                cards at the correct level.
              </li>
              <li>
                The <Link to='/deck/featured'>featured decks</Link> will order
                decks by feasibility based on your cards.
              </li>
              <li>
                The <Link to='/calculators/books'>book odds calculator</Link>{' '}
                will display how many coins you can expect per book.
              </li>
              <li>
                The <Link to='/card'>card builder</Link> will offer a nice
                display with possible upgrades for your cards.
              </li>
              <li>
                The <Link to='/collection/stats'>collection stats</Link> offer
                handy data visualisation of your collection.
              </li>
            </ul>
          </>
        ),
      },
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
    ],
  },
  {
    id: 'calculators',
    title: 'Calculators',
    entries: [
      {
        id: 'books-calculator',
        question: 'How does the book calculator work?',
        answer: (
          <>
            <p>
              First of all, the{' '}
              <Link to='/calculators/books'>book calculator</Link> is only an
              approximate simulation based on available information. This is in
              no way a guarantee, and any suggested outcome shared by the
              calculator should be taken with a grain of salt.
            </p>
            <p>
              It calculates the probability of not getting fusion stones out of
              a book (other calculations are just small variations of this one).
              To do that, it lays down all the different “drawing sequences”:
              For example, ‘EEELEL’ (Epic, Epic, Epic, Legendary, Epic,
              Legendary) is a valid and likely sequence for a Mythic Tome. So at
              the core, it is a function that takes a drawing sequence and
              returns the probability of getting this sequence and no fusion
              stones out of a book.
            </p>
            <p>
              To do this, the calculator stores the non-FS cards left in the
              pool it draws from (Epic and Legendary for a Mythic Tome) and
              iterates over the sequence cards. With the ‘EEELEL’ sequence: The
              first card is an Epic card, with a probability of 0.7 (70%), the
              probability of it not being the FS epic card is 41/42. It
              substracts 1 from the Epic cards count and goes to the next card.
              The second card is an Epic one too, with a probability of 0.7 *
              40/41 since identical cards cannot be redrawn. It then iterates
              over the whole sequence, returns the resulting probability and
              sums over the different sequences to get the total probability of
              not getting fusion stones out of a Mythic Tome.
            </p>
            <p>
              Of course, this is correct only under the assumption that book
              draws work this way.
            </p>
          </>
        ),
      },
      {
        id: 'value-calculator',
        question: 'How does the value calculator work?',
        answer: (
          <>
            <p>
              The <Link to='/calculators/value'>value calculator</Link>, despite
              efforts from <Link to='/members/derk'>Derk</Link> (Derk#7109), is
              not an accurate representation of cards’ value. First of all, they
              are evaluated in isolation instead of as part of a deck.
              Additionally, their value is based on a single turn so structures
              and elders are undervalued. Finally, a lot of cards cannot be
              statically valued without more information about the state of the
              game.
            </p>
            <p>
              The basic formula for estimating the value of a card is to take
              its strength or damage divided by its mana cost time its speed
              factor. The speed factor is either 0.5, 1, 1.5, 1.75 or 2
              depending on the effective movement of a card between 0 and 4.
            </p>
            <p>
              For sake of simplicity and/or realism, some liberties have been
              taken which are relevant when understanding the value output:
            </p>
            <ul>
              <li>
                Spells are played in a sensical way to ensure a meaningful
                minimum value.
              </li>
              <li>
                Hand manipulations, freeze, poison, confusion, command, disable
                and vitality are ignored.
              </li>
              <li>
                Mana is capped to 30 (e.g. Lady Rime and Visions of the Grove).
              </li>
              <li>Tiles are capped to 10 (instead of 20, for realism).</li>
              <li>
                Strength is capped to the maximum vanilla strength (e.g.
                Confinement and Siren of the Seas).
              </li>
            </ul>
            <p>
              These cards are currently not available in the calculator:{' '}
              {UNVALUED_CARDS.map(id => getRawCardData(id).name).join(', ')}.
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
          'I tried importing an image in the card builder but it failed. Why isn’t my image working?',
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
              get the actual URL.
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

export default getFAQ
