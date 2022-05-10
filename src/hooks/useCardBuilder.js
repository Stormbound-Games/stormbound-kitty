import React from 'react'
import { useRouter } from 'next/router'
import serialization from '~/helpers/serialization'
import resolveLeveledProperty from '~/helpers/resolveLeveledProperty'
import resolveAbility from '~/helpers/resolveAbility'
import isDeepEqual from '~/helpers/isDeepEqual'

const formatLevelProp = value => ({
  values: [null, null, null, null, null].fill(value),
  display: value,
})

export const INITIAL_STATE = {
  name: '',
  imageURL: '',
  imageCardId: null,
  rarity: 'common',
  faction: 'neutral',
  unitTypes: [],
  type: 'unit',
  movement: null,
  fixedMovement: false,
  mana: formatLevelProp(null),
  strength: formatLevelProp(null),
  ability: formatLevelProp(null),
}

const useCardBuilder = props => {
  const router = useRouter()
  const imageErrorDialog = React.useRef(null)
  const [cardData, setCardData] = React.useState({
    ...INITIAL_STATE,
    ...props.card,
  })

  const reset = React.useCallback(() => setCardData(INITIAL_STATE), [])

  React.useEffect(() => {
    // Safari has a limit of 100 `history.pushState()` per 30 seconds window, so
    // we should fail silently if it’s not possible to update the URL anymore.
    try {
      const isDefaultState = isDeepEqual(cardData, INITIAL_STATE)
      const data = {
        ...cardData,
        strength: cardData.strength.display,
        mana: cardData.mana.display,
        ability: cardData.ability.display,
      }

      router.replace(
        [
          '/card',
          isDefaultState ? '' : serialization.card.serialize(data),
          props.mode === 'DISPLAY' ? 'display' : '',
        ]
          .filter(Boolean)
          .join('/'),
        null,
        { scroll: false }
      )
    } catch {}
    // eslint-disable-next-line
  }, [cardData, props.mode])

  const setProperty =
    (key, transform = v => v) =>
    value =>
      setCardData(cardData => ({ ...cardData, [key]: transform(value) }))

  const setName = setProperty('name')
  const setRarity = setProperty('rarity')
  const setUnitTypes = setProperty('unitTypes')
  const setMovement = setProperty('movement')
  const setFixedMovement = setProperty('fixedMovement')
  const setFaction = setProperty('faction')
  const setMana = setProperty('mana', resolveLeveledProperty)
  const setStrength = setProperty('strength', resolveLeveledProperty)
  const setAbility = setProperty('ability', resolveAbility)

  const setType = React.useCallback(type => {
    // If the new type is a spell, disable movement, strength and unit types
    if (type === 'spell') {
      setCardData(cardData => ({
        ...cardData,
        type,
        unitTypes: [],
        movement: null,
        fixedMovement: false,
        strength: formatLevelProp(null),
      }))
    }

    // If the new type is a structure, disable movement and unit types and if
    // the current type is a spell, enable strength
    else if (type === 'structure') {
      setCardData(cardData => ({
        ...cardData,
        type,
        unitTypes: [],
        movement: null,
        fixedMovement: false,
        strength:
          cardData.type === 'spell' ? formatLevelProp(null) : cardData.strength,
      }))
    }

    // If the new type is a unit, enable movement and strength
    else {
      setCardData(cardData => ({
        ...cardData,
        type,
        movement: cardData.type !== 'unit' ? null : cardData.movement,
        fixedMovement:
          cardData.type !== 'unit' ? false : cardData.fixedMovement,
        strength:
          cardData.type === 'spell' ? formatLevelProp(null) : cardData.strength,
      }))
    }
  }, [])

  const setImageCardId = React.useCallback(
    id =>
      setCardData(cardData => ({
        ...cardData,
        imageCardId: id,
        imageURL: id ? '' : cardData.imageURL,
      })),
    []
  )

  const setImageURL = React.useCallback(
    imageURL =>
      setCardData(cardData => ({ ...cardData, imageURL, imageCardId: null })),
    []
  )

  const onImagePaste = React.useCallback(event => {
    const image = new Image()
    const data = event.clipboardData.getData('text')
    image.src = data
    image.onerror = () => imageErrorDialog.current.show(data)
  }, [])

  const setters = {
    setName,
    setImageCardId,
    setImageURL,
    setRarity,
    setMana,
    setFaction,
    setType,
    setUnitTypes,
    setMovement,
    setFixedMovement,
    setStrength,
    setAbility,
    setCardData,
    onImagePaste,
    reset,
    imageErrorDialogRef: dialog => (imageErrorDialog.current = dialog),
  }

  return { card: cardData, setters: props.mode === 'EDITOR' ? setters : {} }
}

export default useCardBuilder
