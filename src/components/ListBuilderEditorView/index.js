import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import hookIntoProps from 'hook-into-props'
import isEqual from 'lodash.isequal'
import { TIER_COLORS, DEFAULT_LIST, DEFAULT_TIER } from '../../constants/list'
import Column from '../Column'
import CTA from '../CTA'
import PageMeta from '../PageMeta'
import ResetButton from '../ResetButton'
import Row from '../Row'
import ShareButton from '../ListBuilderShareButton'
import ListBuilderTier from '../ListBuilderTier'
import Title from '../Title'
import serialisation from '../../helpers/serialisation'
import getInitialListData from '../../helpers/getInitialListData'
import reorder from '../../helpers/reorder'
import './index.css'

class ListBuilderEditorView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tiers: getInitialListData(props.listId),
      dndTierIndex: null,
      dndSource: null,
      dndTarget: null,
      dndDirection: null,
      preventRemoval: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const hasAnyTierChanged = prevState.tiers.some(
      (tier, index) => !isEqual(tier, this.state.tiers[index])
    )

    if (hasAnyTierChanged) {
      this.props.history.replace(
        '/list/' + serialisation.list.serialise(this.state.tiers)
      )
    }

    if (prevProps.listId !== this.props.listId) {
      if (this.props.listId) {
        this.setState({ tiers: getInitialListData(this.props.listId) })
      } else {
        this.reset()
      }
    }
  }

  addTier = () => {
    this.setState(state => ({ tiers: [...state.tiers, { ...DEFAULT_TIER }] }))
  }

  onTierUpdate = index => tier => {
    this.setState(state => {
      const tiers = [...state.tiers]
      tiers[index] = { ...tiers[index], ...tier }
      return { tiers }
    })
  }

  addCardToTier = index => cardId => {
    if (!cardId) return

    this.onTierUpdate(index)({
      cards: [...this.state.tiers[index].cards, cardId],
    })
  }

  removeCardFromTier = index => cardId => {
    if (this.state.preventRemoval) return

    this.onTierUpdate(index)({
      cards: this.state.tiers[index].cards.filter(card => card !== cardId),
    })
  }

  moveTierUp = index => () => {
    if (index === 0) return

    this.setState(state => {
      const tiers = [...state.tiers]
      const tier = tiers[index]
      const previousTier = tiers[index - 1]

      tiers[index] = previousTier
      tiers[index - 1] = tier

      return { tiers }
    })
  }

  moveTierDown = index => () => {
    if (index === this.state.tiers.length - 1) return

    this.setState(state => {
      const tiers = [...state.tiers]
      const tier = tiers[index]
      const nextTier = tiers[index + 1]

      tiers[index] = nextTier
      tiers[index + 1] = tier

      return { tiers }
    })
  }

  reset = () => {
    this.setState({ tiers: DEFAULT_LIST })
  }

  onMouseDown = tierIndex => cardIndex => {
    this.setState({
      preventRemoval: false,
      dndTierIndex: tierIndex,
      dndSource: cardIndex,
    })
  }

  onMouseOver = cardIndex => {
    if (this.state.dndTierIndex === null) return

    this.setState(state => ({
      dndTarget: cardIndex,
      dndDirection: !state.dndDirection
        ? cardIndex < state.dndSource
          ? -1
          : cardIndex > state.dndSource
          ? +1
          : null
        : state.dndTarget === cardIndex
        ? state.dndDirection * -1
        : state.dndTarget > cardIndex
        ? -1
        : +1,
    }))
  }

  onMouseUp = () => {
    const { dndSource, dndTarget, dndTierIndex } = this.state

    this.setState({
      dndTierIndex: null,
      dndSource: null,
      dndTarget: null,
      dndDirection: null,
      preventRemoval: dndSource === dndTarget,
    })

    if (dndSource !== null && dndTarget !== null && dndSource !== dndTarget) {
      const cards = reorder(
        [...this.state.tiers[dndTierIndex].cards],
        dndSource,
        dndTarget
      )

      this.onTierUpdate(dndTierIndex)({ cards })
    }
  }

  render() {
    return (
      <>
        <h1 className='VisuallyHidden'>List Builder</h1>

        <Row wideGutter desktopOnly>
          <Column width='1/3'>
            <Title element='h2'>Settings</Title>

            <p>
              This tier list editor makes it possible to create up to 10 tiers
              of cards. It is currently very much in active development so make
              sure to report any bug, oddity or desired features.
            </p>

            <Row>
              <Column>
                <ResetButton
                  label='Reset list'
                  confirm='Are you sure you want to reset the list to its initial state?'
                  reset={this.reset}
                  disabled={!this.props.listId}
                />
              </Column>
              <Column>
                <ShareButton
                  title='Share tier list'
                  disabled={!this.props.listId}
                />
              </Column>
            </Row>
          </Column>
          <Column width='2/3'>
            <Title>Tier list</Title>

            {this.state.tiers.map((tier, index) => (
              <ListBuilderTier
                {...this.state}
                {...tier}
                key={index}
                color={TIER_COLORS[index]}
                prefix={`tier-${index}-`}
                // Basic edition
                isEditable={true}
                onNameChange={name => this.onTierUpdate(index)({ name })}
                addCard={cardId => this.addCardToTier(index)(cardId)}
                removeCard={cardId => this.removeCardFromTier(index)(cardId)}
                // Tiers order
                moveUp={this.moveTierUp(index)}
                moveDown={this.moveTierDown(index)}
                canMoveUp={index !== 0}
                canMoveDown={index !== this.state.tiers.length - 1}
                // Cards order
                isDragging={this.state.dndTierIndex === index}
                onMouseDown={this.onMouseDown(index)}
                onMouseOver={this.onMouseOver}
                onMouseUp={this.onMouseUp}
              />
            ))}
            <hr />
            <CTA
              onClick={this.addTier}
              disabled={this.state.tiers.length === 10}
              className='ListBuilderEditorView__CTA'
            >
              Add a new tier
            </CTA>
          </Column>
        </Row>

        <PageMeta
          title='Tier List Builder'
          description='Compose your own tier lists from the Stormbound cards, ranking them the way you see fit'
        />
      </>
    )
  }
}

export default hookIntoProps(() => ({
  history: useHistory(),
  listId: useRouteMatch().params.listId,
}))(ListBuilderEditorView)
