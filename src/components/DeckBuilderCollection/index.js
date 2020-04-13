import React, { Fragment } from 'react'
import cards from '../../data/cards'
import ActiveCardForm from '../DeckBuilderCollectionActiveCardForm'
import CardsGallery from '../CardsGallery'
import CollectionStats from '../DeckBuilderCollectionStats'
import Column from '../Column'
import CTA from '../CTA'
import EmptySearch from '../EmptySearch'
import Filtering from '../DeckBuilderFiltering'
import Filters from '../DeckBuilderCollectionFilters'
import ImportCollection from '../DeckBuilderImportCollection'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import download from '../../helpers/download'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

class DeckBuilderCollection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collection: this.normaliseCollection(cards),
      activeCard: null,
      hasImported: null,
    }

    this.levelField = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.warnBeforeUnload)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.warnBeforeUnload)
  }

  warnBeforeUnload = event => {
    const message = 'Make sure you’ve exported your collection before quitting.'
    event.preventDefault()
    event.returnValue = message
    return message
  }

  setActiveCard = id => {
    this.setState(
      state => ({
        activeCard: state.activeCard === id ? null : id,
      }),
      () => {
        if (this.state.activeCard) {
          this.levelField.current.focus()
        }
      }
    )
  }

  onActiveCardFormSubmit = event => {
    const { activeCard: id } = this.state
    event.preventDefault()

    this.setState({ activeCard: null }, () => {
      const $button = document.querySelector(`#card-${id} > button`)

      if ($button) $button.focus()
    })
  }

  normaliseCollection = cards => {
    return cards
      .filter(card => !card.token)
      .map(card => ({
        id: card.id,
        level: +card.level || 1,
        missing: !!card.missing,
        copies: typeof card.copies === 'undefined' ? 0 : +card.copies,
      }))
  }

  uploadCSV = data => {
    this.setState(
      {
        collection: data
          ? this.normaliseCollection(data)
          : this.state.collection,
        hasImported: !!data,
      },
      () => {
        setTimeout(() => this.setState({ hasImported: null }), 3000)
      }
    )
  }

  formatCollectionAsCSV = cards => {
    const headers = ['id', 'name', 'level', 'copies']
    const data = [
      headers,
      ...cards.map(card => [
        card.id,
        // Make sure the name doesn’t contain a comma otherwise it might cause
        // an issue when deserialising the CSV
        getRawCardData(card.id).name.replace(',', ''),
        // For people to open the CSV file in Excel, it’s better if it contains
        // *all* cards; missing ones are marked as level 0
        card.missing ? 0 : card.level,
        card.copies || 0,
      ]),
    ].join('\n')

    return data
  }

  download = () =>
    download({
      content: this.formatCollectionAsCSV(this.state.collection),
      fileName: 'collection.csv',
      mimeType: 'text/csv;encoding:utf-8',
    })

  updateActiveCardInCollection = (key, value) => {
    this.setState(state => {
      const { activeCard } = this.state
      const ids = state.collection.map(card => card.id)
      const index = ids.indexOf(activeCard)
      const card = this.state.collection.find(card => card.id === activeCard)
      const newCard = { ...card, [key]: value }

      return {
        collection: [
          ...state.collection.slice(0, index),
          newCard,
          ...state.collection.slice(index + 1),
        ],
      }
    })
  }

  setActiveCardLevel = event =>
    this.updateActiveCardInCollection('level', +event.target.value)

  setActiveCardCopies = event =>
    this.updateActiveCardInCollection('copies', +event.target.value || null)

  setActiveCardMissing = event =>
    this.updateActiveCardInCollection('missing', event.target.checked)

  getActiveCardData = () => {
    const activeCard = this.state.collection.find(
      card => card.id === this.state.activeCard
    )

    return (
      activeCard &&
      resolveCardForLevel({
        id: this.state.activeCard,
        level: activeCard.level,
      })
    )
  }

  isCardUpgradable = id =>
    isCardUpgradable(this.state.collection.find(card => card.id === id))

  isCardMissing = id =>
    this.state.collection.find(card => card.id === id).missing

  render() {
    const activeCard = this.state.collection.find(
      card => card.id === this.state.activeCard
    )
    const resolvedActiveCard = this.getActiveCardData()

    return (
      <Fragment>
        <h1 className='visually-hidden'>Card Collection</h1>

        <Row desktopOnly wideGutter>
          <Column width={33}>
            <div className='DeckBuilderCollection__info'>
              <Title>What’s this</Title>

              <p>
                If you take the time to mark the level of all your cards, as
                well as the amount of copies you have for each, you can then
                import and export your collection at will (CSV format).
              </p>

              <p>
                It will give you handy stats such as the amount of fusion stones
                or gold you need to upgrade your cards.
              </p>

              <Row>
                <Column>
                  <ImportCollection onChange={this.uploadCSV} />
                </Column>
                <Column>
                  <CTA type='button' onClick={this.download}>
                    Export collection
                  </CTA>
                </Column>
              </Row>

              {this.state.hasImported !== null && (
                <p>
                  {this.state.hasImported
                    ? '✓ Your collection has been successfully imported!'
                    : '✘ Unfortunately their was an error importing your collection.'}
                </p>
              )}
            </div>

            {this.state.activeCard ? (
              <ActiveCardForm
                activeCard={activeCard}
                resolvedActiveCard={resolvedActiveCard}
                onActiveCardFormSubmit={this.onActiveCardFormSubmit}
                setActiveCardLevel={this.setActiveCardLevel}
                setActiveCardCopies={this.setActiveCardCopies}
                setActiveCardMissing={this.setActiveCardMissing}
                levelFieldRef={this.levelField}
              />
            ) : (
              <CollectionStats collection={this.state.collection} />
            )}
          </Column>

          <Column width={66}>
            <Title>Cards Collection</Title>

            <Filtering cards={this.state.collection.map(resolveCardForLevel)}>
              {({
                filters,
                filtersSetters,
                collection,
                resetFilters,
                cardsPerPage,
              }) => (
                <Fragment>
                  <Filters
                    {...filters}
                    {...filtersSetters}
                    resetFilters={resetFilters}
                  />

                  {collection.length > 0 ? (
                    <CardsGallery
                      filters={filters}
                      cards={collection}
                      cardsPerPage={cardsPerPage}
                      onCardClick={this.setActiveCard}
                      isCardAffordable={id => id === this.state.activeCard}
                      isCardUpgradable={this.isCardUpgradable}
                      isCardMissing={this.isCardMissing}
                      onPageChange={() => this.setState({ activeCard: null })}
                    />
                  ) : (
                    <EmptySearch
                      title='No cards found'
                      resetFilters={resetFilters}
                    />
                  )}
                </Fragment>
              )}
            </Filtering>
          </Column>
        </Row>

        <PageMeta
          title='Cards Collection'
          description='Import and export your own card collection.'
        />
      </Fragment>
    )
  }
}

export default DeckBuilderCollection
