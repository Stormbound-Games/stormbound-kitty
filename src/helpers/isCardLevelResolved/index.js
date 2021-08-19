const isCardLevelResolved = card =>
  // Name is there
  !!card.name &&
  // And if there is a strength, it doesn’t contain slashes
  (!card.strength ||
    (!!card.strength && !String(card.strength).includes('/'))) &&
  // And if there is an ability, it doesn’t contain slashes
  (!card.ability || (!!card.ability && !card.ability.includes('/'))) &&
  // And if there is a stringified mana, it doesn’t contain slashes
  (typeof card.mana === 'number' ||
    (typeof card.mana === 'string' && !card.mana.includes('/')))

export default isCardLevelResolved
