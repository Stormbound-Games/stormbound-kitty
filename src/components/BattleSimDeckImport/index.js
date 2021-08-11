import React from 'react'
import { useFela } from 'react-fela'
import hookIntoProps from 'hook-into-props'
import CTA from '../CTA'
import Deck from '../Deck'
import Dialog from '../Dialog'
import serialisation from '../../helpers/serialisation'

class BattleSimDeckImport extends React.Component {
  state = {
    deckURL: '',
    deck: [],
    hand: [],
    error: null,
  }

  open = () => this.dialog.show()
  close = () => this.dialog.hide()

  registerDialog = ref => {
    this.dialog = ref

    if (this.dialog) {
      this.dialog.on('hide', () => {
        this.setState({
          deckURL: '',
          deck: [],
          hand: [],
          error: null,
        })
      })
    }
  }

  setDeck = event => {
    const url = event.target.value

    this.setState({ deckURL: url }, () => {
      try {
        const [, id] = decodeURIComponent(url).match(
          /\/deck\/([\w=%]+)(?:\/|$|\?)/i
        )

        this.setState({ deck: serialisation.deck.deserialise(id), error: '' })
      } catch (error) {
        this.setState({
          error: 'Unfortunately this deck could not be imported.',
        })
      }
    })
  }

  importDeck = () => {
    this.props.importDeck({ cards: this.state.deck, hand: this.state.hand })
    this.close()
  }

  addToHand = ({ id }) => {
    if (this.state.hand.includes(id)) {
      this.setState({ hand: this.state.hand.filter(i => i !== id) })
    } else if (this.state.hand.length < 4) {
      this.setState({ hand: [...this.state.hand, id] })
    }
  }

  render() {
    return (
      <>
        <CTA
          type='CTA'
          onClick={this.open}
          extend={{
            margin: '1em auto 2em',
            display: 'block',
          }}
        >
          Import deck
        </CTA>
        <Dialog
          id='battle-sim-deck-import'
          title='Import a deck'
          dialogRef={this.registerDialog}
          image='/assets/images/cards/olf_the_hammer.png'
          close={this.close}
          ctaProps={{
            onClick: this.importDeck,
            children: 'Import deck',
            disabled: this.state.deck.length === 0,
          }}
        >
          <p>
            You can import a deck directly from the deck builder: paste its URL
            in the field below. Once the deck has been succesfully loaded, you
            can select up to 4 cards to put in your hand.
          </p>

          <label htmlFor='deck'>Deck URL</label>
          <input
            type='url'
            name='deck'
            id='deck'
            required
            placeholder='e.g. https://stormbound-kitty.com/deck/NE4xLDRJMSw0TjMsNEk2LDRJOCw0STExLDRJMTUsNEkxMiw0TjI4LDRJMjAsNEkxOSw0STIx'
            onChange={this.setDeck}
            value={this.state.deckURL}
            aria-describedby='deck-import-errors'
          />
          <p id='deck-import-errors'>{this.state.error}</p>

          {this.state.deck.length > 0 && (
            <Deck
              orientation='horizontal'
              deck={this.state.deck}
              highlightedCards={this.state.hand}
              onClick={this.addToHand}
              onClickLabel='Put card in hand'
            />
          )}
        </Dialog>
      </>
    )
  }
}

export default hookIntoProps(props => ({
  ...useFela(),
}))(BattleSimDeckImport)
