import { MonthlyIncome } from '~/helpers/Income'

const getLeagueChestRewards = (books, league) => {
  switch (league) {
    case 'HEROES':
      return new MonthlyIncome(books, {
        coins: 2000,
        rubies: 70,
        stones: 7.5,
        cards: [20, 16, 8, 3],
      })

    case 'DIAMOND':
      return new MonthlyIncome(books, {
        coins: 1500,
        rubies: 50,
        stones: 7.5,
        cards: [14, 12, 6, 2],
      })

    case 'PLATINUM':
      return new MonthlyIncome(books, {
        coins: 1100,
        rubies: 30,
        stones: 0,
        cards: [12, 9, 4, 1],
      })

    case 'GOLD':
      return new MonthlyIncome(books, {
        coins: 800,
        rubies: 20,
        stones: 0,
        cards: [10, 6, 3, 0],
      })

    case 'SILVER':
      return new MonthlyIncome(books, {
        coins: 500,
        rubies: 10,
        stones: 0,
        cards: [7, 4, 2, 0],
      })

    case 'BRONZE':
      return new MonthlyIncome(books, {
        coins: 300,
        rubies: 5,
        stones: 0,
        cards: [5, 2, 1, 0],
      })

    case 'IRON':
      return new MonthlyIncome(books, {
        coins: 150,
        rubies: 0,
        stones: 0,
        cards: [3, 1, 0, 0],
      })

    default:
      return new MonthlyIncome(books)
  }
}

export default getLeagueChestRewards
