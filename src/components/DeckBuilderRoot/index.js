import React from 'react'
import hookIntoProps from 'hook-into-props'
import serialisation from '../../helpers/serialisation'
import getInitialDeckData from '../../helpers/getInitialDeckData'
import sortByMana from '../../helpers/sortByMana'
import useRouter from '../../hooks/useRouter'

class DeckBuilderRoot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      highlightedCards: [],
      deck: props.deck,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevStrDeck = prevState.deck.map(c => c.id + c.level).join(',')
    const currStrDeck = this.state.deck.map(c => c.id + c.level).join(',')

    if (prevStrDeck !== currStrDeck) {
      const { history, view } = this.props
      const id = serialisation.deck.serialise(this.state.deck)

      switch (view) {
        case 'DETAIL':
          history.replace(`/deck/${id}/detail`, undefined, {
            scroll: false,
          })
          break
        case 'DRY_RUN':
          history.replace(`/deck/${id}/dry-run`, undefined, {
            scroll: false,
          })
          break
        default:
        case 'EDITOR':
          history.replace(`/deck/${id}`, undefined, { scroll: false })
          break
      }
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
        deck: state.deck.map(c => (c.id === id ? { id, level } : c)),
      }))
    }

    if (this.state.deck.length === 12) {
      return
    }

    this.setState({
      deck: [...this.state.deck, { id, level }].sort(sortByMana),
    })
  }

  removeCardFromDeck = ({ id }) => {
    this.setState(state => ({
      deck: state.deck.filter(card => card.id !== id),
    }))
  }

  highlight = cards => this.setState({ highlightedCards: cards })

  render() {
    return this.props.children({
      deck: this.state.deck,
      deckId: this.props.deckId,
      reset: this.reset,
      addCardToDeck: this.addCardToDeck,
      defineDeck: this.defineDeck,
      removeCardFromDeck: this.removeCardFromDeck,
      highlight: this.highlight,
      highlightedCards: this.state.highlightedCards,
    })
  }
}

export default hookIntoProps(() => ({
  history: useRouter().history,
}))(DeckBuilderRoot)
