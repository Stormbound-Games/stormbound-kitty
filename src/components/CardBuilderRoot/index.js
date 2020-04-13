import React, { Fragment } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import hookIntoProps from 'hook-into-props'
import App from '../CardBuilderApp'
import PageMeta from '../PageMeta'
import { serialiseCard } from '../../helpers/serialise'
import areAllValuesEqual from '../../helpers/areAllValuesEqual'
import getInitialCardData from '../../helpers/getInitialCardData'
import resolveAbility from '../../helpers/resolveAbility'

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

  componentDidUpdate(prevProps, prevState) {
    const hasAnyPropChanged =
      this.state.name !== prevState.name ||
      this.state.imageURL !== prevState.imageURL ||
      this.state.imageCardId !== prevState.imageCardId ||
      this.state.rarity !== prevState.rarity ||
      this.state.faction !== prevState.faction ||
      this.state.race !== prevState.race ||
      this.state.elder !== prevState.elder ||
      this.state.hero !== prevState.hero ||
      this.state.type !== prevState.type ||
      this.state.movement !== prevState.movement ||
      this.state.mana.display !== prevState.mana.display ||
      this.state.strength.display !== prevState.strength.display ||
      this.state.ability.display !== prevState.ability.display

    if (hasAnyPropChanged) {
      this.props.history.replace(
        '/card/' +
          serialiseCard({
            ...this.state,
            strength: this.state.strength.display,
            mana: this.state.mana.display,
            ability: this.state.ability.display,
          })
      )
    } else if (prevProps.cardId !== this.props.cardId) {
      if (this.props.cardId) {
        this.setState({ ...getInitialCardData(this.props.cardId) })
      } else {
        this.reset()
      }
    }
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

  setName = name => this.setState({ name })

  setRarity = rarity => this.setState({ rarity })

  setMana = mana => this.setState({ mana: this.resolveLevels(mana) })

  setMovement = movement => this.setState({ movement })

  setStrength = strength =>
    this.setState({ strength: this.resolveLevels(strength) })

  setFaction = faction => this.setState({ faction })

  setType = type => {
    // If the new type is a spell, disable movement, strength, race and unit
    // modifiers
    if (type === 'spell') {
      this.setState({
        type,
        race: null,
        elder: false,
        hero: false,
        movement: null,
        strength: formatLevelProp(null),
      })
    }

    // If the new type is a structure, disable movement, race and unit modifiers
    // and if the current type is a spell, enable strength
    else if (type === 'structure') {
      this.setState({
        type,
        race: null,
        elder: false,
        hero: false,
        movement: null,
        strength:
          this.state.type === 'spell'
            ? formatLevelProp(null)
            : this.state.strength,
      })
    }

    // If the new type is a unit, enable movement and strength
    else {
      this.setState({
        type,
        movement: this.state.type !== 'unit' ? null : this.state.movement,
        strength:
          this.state.type === 'spell'
            ? formatLevelProp(null)
            : this.state.strength,
      })
    }
  }

  setRace = race => this.setState({ race })
  setElder = elder => this.setState({ elder })
  setHero = hero => this.setState({ hero })

  setAbility = ability => this.setState({ ability: resolveAbility(ability) })

  setImageCardId = id =>
    this.setState({
      imageCardId: id,
      imageURL: id ? '' : this.state.imageURL,
    })

  setImageURL = imageURL => this.setState({ imageURL, imageCardId: null })

  onImagePaste = event => {
    const image = new Image()
    image.src = event.clipboardData.getData('text')
    image.onerror = () => this.imageErrorDialog.show()
  }

  render() {
    return (
      <Fragment>
        <h1 className='visually-hidden'>Card Builder</h1>

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

        <PageMeta
          title='Card Builder'
          description='Create your own Stormbound card.'
        />
      </Fragment>
    )
  }
}

export default hookIntoProps(() => ({
  history: useHistory(),
  cardId: useRouteMatch().params.cardId,
}))(CardBuilderRoot)
