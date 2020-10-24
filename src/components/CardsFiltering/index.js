import React from 'react'
import getExtraAfterMax from '../../helpers/getExtraAfterMax'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import abbreviate from '../../helpers/abbreviate'
import parseAdvancedSearch, {
  serialiseFilters,
} from '../../helpers/parseAdvancedSearch'
import sortCards, {
  sortByValue,
  sortByLockedCoins,
} from '../../helpers/sortCards'
import useViewportWidth from '../../hooks/useViewportWidth'
import { CHIP_CARDS } from '../../constants/game'

const DEFAULT_FILTERS = {
  faction: '*',
  race: '*',
  type: '*',
  mana: '*',
  strength: '*',
  movement: '*',
  rarity: '*',
  text: '',
  status: '*',
  level: '*',
  ability: '*',
  hero: false,
  elder: false,
}

const normaliseName = name => name.toLowerCase().replace(/['’ ]/g, '')

const CardsFiltering = React.memo(function CardsFiltering(props) {
  const viewportWidth = useViewportWidth()
  // All filters are within the same state object for convenience, otherwise we
  // would need a dozen of individual setters, which is pretty cumbersome.
  const [filters, setFilters] = React.useState(DEFAULT_FILTERS)
  // The order is handled separately since it does not filter cards per se, it
  // just orders them. It also allows us to preserve the order when bulk
  // reseting  filters which is convenient.
  const [order, setOrder] = React.useState('NATURAL')
  // Whether the advanced search is enabled.
  const [advanced, setAdvanced] = React.useState(false)
  // The content of the advanced search field; not to confuse with the text
  // search filter which is used to find cards by name.
  const [search, setSearch] = React.useState('')

  // `updateFilter` is a convenience function to update a given filter while
  // preserving the value of the others.
  const updateFilter = key => value =>
    setFilters(filters => ({ ...filters, [key]: value }))

  // When reseting the name filter (by clicking the clear button for instance),
  // the filters should stay as they are. But if searching cards by name, all
  // other filters should be reseted for convenience.
  const setText = text =>
    setFilters(filters => ({
      ...(text === '' ? filters : DEFAULT_FILTERS),
      text,
    }))

  const setFaction = updateFilter('faction')
  const setRace = updateFilter('race')
  const setMana = updateFilter('mana')
  const setType = type => {
    updateFilter('type')(type)
    // If the type filter is not `unit`, movement should be reseted to its
    // default value otherwise this leads to absence of results.
    if (type !== 'unit') updateFilter('movement')(DEFAULT_FILTERS.movement)
  }
  const setMovement = movement => {
    updateFilter('movement')(movement)
    // If the movement filter is set, the type filter should be set to `unit`
    // otherwise this leads to absence of results.
    if (movement !== '*') updateFilter('type')('unit')
  }
  const setRarity = updateFilter('rarity')
  const setStatus = updateFilter('status')
  const setLevel = updateFilter('level')
  const setAbility = updateFilter('ability')
  const setHero = updateFilter('hero')
  const setElder = updateFilter('elder')
  const resetFilters = () => setFilters({ ...DEFAULT_FILTERS })

  // The text match checks whether the card matches by abbreviation first, so
  // that “RoF” (regardless of casing) yields a result. If no abbreviation
  // matches, it checks the name while replacing curly quotes with dumb quotes
  // for convenience.
  const matchesText = React.useCallback(
    card =>
      filters.text === '' ||
      filters.text.toUpperCase() === abbreviate(card.name).toUpperCase() ||
      normaliseName(card.name).includes(normaliseName(filters.text)),
    [filters.text]
  )

  const matchesFaction = React.useCallback(
    card => filters.faction === '*' || filters.faction === card.faction,
    [filters.faction]
  )

  const matchesRace = React.useCallback(
    card => filters.race === '*' || filters.race === card.race,
    [filters.race]
  )

  const matchesType = React.useCallback(
    card => filters.type === '*' || filters.type === card.type,
    [filters.type]
  )

  const matchesNumeric = key => card => {
    const filter = filters[key]
    if (filter === '*') return true
    if (!isNaN(+filter)) return card[key] === +filter
    const [low, high] = filter.split('-').map(Number)
    return card[key] >= low && card[key] <= high
  }

  const matchesMana = React.useCallback(matchesNumeric('mana'), [filters.mana])

  const matchesStrength = React.useCallback(matchesNumeric('strength'), [
    filters.strength,
  ])

  const matchesMovement = React.useCallback(matchesNumeric('movement'), [
    filters.movement,
  ])

  const matchesRarity = React.useCallback(
    card => filters.rarity === '*' || filters.rarity === card.rarity,
    [filters.rarity]
  )

  const matchesStatus = React.useCallback(
    card =>
      filters.status === '*' ||
      (filters.status === 'MISSING' && card.missing) ||
      (filters.status === 'UPGRADABLE' && isCardUpgradable(card)) ||
      (filters.status === 'EXCESS' && getExtraAfterMax(card).coins > 0),
    [filters.status]
  )

  const matchesLevel = React.useCallback(
    card =>
      filters.level === '*' || (card.level === filters.level && !card.missing),
    [filters.level]
  )

  const matchesAbility = React.useCallback(
    card => {
      const ability = filters.ability
      return (
        ability === '*' ||
        (ability === 'POISON' && /poison/i.test(card.ability || '')) ||
        (ability === 'SPAWN' && /spawn/i.test(card.ability || '')) ||
        (ability === 'DRAIN' && /drain/i.test(card.ability || '')) ||
        (ability === 'CONFUSION' && /confus/i.test(card.ability || '')) ||
        (ability === 'SURVIVING' && /surviv/i.test(card.ability || '')) ||
        (ability === 'PUSH_PULL' && /push|pull/i.test(card.ability || '')) ||
        (ability === 'PUSH' && /push/i.test(card.ability || '')) ||
        (ability === 'PULL' && /pull/i.test(card.ability || '')) ||
        (ability === 'FREEZE' && /freeze/i.test(card.ability || '')) ||
        (ability === 'COMMAND' && /command/i.test(card.ability || '')) ||
        (ability === 'CHIP' && CHIP_CARDS.includes(card.id))
      )
    },
    [filters.ability]
  )

  const matchesHero = React.useCallback(
    card => !filters.hero || Boolean(card.hero) === filters.hero,
    [filters.hero]
  )

  const matchesElder = React.useCallback(
    card => !filters.elder || Boolean(card.elder) === filters.elder,
    [filters.elder]
  )

  const toggleAdvancedSearch = () => {
    const search = serialiseFilters(filters)

    if (advanced || search.length === 0) setFilters({ ...DEFAULT_FILTERS })

    // Going from the regular search to the advanced one, serialise the existing
    // filters (if not default) to maintain the search across modes and prefill
    // the search field with the existing filters.
    if (search) setSearch(search)

    setAdvanced(advanced => !advanced)
  }

  const runAdvancedSearch = event => {
    event.preventDefault()
    const parameters = parseAdvancedSearch(search.trim())
    setFilters({ ...DEFAULT_FILTERS, ...parameters })
  }

  const setAdvancedSearch = search => {
    setSearch(search)
    if (search === '') setFilters(DEFAULT_FILTERS)
  }

  const actions = {
    setFaction,
    setType,
    setRace,
    setMana,
    setMovement,
    setRarity,
    setText,
    setStatus,
    setLevel,
    setAbility,
    setHero,
    setElder,
    // While these are not card filters per se, they are grouped within the
    // actions object to make it more convenient to access them.
    setOrder,
    setAdvancedSearch,
    toggleAdvancedSearch,
    runAdvancedSearch,
    resetFilters,
  }

  const sort =
    filters.status === 'EXCESS'
      ? sortByLockedCoins
      : order === 'VALUE'
      ? sortByValue
      : sortCards()

  const collection = props.cards
    .filter(card => {
      // It is technically possible for the card not to be found in the
      // collection at all if it was added as a new card in a separate
      // branch, stored in local storage. Then, checking out a branch
      // without this card in the database yet would cause the card not to
      // be found in the collection. It cannot happen in production unless
      // cards ever get removed from the game.
      if (!card) return false
      if (card.token) return false
      if (!matchesText(card)) return false
      if (!matchesFaction(card)) return false
      if (!matchesRace(card)) return false
      if (!matchesType(card)) return false
      if (!matchesMana(card)) return false
      if (!matchesStrength(card)) return false
      if (!matchesMovement(card)) return false
      if (!matchesRarity(card)) return false
      if (!matchesStatus(card)) return false
      if (!matchesLevel(card)) return false
      if (!matchesAbility(card)) return false
      if (!matchesHero(card)) return false
      if (!matchesElder(card)) return false
      return true
    })
    .map(getResolvedCardData)
    .sort(sort)

  return props.children({
    filters: { ...filters, advanced, order, search },
    actions,
    collection,
    cardsPerPage: viewportWidth < 850 ? 4 : viewportWidth < 1100 ? 6 : 8,
  })
})

export default CardsFiltering
