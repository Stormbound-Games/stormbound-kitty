import React from 'react'
import { navigate } from '@reach/router'
import isEqual from 'lodash.isequal'
import getInitialDeckData from '../../helpers/getInitialDeckData'
import { serialiseDeck } from '../../helpers/serialise'
import sortByMana from '../../helpers/sortByMana'

export default class DBRoot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      highlightedCards: [],
      deck: getInitialDeckData(props.deckId)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.deck, this.state.deck)) {
      navigate(
        '/deck/' + serialiseDeck(this.state.deck) + window.location.search,
        { replace: true }
      )
    }

    if (prevProps.deckId !== this.props.deckId) {
      this.setState({ deck: getInitialDeckData(this.props.deckId) })
    }
  }

  reset = () => {
    this.setState({ deck: [] })
  }

  defineDeck = deck => this.setState({ deck })

  addCardToDeck = ({ id, level }) => {
    const isInDeck = this.state.deck.find(c => c.id === id)

    if (isInDeck) {
      if (isInDeck.level === level) return
      return this.setState(state => ({
        deck: state.deck.map(c => (c.id === id ? { id, level } : c))
      }))
    }

    if (this.state.deck.length === 12) {
      return
    }

    this.setState({
      deck: [...this.state.deck, { id, level }].sort(sortByMana)
    })
  }

  removeCardFromDeck = ({ id }) => {
    this.setState(state => ({
      deck: state.deck.filter(card => card.id !== id)
    }))
  }

  highlight = cards =>
    this.setState({
      highlightedCards: cards.map(c => c.id || c)
    })

  render() {
    return React.cloneElement(this.props.children, {
      children: React.Children.map(
        this.props.children.props.children,
        child => {
          return React.cloneElement(child, {
            deck: this.state.deck,
            deckId: this.props.deckId,
            reset: this.reset,
            addCardToDeck: this.addCardToDeck,
            defineDeck: this.defineDeck,
            removeCardFromDeck: this.removeCardFromDeck,
            highlight: this.highlight,
            highlightedCards: this.state.highlightedCards
          })
        }
      )
    })
  }
}
