import React from 'react'
import sortCards from '../../helpers/sortCards'
import hookIntoProps from '../../helpers/hookIntoProps'
import useViewportWidth from '../../helpers/useViewportWidth'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import getExtraAfterMax from '../../helpers/getExtraAfterMax'

class DBFiltering extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      faction: '*',
      race: '*',
      type: '*',
      mana: '*',
      movement: '*',
      rarity: '*',
      text: '',
      status: '*',
      level: '*',
      ability: '*'
    }
  }

  setFaction = faction => this.setState({ faction })
  setText = text =>
    text === ''
      ? this.setState({ text })
      : this.setState({
          text,
          faction: '*',
          type: '*',
          race: '*',
          mana: '*',
          movement: '*',
          rarity: '*',
          level: '*',
          status: '*',
          ability: '*'
        })
  setType = type =>
    this.setState({
      type,
      movement: type !== 'unit' ? '*' : this.state.movement
    })
  setRace = race => this.setState({ race })
  setMana = mana => this.setState({ mana })
  setMovement = movement =>
    this.setState({
      movement,
      type: movement !== '*' ? 'unit' : this.state.type
    })
  setRarity = rarity => this.setState({ rarity })
  setStatus = status => this.setState({ status })
  setLevel = level => this.setState({ level: +level || level })
  setAbility = ability => this.setState({ ability })

  resetFilters = () => {
    this.setState({
      faction: '*',
      race: '*',
      type: '*',
      mana: '*',
      movement: '*',
      rarity: '*',
      text: '',
      level: '*',
      status: '*',
      ability: '*'
    })
  }

  matchesText = card =>
    this.state.text === '' ||
    card.name
      .toLowerCase()
      .replace('’', "'")
      .includes(this.state.text.toLowerCase())
  matchesFaction = card =>
    this.state.faction === '*' || card.faction === this.state.faction
  matchesRace = card => this.state.race === '*' || card.race === this.state.race
  matchesType = card => this.state.type === '*' || card.type === this.state.type
  matchesMana = card => {
    const { mana } = this.state
    if (mana === '*') return true
    if (mana === '1-3' && card.mana >= 1 && card.mana <= 3) return true
    if (mana === '4-5' && (card.mana === 4 || card.mana === 5)) return true
    if (mana === '6-7' && (card.mana === 6 || card.mana === 7)) return true
    if (mana === '8+' && card.mana >= 8) return true
    return false
  }
  matchesMovement = card => {
    return (
      this.state.movement === '*' || +this.state.movement === +card.movement
    )
  }
  matchesRarity = card =>
    this.state.rarity === '*' || card.rarity === this.state.rarity
  matchesStatus = card => {
    return (
      this.state.status === '*' ||
      (this.state.status === 'MISSING' && card.missing) ||
      (this.state.status === 'UPGRADABLE' && isCardUpgradable(card)) ||
      (this.state.status === 'EXCESS' && getExtraAfterMax(card).stones > 0)
    )
  }
  matchesLevel = card =>
    this.state.level === '*' || card.level === this.state.level
  matchesAbility = card => {
    return (
      this.state.ability === '*' ||
      (this.state.ability === 'POISON' && /poison/i.test(card.ability || '')) ||
      (this.state.ability === 'CONFUSION' &&
        /confus/i.test(card.ability || '')) ||
      (this.state.ability === 'SURVIVING' &&
        /surviv/i.test(card.ability || '')) ||
      (this.state.ability === 'PUSH_PULL' &&
        /push|pull/i.test(card.ability || '')) ||
      (this.state.ability === 'FREEZE' && /freeze/i.test(card.ability || '')) ||
      (this.state.ability === 'COMMAND' && /command/i.test(card.ability || ''))
    )
  }

  getCollection = cards => {
    return cards
      .filter(card => {
        if (card.token) return false
        if (!this.matchesText(card)) return false
        if (!this.matchesFaction(card)) return false
        if (!this.matchesRace(card)) return false
        if (!this.matchesType(card)) return false
        if (!this.matchesMana(card)) return false
        if (!this.matchesMovement(card)) return false
        if (!this.matchesRarity(card)) return false
        if (!this.matchesStatus(card)) return false
        if (!this.matchesLevel(card)) return false
        if (!this.matchesAbility(card)) return false
        return true
      })
      .sort(sortCards())
  }

  getCardsPerPage = () => (this.props.viewportWidth < 1100 ? 6 : 8)

  render() {
    const filters = { ...this.state }
    const filtersSetters = {
      setFaction: this.setFaction,
      setType: this.setType,
      setRace: this.setRace,
      setMana: this.setMana,
      setMovement: this.setMovement,
      setRarity: this.setRarity,
      setText: this.setText,
      setStatus: this.setStatus,
      setLevel: this.setLevel,
      setAbility: this.setAbility
    }

    return this.props.children({
      filters,
      filtersSetters,
      resetFilters: this.resetFilters,
      collection: this.getCollection(this.props.cards),
      cardsPerPage: this.props.viewportWidth < 1100 ? 6 : 8
    })
  }
}

export default hookIntoProps(() => ({ viewportWidth: useViewportWidth() }))(
  DBFiltering
)
