import React from 'react'
import { CardsContext } from '#components/CardsProvider'
import { CollectionContext } from '#components/CollectionProvider'
import BookmarkDeckButton from '#components/BookmarkDeckButton'
import DeckShareButton from '#components/DeckShareButton'
import Decks from '#components/Decks'
import DiamondButton from '#components/DiamondButton'
import EmptySearch from '#components/EmptySearch'
import Page from '#components/Page'
import ImportCollection from '#components/ImportCollection'
import Info from '#components/Info'
import LearnMoreIcon from '#components/LearnMoreIcon'
import Only from '#components/Only'
import Row from '#components/Row'
import Spacing from '#components/Spacing'
import FeaturedDecksFilters from '#components/FeaturedDecksFilters'
import Title from '#components/Title'
import useFeaturedDecksSorting from '#hooks/useFeaturedDecksSorting'
import getDeckSearchDescription from '#helpers/getDeckSearchDescription'
import getFactionFromDeckID from '#helpers/getFactionFromDeckID'
import serialization from '#helpers/serialization'

export default React.memo(function PageFeaturedDecks(props) {
  const formRef = React.useRef(null)
  const { cardsIndex, cardsIndexBySid } = React.useContext(CardsContext)
  const { hasDefaultCollection } = React.useContext(CollectionContext)
  const [tags, setTags] = React.useState([])
  const [faction, setFaction] = React.useState('*')
  const [authorSlug, setAuthorSlug] = React.useState('*')
  const [including, setIncluding] = React.useState(null)
  const [name, setName] = React.useState('')
  const [order, setOrder] = React.useState(
    hasDefaultCollection ? 'DATE' : 'FEASIBILITY'
  )

  const resetFilters = React.useCallback(() => {
    setFaction('*')
    setTags([])
    setAuthorSlug('*')
    setName('')
    setIncluding(null)
  }, [])

  const matchesFaction = React.useCallback(
    deck => faction === '*' || getFactionFromDeckID(deck.id) === faction,
    [faction]
  )

  const matchesTags = React.useCallback(
    deck =>
      tags.length === 0 ||
      tags.every(tag => deck.tags.map(tag => tag.slug).includes(tag)),
    [tags]
  )

  const matchesAuthor = React.useCallback(
    deck => authorSlug === '*' || deck.author.slug === authorSlug,
    [authorSlug]
  )

  const matchesName = React.useCallback(
    deck =>
      name === '' ||
      deck.name.toLowerCase().replace('’', "'").includes(name.toLowerCase()),
    [name]
  )

  const matchesIncluding = React.useCallback(
    deck =>
      !including ||
      serialization.deck
        .deserialize(cardsIndexBySid, deck.id)
        .map(card => card.id)
        .includes(including),
    [including, cardsIndexBySid]
  )

  const sortFn = useFeaturedDecksSorting(order)
  const decks = React.useMemo(
    () =>
      props.decks
        .filter(matchesFaction)
        .filter(matchesTags)
        .filter(matchesAuthor)
        .filter(matchesName)
        .filter(matchesIncluding)
        .sort(sortFn),
    [
      props.decks,
      sortFn,
      matchesFaction,
      matchesTags,
      matchesAuthor,
      matchesName,
      matchesIncluding,
    ]
  )

  const authorName =
    authorSlug !== '*'
      ? decks.find(deck => deck.author.slug === authorSlug)?.author.name
      : null
  const author = authorName ? { name: authorName, slug: authorSlug } : null
  const state = {
    tags,
    faction,
    author: author || '*',
    including,
    name,
  }

  return (
    <Page
      title='Featured Decks'
      description={getDeckSearchDescription(cardsIndex, state)}
      meta={decks.length === 1 ? '1 deck' : `${decks.length} decks`}
      author={author}
      action={{
        to: '/decks/bookmarks',
        children: 'Your decks',
        icon: 'arrow-right',
      }}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>Filters</Title>

          <FeaturedDecksFilters
            {...state}
            order={order}
            decks={props.decks}
            availableTags={props.availableTags}
            updateTags={setTags}
            updateFaction={setFaction}
            updateAuthor={setAuthorSlug}
            updateName={setName}
            updateIncluding={setIncluding}
            updateOrder={setOrder}
            resetFilters={resetFilters}
            formRef={formRef}
          />
          <Spacing top='LARGE'>
            {order === 'FEASIBILITY' && (
              <Only.CustomCollection>
                <Info icon='books' title='Your collection'>
                  <p>
                    Decks are ordered based on the cards in{' '}
                    <span className='Highlight'>your collection</span>. That
                    means decks you can make with your highest cards are at the
                    top of the list and decks containing cards you do not
                    possess are downranked.
                  </p>
                </Info>
              </Only.CustomCollection>
            )}
            <Only.Desktop>
              <Only.DefaultCollection>
                <Info
                  icon='books'
                  title={
                    <>
                      Your collection
                      <LearnMoreIcon anchor='#collection-benefits' />
                    </>
                  }
                  CTA={<ImportCollection />}
                >
                  <p>
                    If you have already created your collection, you can import
                    it so decks are sorted by how well they would perform based
                    on the level of your cards.
                  </p>
                </Info>
              </Only.DefaultCollection>
            </Only.Desktop>
          </Spacing>
        </Row.Column>
        <Row.Column width='2/3'>
          <Title>Decks</Title>
          {decks.length > 0 ? (
            <Decks
              decks={decks}
              withBookmarking
              showUpgrades
              actions={deck => [
                <DeckShareButton
                  withoutIntro
                  deck={serialization.deck.deserialize(
                    cardsIndexBySid,
                    deck.id
                  )}
                  trigger={triggerProps => (
                    <DiamondButton icon='share' {...triggerProps} />
                  )}
                  key='share'
                />,
                <BookmarkDeckButton key='bookmark' {...deck} icon='share' />,
              ]}
            />
          ) : (
            <EmptySearch title='No Decks found' resetFilters={resetFilters} />
          )}
        </Row.Column>
      </Row>
    </Page>
  )
})
