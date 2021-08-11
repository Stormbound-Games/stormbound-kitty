export const getRarityColor = (rarity, mode = 'light') =>
  ({
    common: { light: '#f5f1e5', bright: '#97927b' },
    rare: { light: '#95d7f9', bright: '#1faee0' },
    epic: { light: '#dba8f5', bright: '#c45de6' },
    legendary: { light: '#f5c79f', bright: '#e88931' },
  }[rarity][mode])
