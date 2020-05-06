export const getRarityColor = (rarity, mode = 'light') =>
  ({
    common: { light: 'rgb(245, 241, 229)', bright: 'rgb(151, 146, 123)' },
    rare: { light: 'rgb(149, 215, 249)', bright: 'rgb(31, 174, 224)' },
    epic: { light: 'rgb(219, 168, 245)', bright: 'rgb(196, 93, 230)' },
    legendary: { light: 'rgb(245, 199, 159)', bright: 'rgb(232, 137, 49)' },
  }[rarity][mode])
