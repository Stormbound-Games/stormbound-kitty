const lacksAoE = cards => {
  const ids = cards.map(c => c.id)

  if (
    /* Beasts of Terror */ ids.includes('N18') ||
    /* Hunter’s Vengeance */ ids.includes('N23') ||
    /* Bladestorm */ ids.includes('N29') ||
    /* Voidsurgers */ ids.includes('N36') ||
    /* Needle Blast */ ids.includes('N44') ||
    /* Powder Tower */ ids.includes('N45') ||
    /* Victors of the Melee */ ids.includes('N47') ||
    /* Joust Champions */ ids.includes('N55') ||
    /* Crazy Bombers */ ids.includes('N57') ||
    /* Sirens of the Seas */ ids.includes('N58') ||
    /* Unhealthy Hysteria */ ids.includes('N63') ||
    /* Trekking Aldermen */ ids.includes('N73') ||
    /* Broken Earth Drake */ ids.includes('W15') ||
    /* Flaming Stream */ ids.includes('I18') ||
    /* Windmakers */ ids.includes('I20') ||
    /* Toxic Sacrifice */ ids.includes('F4') ||
    /* Crimson Sentry */ ids.includes('F5') ||
    /* Witches of the Wild */ ids.includes('F14') ||
    /* Dark Harvest */ ids.includes('S15') ||
    /* Lasting Remains */ ids.includes('S23') ||
    /* Frosthexers + Wisp Cloud */ (ids.includes('W2') && ids.includes('W4')) ||
    /* Frosthexers + Midwinter Chaos */ (ids.includes('W2') &&
      ids.includes('W11')) ||
    /* Midwinter Chaos + Wisp Cloud */ (ids.includes('W11') &&
      ids.includes('W4')) ||
    /* Moment’s Peace + Midwinter Chaos */ (ids.includes('W6') &&
      ids.includes('W11')) ||
    /* Moment’s Peace + Wisp Cloud */ (ids.includes('W6') && ids.includes('W4'))
  ) {
    return false
  }

  return true
}

const advice = cards => {
  if (!lacksAoE(cards)) return null

  return {
    name: 'Lack of AoE',
    description:
      'It doesn’t look like this deck includes any way to deal damage to multiple units at once. Consider bringing a card or card combo which can clean several units.',
  }
}

export default advice
