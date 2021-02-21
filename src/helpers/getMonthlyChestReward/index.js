const DEFAULT_STATE = { coins: 0, rubies: 0, stones: 0, cards: [0, 0, 0, 0] }

const getMonthlyChestReward = league => {
  switch (league) {
    case 'HEROES':
      return { coins: 3000, rubies: 100, stones: 7.5, cards: [20, 16, 8, 3] }
    case 'DIAMOND':
      return { coins: 1800, rubies: 50, stones: 7.5, cards: [14, 12, 6, 2] }
    case 'PLATINUM':
      return { coins: 1200, rubies: 30, stones: 0, cards: [12, 9, 4, 1] }
    case 'GOLD':
      return { coins: 800, rubies: 20, stones: 0, cards: [10, 6, 3, 0] }
    case 'SILVER':
      return { coins: 500, rubies: 10, stones: 0, cards: [7, 4, 2, 0] }
    case 'BRONZE':
      return { coins: 300, rubies: 5, stones: 0, cards: [5, 2, 1, 0] }
    case 'IRON':
      return { coins: 150, rubies: 0, stones: 0, cards: [3, 1, 0, 0] }
    default:
      return { ...DEFAULT_STATE, cards: [...DEFAULT_STATE.cards] }
  }
}

export default getMonthlyChestReward
