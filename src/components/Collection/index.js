import React from 'react'
import Link from '~/components/Link'
import Page from '~/components/Page'
import ActiveCardForm from '~/components/CollectionActiveCardForm'
import CardsGallery from '~/components/CardsGallery'
import { CardsContext } from '~/components/CardsProvider'
import { CollectionContext } from '~/components/CollectionProvider'
import CollectionClearHint from '~/components/CollectionClearHint'
import EmptySearch from '~/components/EmptySearch'
import CardsFiltering from '~/components/CardsFiltering'
import Filters from '~/components/CollectionFilters'
import ImportCollection from '~/components/ImportCollection'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import isCardUpgradable from '~/helpers/isCardUpgradable'

export default React.memo(function Collection(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { collection, indexedCollection, updateCollection } =
    React.useContext(CollectionContext)
  const [activeCardId, setActiveCardId] = React.useState(null)
  const levelField = React.useRef(null)

  React.useEffect(() => {
    if (activeCardId) setTimeout(() => levelField.current.focus(), 0)
  }, [activeCardId])

  const onActiveCardFormSubmit = React.useCallback(
    event => {
      event.preventDefault()
      const id = activeCardId
      setActiveCardId(null)
      document.querySelector(`#${id}`).previousElementSibling?.focus()
    },
    [activeCardId]
  )

  const updateActiveCardInCollection = React.useCallback(
    (key, value) =>
      updateCollection(collection => {
        const ids = collection.map(card => card.id)
        const index = ids.indexOf(activeCardId)
        const card = { ...collection[index], [key]: value }

        return [
          ...collection.slice(0, index),
          card,
          ...collection.slice(index + 1),
        ]
      }),
    [activeCardId, updateCollection]
  )

  const setActiveCardLevel = React.useCallback(
    event => updateActiveCardInCollection('level', +event.target.value),
    [updateActiveCardInCollection]
  )

  const setActiveCardCopies = React.useCallback(
    value => updateActiveCardInCollection('copies', value || null),
    [updateActiveCardInCollection]
  )

  const setActiveCardMissing = React.useCallback(
    event => updateActiveCardInCollection('missing', event.target.checked),
    [updateActiveCardInCollection]
  )

  const canCardBeUpgraded = React.useCallback(
    id => isCardUpgradable(cardsIndex, indexedCollection[id]),
    [cardsIndex, indexedCollection]
  )

  const isCardMissing = React.useCallback(
    id => indexedCollection[id].missing,
    [indexedCollection]
  )

  const activeCard = getResolvedCardData(
    cardsIndex,
    indexedCollection[activeCardId]
  )

  return (
    <Page
      title='Card Collection'
      description='Manage your own card collection and keep track of your cards'
      action={{
        to: '/collection/stats',
        children: 'Collection stats',
        icon: 'arrow-right',
      }}
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Spacing bottom='LARGE'>
            <Title>What is this</Title>

            <p>
              If you take the time to mark the level of all your cards, as well
              as the amount of copies you have for each, you can get{' '}
              <Link to='/collection/stats'>handy stats</Link> such as the amount
              of fusion stones or gold you need to upgrade your cards.
            </p>

            <Spacing bottom='LARGE'>
              <p>
                The collection is locally saved in your browser as you update it
                so you can safely leave or refresh the page. If you want to save
                it more permanently and synchronize it between device, you can
                export it as a CSV.
              </p>
            </Spacing>

            <CollectionClearHint />

            <Only.DefaultCollection>
              <Row>
                <Row.Column align='center'>
                  <ImportCollection />
                </Row.Column>
              </Row>
            </Only.DefaultCollection>
          </Spacing>

          {activeCardId && (
            <ActiveCardForm
              activeCard={activeCard}
              onActiveCardFormSubmit={onActiveCardFormSubmit}
              setActiveCardLevel={setActiveCardLevel}
              setActiveCardCopies={setActiveCardCopies}
              setActiveCardMissing={setActiveCardMissing}
              levelFieldRef={levelField}
            />
          )}
        </Row.Column>

        <Row.Column width='2/3'>
          <Title>Card Collection</Title>

          <CardsFiltering
            cards={collection.map(card =>
              getResolvedCardData(cardsIndex, card)
            )}
          >
            {({ filters, actions, collection, cardsPerPage }) => (
              <>
                <Filters {...filters} {...actions} />

                {collection.length > 0 ? (
                  <CardsGallery
                    filters={filters}
                    cards={collection}
                    cardsPerPage={cardsPerPage}
                    onCardClick={setActiveCardId}
                    isCardAffordable={id => id === activeCardId}
                    isCardUpgradable={canCardBeUpgraded}
                    isCardMissing={isCardMissing}
                    onPageChange={() => setActiveCardId(null)}
                  />
                ) : (
                  <EmptySearch
                    title='No cards found'
                    resetFilters={actions.resetFilters}
                  />
                )}
              </>
            )}
          </CardsFiltering>
        </Row.Column>
      </Row>
    </Page>
  )
})
