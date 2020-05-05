import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import hookIntoProps from 'hook-into-props'
import App from '../CardBuilderApp'
import PageMeta from '../PageMeta'
import serialisation from '../../helpers/serialisation'
import areAllValuesEqual from '../../helpers/areAllValuesEqual'
import getInitialCardData, {
  getInitialCardDataFromQuery,
} from '../../helpers/getInitialCardData'
import resolveAbility from '../../helpers/resolveAbility'
import getCardBuilderMetaTags from '../../helpers/getCardBuilderMetaTags'
import getCardFromSlug from '../../helpers/getCardFromSlug'

const formatLevelProp = value => ({
  values: [null, null, null, null, null].fill(value),
  display: value,
})

const INITIAL_STATE = {
  name: '',
  imageURL: '',
  imageCardId: null,
  rarity: 'common',
  faction: 'neutral',
  race: null,
  elder: false,
  hero: false,
  type: 'unit',
  movement: null,
  mana: formatLevelProp(null),
  strength: formatLevelProp(null),
  ability: formatLevelProp(null),
}

class CardBuilderRoot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...INITIAL_STATE,
      ...getInitialCardData(props.cardId),
    }
  }

  componentDidMount() {
    const state = getInitialCardDataFromQuery()

    if (Object.keys(state).length > 0) {
      this.props.history.replace('/card/' + serialisation.card.serialise(state))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Handle initial query parameters
    if (!prevProps.cardId && this.props.cardId) {
      this.setState({ ...getInitialCardData(this.props.cardId) })
    } else if (prevProps.cardId !== this.props.cardId) {
      if (!this.props.cardId) {
        this.reset()
      } else if (getCardFromSlug(this.props.cardId)) {
        this.setState({ ...getInitialCardData(this.props.cardId) })
      }
    }
  }

  updateURL = () => {
    this.props.history.replace(
      '/card/' +
        serialisation.card.serialise({
          ...this.state,
          strength: this.state.strength.display,
          mana: this.state.mana.display,
          ability: this.state.ability.display,
        })
    )
  }

  reset = () => {
    this.setState({ ...INITIAL_STATE }, () => this.props.history.push('/card'))
  }

  resolveLevels = (value = '') => {
    const chunks = value.split('/')
    const values = Array.from(
      { length: 5 },
      (_, index) => chunks[index] || chunks[0] || null
    )
    // If all values are the same, visually shorten it for simplicity
    // Consider all values to be the same if there are 5 identical of them
    const allSame = chunks.length === 5 && areAllValuesEqual(chunks)
    const display = allSame ? chunks[0] : value

    return { values, display }
  }

  setName = name => this.setState({ name }, this.updateURL)

  setRarity = rarity => this.setState({ rarity }, this.updateURL)

  setMana = mana =>
    this.setState({ mana: this.resolveLevels(mana) }, this.updateURL)

  setMovement = movement => this.setState({ movement }, this.updateURL)

  setStrength = strength =>
    this.setState({ strength: this.resolveLevels(strength) }, this.updateURL)

  setFaction = faction => this.setState({ faction }, this.updateURL)

  setType = type => {
    // If the new type is a spell, disable movement, strength, race and unit
    // modifiers
    if (type === 'spell') {
      this.setState(
        {
          type,
          race: null,
          elder: false,
          hero: false,
          movement: null,
          strength: formatLevelProp(null),
        },
        this.updateURL
      )
    }

    // If the new type is a structure, disable movement, race and unit modifiers
    // and if the current type is a spell, enable strength
    else if (type === 'structure') {
      this.setState(
        {
          type,
          race: null,
          elder: false,
          hero: false,
          movement: null,
          strength:
            this.state.type === 'spell'
              ? formatLevelProp(null)
              : this.state.strength,
        },
        this.updateURL
      )
    }

    // If the new type is a unit, enable movement and strength
    else {
      this.setState(
        {
          type,
          movement: this.state.type !== 'unit' ? null : this.state.movement,
          strength:
            this.state.type === 'spell'
              ? formatLevelProp(null)
              : this.state.strength,
        },
        this.updateURL
      )
    }
  }

  setRace = race => this.setState({ race }, this.updateURL)
  setElder = elder => this.setState({ elder }, this.updateURL)
  setHero = hero => this.setState({ hero }, this.updateURL)

  setAbility = ability =>
    this.setState({ ability: resolveAbility(ability) }, this.updateURL)

  setImageCardId = id =>
    this.setState(
      {
        imageCardId: id,
        imageURL: id ? '' : this.state.imageURL,
      },
      this.updateURL
    )

  setImageURL = imageURL =>
    this.setState({ imageURL, imageCardId: null }, this.updateURL)

  onImagePaste = event => {
    const image = new Image()
    const data = event.clipboardData.getData('text')
    image.src = data
    image.onerror = () => this.imageErrorDialog.show(data)
  }

  render() {
    return (
      <>
        <h1 className='VisuallyHidden'>Card Builder</h1>

        <App
          {...this.state}
          setName={this.setName}
          setImageCardId={this.setImageCardId}
          setImageURL={this.setImageURL}
          setRarity={this.setRarity}
          setMana={this.setMana}
          setFaction={this.setFaction}
          setType={this.setType}
          setRace={this.setRace}
          setElder={this.setElder}
          setHero={this.setHero}
          setMovement={this.setMovement}
          setStrength={this.setStrength}
          setAbility={this.setAbility}
          onImagePaste={this.onImagePaste}
          reset={this.reset}
          imageErrorDialogRef={dialog => (this.imageErrorDialog = dialog)}
          mode='EDITOR'
        />

        <PageMeta {...getCardBuilderMetaTags(this.state)} />
      </>
    )
  }
}

export default hookIntoProps(() => ({
  history: useHistory(),
  cardId: useRouteMatch().params.cardId,
}))(CardBuilderRoot)
