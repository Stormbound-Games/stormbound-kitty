import React from 'react'
import Column from '../Column'
import CTA from '../CTA'
import Image from '../Image'
import News from '../News'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import './index.css'

const Home = props => (
  <>
    <h1 className='VisuallyHidden'>Stormbound Kitty</h1>

    <div className='Home'>
      <aside className='Home__news'>
        <Image
          className='Home__news-image'
          src='/assets/images/cards/sweetcap_kittens.png'
          alt=''
        />
        <div className='Home__news-box'>
          <Title>News</Title>
          <News />
        </div>
      </aside>
      <section className='Home__section' style={{ '--color': 'var(--swarm)' }}>
        <div className='Home__section-inner'>
          <Row desktopOnly>
            <Column />
            <Column>
              <h2>Battle for glory</h2>
              <p>
                Simulate your own Stormbound games in the simulator, be it for
                academic purposes such as guides and bug reports, or to create
                tricky situations for other players to resolve!
              </p>
              <div className='Home__buttons'>
                <CTA to='/sim'>Simulator</CTA>
                <CTA to='/sim/puzzles'>Puzzles</CTA>
              </div>
            </Column>
          </Row>
        </div>
      </section>
      <section
        className='Home__section'
        style={{ '--color': 'var(--shadowfen)' }}
      >
        <div className='Home__section-inner'>
          <Row desktopOnly>
            <Column />
            <Column>
              <h2>Plan your strategy</h2>
              <p>
                Compose your own decks and perfect them with the insightful
                suggestions from the deck builder and its dry-runner, or try one
                of the many ready-to-go decks from the community.
              </p>
              <div className='Home__buttons'>
                <CTA to='/deck'>Deck builder</CTA>
                <CTA to='/guides/deck'>Guide</CTA>
                <CTA to='/deck/suggestions'>Ready decks</CTA>
              </div>
            </Column>
          </Row>
        </div>
      </section>
      <section className='Home__section' style={{ '--color': 'var(--winter)' }}>
        <div className='Home__section-inner'>
          <Row desktopOnly>
            <Column />
            <Column>
              <h2>Practice your craft</h2>
              <p>
                Either dreamed of having a card after your name? Want to invent
                the first legendary spell? A new type of structure? Create your
                very own cards in the card builder.
              </p>
              <div className='Home__buttons'>
                <CTA to='/card'>Card builder</CTA>
              </div>
            </Column>
          </Row>
        </div>
      </section>
      <section
        className='Home__section'
        style={{ '--color': 'var(--ironclad)' }}
      >
        <div className='Home__section-inner'>
          <Row desktopOnly>
            <Column>
              <Image
                className='Home__section-image'
                src='/assets/images/cards/collector_mirz.png'
                alt='Collector Mirz'
              />
            </Column>
            <Column>
              <h2>Keep track of your riches</h2>
              <p>
                Maintain an accurate record of all your riches in the collection
                hallway, pinning your cards on the wall of fame. No one will
                match your collection.
              </p>
              <div className='Home__buttons'>
                <CTA to='/collection/books'>Books calculator</CTA>
                <CTA to='/collection'>Collection</CTA>
              </div>
            </Column>
          </Row>
        </div>
      </section>
      <section className='Home__section' style={{ '--color': 'var(--swarm)' }}>
        <div className='Home__section-inner'>
          <Row desktopOnly>
            <Column>
              <Image
                className='Home__section-image'
                src='/assets/images/cards/ubass_the_hunter.png'
                alt='Ubass the Hunter'
              />
            </Column>
            <Column>
              <h2>Learn from the warlords</h2>
              <p>
                New to the game or looking to perfect your battle strategies,
                you’ll learn everything you need to know in the guides made by
                members of the community.
              </p>
              <div className='Home__buttons'>
                <CTA to='/guides/winter'>Winter Guide</CTA>
                <CTA to='/guides/complete'>Complete Guide</CTA>
                <CTA to='/guides/pirate'>Pirate Guide</CTA>
              </div>
            </Column>
          </Row>
        </div>
      </section>
      <section
        className='Home__section'
        style={{ '--color': 'var(--shadowfen)' }}
      >
        <div className='Home__section-inner'>
          <Row desktopOnly>
            <Column>
              <Image
                className='Home__section-image'
                src='/assets/images/cards/prime_oracle_bragda.png'
                alt='Prime Oracle Bragda'
              />
            </Column>
            <Column>
              <h2>Listen to tales of the Elders</h2>
              <p>
                Whether you’re curious about the Storm, interested in the long
                history of the everlasting factions or want to contribute to the
                rich lore of the land, sitting with the Elders is the way to go.
              </p>
              <div className='Home__buttons'>
                <CTA to='/stories'>Read stories</CTA>
              </div>
            </Column>
          </Row>
        </div>
      </section>
    </div>

    <PageMeta
      title='Stormbound Kitty'
      description='Stormbound Kitty aims at providing tools and information about Paladin Studios’ greatest hit, and extending its players’ experience outside the game.'
    />
  </>
)

export default Home
