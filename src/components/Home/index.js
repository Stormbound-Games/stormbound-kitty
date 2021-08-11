import React from 'react'
import { useFela } from 'react-fela'
import CTA from '../CTA'
import Image from '../Image'
import News from '../News'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Spacing from '../Spacing'
import Title from '../Title'
import VisuallyHidden from '../VisuallyHidden'
import styles from './styles'

export default React.memo(() => {
  const { css } = useFela()

  return (
    <>
      <VisuallyHidden as='h1'>Stormbound Kitty</VisuallyHidden>

      <div className={css(styles.home)}>
        <aside className={css(styles.news)}>
          <Image
            extend={styles.newsImage}
            src='/assets/images/kitty.png'
            withoutWebp
          />

          <Spacing bottom='LARGE'>
            <div className={css(styles.newsBox)}>
              <Title extend={styles.newsTitle}>News</Title>
              <News />
            </div>
          </Spacing>
        </aside>

        <section
          className={css(styles.section, { '--color': 'var(--shadowfen)' })}
        >
          <div className={css(styles.sectionInner)}>
            <Row desktopOnly>
              <Row.Column />
              <Row.Column>
                <h2 className={css(styles.sectionTitle)}>Prepare your decks</h2>
                <p>
                  Compose your own decks and perfect them with the insightful
                  suggestions from the deck builder and its dry-runner, or try
                  one of the many ready-to-go decks from the community.
                </p>
                <div className={css(styles.buttons)}>
                  <CTA extend={styles.button} to='/guides/deck'>
                    Guide
                  </CTA>
                  <CTA extend={styles.button} to='/deck'>
                    Builder
                  </CTA>
                  <CTA extend={styles.button} to='/deck/suggestions'>
                    Decks
                  </CTA>
                </div>
              </Row.Column>
            </Row>
          </div>
        </section>

        <section className={css(styles.section, { '--color': 'var(--swarm)' })}>
          <div className={css(styles.sectionInner)}>
            <Row desktopOnly>
              <Row.Column />
              <Row.Column>
                <h2 className={css(styles.sectionTitle)}>
                  Learn from the warlords
                </h2>
                <p>
                  New to the game or looking to perfect your battle strategies,
                  you’ll learn everything you need to know in the guides made by
                  members of the community.
                </p>
                <div className={css(styles.buttons)}>
                  <CTA extend={styles.button} to='/guides/essentials'>
                    Essentials
                  </CTA>
                  <CTA extend={styles.button} to='/guides/in-depth'>
                    In-depth
                  </CTA>
                  <CTA extend={styles.button} to='/guides/playstyle'>
                    Playstyle
                  </CTA>
                </div>
              </Row.Column>
            </Row>
          </div>
        </section>

        <section
          className={css(styles.section, { '--color': 'var(--ironclad)' })}
        >
          <div className={css(styles.sectionInner)}>
            <Row desktopOnly>
              <Row.Column />
              <Row.Column>
                <h2 className={css(styles.sectionTitle)}>
                  Keep track of your riches
                </h2>
                <p>
                  Maintain an accurate record of all your riches in the
                  collection hallway, pinning your cards on the wall of fame. No
                  one will match your collection.
                </p>
                <div className={css(styles.buttons)}>
                  <CTA extend={styles.button} to='/calculators/income'>
                    Income
                  </CTA>
                  <CTA extend={styles.button} to='/calculators/books'>
                    Books
                  </CTA>
                  <CTA extend={styles.button} to='/collection'>
                    Collection
                  </CTA>
                </div>
              </Row.Column>
            </Row>
          </div>
        </section>

        <section
          className={css(styles.section, { '--color': 'var(--winter)' })}
        >
          <div className={css(styles.sectionInner)}>
            <Row desktopOnly>
              <Row.Column>
                <Only.Desktop>
                  <Image
                    extend={styles.sectionImage}
                    src='/assets/images/cards/olf_the_hammer.png'
                    withAvif
                  />
                </Only.Desktop>
              </Row.Column>
              <Row.Column>
                <h2 className={css(styles.sectionTitle)}>Battle for glory</h2>
                <p>
                  Simulate your own Stormbound games in the simulator, be it for
                  academic purposes such as guides and bug reports, or to create
                  tricky situations for other players to resolve!
                </p>
                <div className={css(styles.buttons)}>
                  <CTA extend={styles.button} to='/sim'>
                    Simulator
                  </CTA>
                  <CTA extend={styles.button} to='/sim/puzzles'>
                    Puzzles
                  </CTA>
                </div>
              </Row.Column>
            </Row>
          </div>
        </section>
        <section className={css(styles.section, { '--color': 'var(--swarm)' })}>
          <div className={css(styles.sectionInner)}>
            <Row desktopOnly>
              <Row.Column>
                <Only.Desktop>
                  <Image
                    extend={styles.sectionImage}
                    src='/assets/images/cards/archdruid_earyn.png'
                    withAvif
                  />
                </Only.Desktop>
              </Row.Column>
              <Row.Column>
                <h2 className={css(styles.sectionTitle)}>
                  Practice your craft
                </h2>
                <p>
                  Either dreamed of having a card after your name? Want to
                  invent the first legendary spell? A new type of structure?
                  Create your very own cards in the card builder.
                </p>
                <div className={css(styles.buttons)}>
                  <CTA extend={styles.button} to='/list'>
                    List builder
                  </CTA>
                  <CTA extend={styles.button} to='/card'>
                    Card builder
                  </CTA>
                </div>
              </Row.Column>
            </Row>
          </div>
        </section>

        <section
          className={css(styles.section, { '--color': 'var(--shadowfen)' })}
        >
          <div className={css(styles.sectionInner)}>
            <Row desktopOnly>
              <Row.Column>
                <Only.Desktop>
                  <Image
                    extend={styles.sectionImage}
                    src='/assets/images/cards/prime_oracle_bragda.png'
                    withAvif
                  />
                </Only.Desktop>
              </Row.Column>
              <Row.Column>
                <h2 className={css(styles.sectionTitle)}>
                  Listen to tales of the Elders
                </h2>
                <p>
                  Whether you’re curious about the Storm, interested in the long
                  history of the everlasting factions or want to contribute to
                  the rich lore of the land, sitting with the Elders is the way
                  to go.
                </p>
                <div className={css(styles.buttons)}>
                  <CTA extend={styles.button} to='/stories/eastern-heat'>
                    Eastern Heat
                  </CTA>
                  <CTA extend={styles.button} to='/stories'>
                    All stories
                  </CTA>
                </div>
              </Row.Column>
            </Row>
          </div>
        </section>
      </div>

      <PageMeta
        title='Home'
        description='Stormbound Kitty aims at providing tools and information about Sheepyard’s great game, and extending its players’ experience outside the game'
      />
    </>
  )
})
