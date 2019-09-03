import React, { Fragment } from 'react'
import CTA from '../CTA'
import Dialog from '../Dialog'
import Row from '../Row'
import Column from '../Column'
import FactionSelect from '../FactionSelect'
import getRandomDeck from '../../helpers/getRandomDeck'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import { FACTIONS } from '../../constants/game'
import './index.css'
import arrayRandom from '../../helpers/arrayRandom'

export default class DBRandomDeckButton extends React.Component {
  state = {
    faction: '*',
    minFactionCards: 0,
    maxLegendaryCards: '',
    maxEpicCards: ''
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
    const availableCards = this.props.collection.map(resolveCardForLevel)
    const minFactionCards = this.state.minFactionCards
    const deck = getRandomDeck({
      faction,
      minFactionCards,
      maxLegendaryCards,
      maxEpicCards,
      availableCards
    })

    this.props.defineDeck(deck)
    this.close()
  }

  render() {
    return (
      <Fragment>
        <CTA onClick={this.open} type="button">
          {this.props.label || 'Random deck'}
        </CTA>
        <Dialog
          id="random-deck-dialog"
          title="Generate random deck"
          dialogRef={dialog => (this.dialog = dialog)}
          image="/assets/images/cards/archdruid_earyn.png"
          close={this.close}
          ctaProps={{
            onClick: this.generateDeck,
            type: 'button',
            children: 'Generate'
          }}
        >
          <Row>
            <Column>
              <FactionSelect
                value={this.state.faction}
                onChange={event =>
                  this.setState({ faction: event.target.value })
                }
                withAny
              />
            </Column>
            <Column>
              <label htmlFor="factionCards">Min faction cards</label>
              <select
                name="factionCards"
                id="factionCards"
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
              <label htmlFor="maxEpicCards">Max epic cards</label>
              <select
                name="maxEpicCards"
                id="maxEpicCards"
                value={this.state.maxEpicCards}
                onChange={event =>
                  this.setState({
                    maxEpicCards:
                      event.target.value === '' ? '' : +event.target.value
                  })
                }
              >
                <option value="">Any</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </Column>
            <Column>
              <label htmlFor="maxLegendaryCards">Max legendary cards</label>
              <select
                name="maxLegendaryCards"
                id="maxLegendaryCards"
                value={this.state.maxLegendaryCards}
                onChange={event =>
                  this.setState({
                    maxLegendaryCards:
                      event.target.value === '' ? '' : +event.target.value
                  })
                }
              >
                <option value="">Any</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </Column>
          </Row>
        </Dialog>
      </Fragment>
    )
  }
}
