import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import hookIntoProps from 'hook-into-props'
import Article from '../Article'
import ActiveCardForm from '../CollectionActiveCardForm'
import CardsGallery from '../CardsGallery'
import { CollectionContext } from '../CollectionProvider'
import CollectionClearHint from '../CollectionClearHint'
import EmptySearch from '../EmptySearch'
import CardsFiltering from '../CardsFiltering'
import Filters from '../CollectionFilters'
import ImportCollection from '../ImportCollection'
import Only from '../Only'
import Row from '../Row'
import Spacing from '../Spacing'
import Title from '../Title'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import isCardUpgradable from '../../helpers/isCardUpgradable'

class Collection extends React.Component {
  constructor(props) {
    super(props)

    this.state = { activeCard: null }

    this.levelField = React.createRef()
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

  updateActiveCardInCollection = (key, value) => {
    this.props.updateCollection(collection => {
      const { activeCard } = this.state
      const ids = collection.map(card => card.id)
      const index = ids.indexOf(activeCard)
      const card = collection.find(card => card.id === activeCard)
      const newCard = { ...card, [key]: value }

      return [
        ...collection.slice(0, index),
        newCard,
        ...collection.slice(index + 1),
      ]
    })
  }

  setActiveCardLevel = event =>
    this.updateActiveCardInCollection('level', +event.target.value)

  setActiveCardCopies = value =>
    this.updateActiveCardInCollection('copies', value || null)

  setActiveCardMissing = event =>
    this.updateActiveCardInCollection('missing', event.target.checked)

  getActiveCardData = () => {
    const activeCard = this.props.indexedCollection[this.state.activeCard]

    return (
      activeCard &&
      getResolvedCardData({
        id: this.state.activeCard,
        level: activeCard.level,
      })
    )
  }

  isCardUpgradable = id => isCardUpgradable(this.props.indexedCollection[id])

  isCardMissing = id => this.props.indexedCollection[id].missing

  render() {
    const activeCard = this.props.indexedCollection[this.state.activeCard]
    const resolvedActiveCard = this.getActiveCardData()

    return (
      <Article
        title='Card Collection'
        description='Manage your own card collection and keep track of your cards'
      >
        <Row desktopOnly wideGutter>
          <Row.Column width='1/3'>
            <Spacing bottom='LARGE'>
              <Title>What is this</Title>

              <p>
                If you take the time to mark the level of all your cards, as
                well as the amount of copies you have for each, you can get{' '}
                <Link to='/collection/stats'>handy stats</Link> such as the
                amount of fusion stones or gold you need to upgrade your cards.
              </p>

              <Spacing bottom='LARGE'>
                <p>
                  The collection is locally saved in your browser as you update
                  it so you can safely leave or refresh the page. If you want to
                  save it more permanently and synchronise it between device,
                  you can export it as a CSV.
                </p>
              </Spacing>

              <CollectionClearHint />

              <Only.DefaultCollection>
                <Row>
                  <Row.Column>
                    <ImportCollection />
                  </Row.Column>
                  <Row.Column />
                </Row>
              </Only.DefaultCollection>
            </Spacing>

            {this.state.activeCard && (
              <ActiveCardForm
                activeCard={activeCard}
                resolvedActiveCard={resolvedActiveCard}
                onActiveCardFormSubmit={this.onActiveCardFormSubmit}
                setActiveCardLevel={this.setActiveCardLevel}
                setActiveCardCopies={this.setActiveCardCopies}
                setActiveCardMissing={this.setActiveCardMissing}
                levelFieldRef={this.levelField}
              />
            )}
          </Row.Column>

          <Row.Column width='2/3'>
            <Title>Card Collection</Title>

            <CardsFiltering
              cards={this.props.collection.map(getResolvedCardData)}
            >
              {({ filters, actions, collection, cardsPerPage }) => (
                <>
                  <Filters {...filters} {...actions} />

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
                      resetFilters={actions.resetFilters}
                    />
                  )}
                </>
              )}
            </CardsFiltering>
          </Row.Column>
        </Row>
      </Article>
    )
  }
}

export default hookIntoProps(() => ({
  ...useFela(),
  ...React.useContext(CollectionContext),
}))(Collection)
