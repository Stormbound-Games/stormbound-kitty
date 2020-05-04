import React from 'react'
import hookIntoProps from 'hook-into-props'
import { FACTIONS } from '../../constants/game'
import { CollectionContext } from '../CollectionProvider'
import Column from '../Column'
import CTA from '../CTA'
import Dialog from '../Dialog'
import FactionSelect from '../FactionSelect'
import LearnMoreIcon from '../LearnMoreIcon'
import Row from '../Row'
import getRandomDeck from '../../helpers/getRandomDeck'
import arrayRandom from '../../helpers/arrayRandom'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import './index.css'

class DeckBuilderRandomDeckButton extends React.Component {
  state = {
    faction: '*',
    minFactionCards: 0,
    maxLegendaryCards: '',
    maxEpicCards: '',
  }

  open = () => this.dialog.show()
  close = () => this.dialog.hide()

  getRandomFaction = () => {
    return arrayRandom(
      Object.keys(FACTIONS).filter(faction => faction !== 'neutral')
    )
  }

  generateDeck = () => {
    const faction =
      this.state.faction === '*' ? this.getRandomFaction() : this.state.faction
    const maxLegendaryCards =
      typeof this.state.maxLegendaryCards === 'number'
        ? this.state.maxLegendaryCards
        : Infinity
    const maxEpicCards =
      typeof this.state.maxEpicCards === 'number'
        ? this.state.maxEpicCards
        : Infinity
    const availableCards = this.props.collection.map(getResolvedCardData)
    const minFactionCards = this.state.minFactionCards
    const deck = getRandomDeck({
      faction,
      minFactionCards,
      maxLegendaryCards,
      maxEpicCards,
      availableCards,
    })

    this.props.defineDeck(deck)
    this.close()
  }

  render() {
    return (
      <>
        <CTA onClick={this.open} type='button' data-testid='random-deck-btn'>
          {this.props.label || 'Random deck'}
        </CTA>
        <Dialog
          id='random-deck-dialog'
          title={
            <>
              Generate random deck{' '}
              <LearnMoreIcon anchor='#random-deck'>
                Learn more about random decks
              </LearnMoreIcon>
            </>
          }
          dialogRef={dialog => (this.dialog = dialog)}
          image='/assets/images/cards/archdruid_earyn.png'
          close={this.close}
          ctaProps={{
            onClick: this.generateDeck,
            type: 'button',
            children: 'Generate',
            'data-testid': 'random-deck-dialog-confirm-btn',
          }}
        >
          <Row>
            <Column>
              <FactionSelect
                data-testid='random-faction-select'
                value={this.state.faction}
                onChange={event =>
                  this.setState({ faction: event.target.value })
                }
                withAny
              />
            </Column>
            <Column>
              <label htmlFor='factionCards'>Min faction cards</label>
              <select
                data-testid='random-min-faction-select'
                name='factionCards'
                id='factionCards'
                value={this.state.minFactionCards}
                onChange={event =>
                  this.setState({ minFactionCards: +event.target.value })
                }
              >
                <option value={0}>0</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
              </select>
            </Column>
          </Row>
          <Row>
            <Column>
              <label htmlFor='maxEpicCards'>Max epic cards</label>
              <select
                data-testid='random-max-epic-select'
                name='maxEpicCards'
                id='maxEpicCards'
                value={this.state.maxEpicCards}
                onChange={event =>
                  this.setState({
                    maxEpicCards:
                      event.target.value === '' ? '' : +event.target.value,
                  })
                }
              >
                <option value=''>Any</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </Column>
            <Column>
              <label htmlFor='maxLegendaryCards'>Max legendary cards</label>
              <select
                data-testid='random-max-legendary-select'
                name='maxLegendaryCards'
                id='maxLegendaryCards'
                value={this.state.maxLegendaryCards}
                onChange={event =>
                  this.setState({
                    maxLegendaryCards:
                      event.target.value === '' ? '' : +event.target.value,
                  })
                }
              >
                <option value=''>Any</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </Column>
          </Row>
        </Dialog>
      </>
    )
  }
}

export default hookIntoProps(() => ({
  ...React.useContext(CollectionContext),
}))(DeckBuilderRandomDeckButton)
