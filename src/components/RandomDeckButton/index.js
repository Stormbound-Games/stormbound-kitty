import React from 'react'
import hookIntoProps from 'hook-into-props'
import { FACTIONS } from '../../constants/game'
import { CollectionContext } from '../CollectionProvider'
import CTA from '../CTA'
import Dialog from '../Dialog'
import FactionSelect from '../FactionSelect'
import LearnMoreIcon from '../LearnMoreIcon'
import Row from '../Row'
import Select from '../Select'
import getRandomDeck from '../../helpers/getRandomDeck'
import arrayRandom from '../../helpers/arrayRandom'

class RandomDeckButton extends React.Component {
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
        : undefined
    const maxEpicCards =
      typeof this.state.maxEpicCards === 'number'
        ? this.state.maxEpicCards
        : undefined
    const deck = getRandomDeck({
      availableCards: this.props.collection,
      faction,
      maxEpicCards,
      maxLegendaryCards,
      minFactionCards: this.state.minFactionCards,
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
            <Row.Column>
              <FactionSelect
                data-testid='random-faction-select'
                value={this.state.faction}
                onChange={event =>
                  this.setState({ faction: event.target.value })
                }
                withAny
              />
            </Row.Column>
            <Row.Column>
              <Select
                label='Min faction cards'
                data-testid='random-min-faction-select'
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
              </Select>
            </Row.Column>
          </Row>
          <Row>
            <Row.Column>
              <Select
                label='Max epic cards'
                data-testid='random-max-epic-select'
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
              </Select>
            </Row.Column>
            <Row.Column>
              <Select
                label='Max legendary cards'
                data-testid='random-max-legendary-select'
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
              </Select>
            </Row.Column>
          </Row>
        </Dialog>
      </>
    )
  }
}

export default hookIntoProps(() => ({
  ...React.useContext(CollectionContext),
}))(RandomDeckButton)
