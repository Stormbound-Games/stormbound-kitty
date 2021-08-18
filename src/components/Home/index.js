import React from 'react'
import { useFela } from 'react-fela'
import HomeNews from '~/components/HomeNews'
import HomeSection from '~/components/HomeSection'
import PageMeta from '~/components/PageMeta'
import VisuallyHidden from '~/components/VisuallyHidden'
import styles from './styles'

export default React.memo(function Home(props) {
  const { css } = useFela()

  return (
    <>
      <VisuallyHidden as='h1'>Stormbound-Kitty</VisuallyHidden>

      <div className={css(styles.home)}>
        <HomeNews news={props.news} />

        <HomeSection
          color='var(--shadowfen)'
          title='Prepare your decks'
          actions={[
            { to: '/guides/deck', children: 'Guide' },
            { to: '/deck', children: 'Builder' },
            { to: '/deck/suggestions', children: 'Decks' },
          ]}
        >
          <p>
            Compose your own decks and perfect them with the insightful
            suggestions from the deck builder and its dry-runner, or try one of
            the many ready-to-go decks from the community.
          </p>
        </HomeSection>

        <HomeSection
          color='var(--swarm)'
          title='Learn from the warlords'
          actions={[
            { to: '/guides/essentials', children: 'Essentials' },
            { to: '/guides/in-depth', children: 'In-depth' },
            { to: '/guides/playstyle', children: 'Playstyle' },
          ]}
        >
          <p>
            New to the game or looking to perfect your battle strategies, you’ll
            learn everything you need to know in the guides made by members of
            the community.
          </p>
        </HomeSection>

        <HomeSection
          color='var(--ironclad)'
          title='Keep track of your riches'
          actions={[
            { to: '/calculators/income', children: 'Income' },
            { to: '/calculators/books', children: 'Books' },
            { to: '/collection', children: 'Collection' },
          ]}
        >
          <p>
            Maintain an accurate record of all your riches in the collection
            hallway, pinning your cards on the wall of fame. No one will match
            your collection.
          </p>
        </HomeSection>

        <HomeSection
          color='var(--winter)'
          title='Battle for glory'
          image='/assets/images/cards/olf_the_hammer.png'
          actions={[
            { to: '/sim', children: 'Simulator' },
            { to: '/sim/puzzles', children: 'Puzzles' },
          ]}
        >
          <p>
            Simulate your own Stormbound games in the simulator, be it for
            academic purposes such as guides and bug reports, or to create
            tricky situations for other players to resolve!
          </p>
        </HomeSection>

        <HomeSection
          color='var(--swarm)'
          title='Practice your craft'
          image='/assets/images/cards/archdruid_earyn.png'
          actions={[
            { to: '/list', children: 'List builder' },
            { to: '/card', children: 'Card builder' },
          ]}
        >
          <p>
            Either dreamed of having a card after your name? Want to invent the
            first legendary spell? A new type of structure? Create your very own
            cards in the card builder.
          </p>
        </HomeSection>

        <HomeSection
          color='var(--shadowfen)'
          title='Listen to tales of the Elders'
          image='/assets/images/cards/prime_oracle_bragda.png'
          actions={[
            { to: '/stories/eastern-heat', children: 'Eastern Heat' },
            { to: '/stories/march-of-fauns', children: 'March of Fauns' },
            { to: '/stories', children: 'All stories' },
          ]}
        >
          <p>
            Whether you’re curious about the Storm, interested in the long
            history of the everlasting factions or want to contribute to the
            rich lore of the land, sitting with the Elders is the way to go.
          </p>
        </HomeSection>
      </div>

      <PageMeta
        title='Home'
        description='Stormbound-Kitty aims at providing tools and information about Sheepyard’s great game, and extending its players’ experience outside the game'
      />
    </>
  )
})
