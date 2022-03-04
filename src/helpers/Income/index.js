import getAverageStonesPerBook from '~/helpers/getAverageStonesPerBook'
import getPeriodMultiplier from '~/helpers/getPeriodMultiplier'

const getRubyConversionMap = (books = []) =>
  books.reduce(
    (acc, { id, cost }) => {
      if (cost.type !== 'RUBIES') return acc
      acc[id] = cost.amount
      return acc
    },
    { CARD_SHOP: 20 }
  )

class Income {
  constructor(period, books, income) {
    this.coins = 0
    this.rubies = 0
    this.stones = 0
    this.cards = [0, 0, 0, 0]
    this.period = period
    this.books = books
    this.conversionMap = getRubyConversionMap(books)

    if (typeof period === 'undefined') {
      throw new Error('Missing period in `Income` constructor')
    }

    if (typeof income !== 'undefined') {
      this.add(income)
    }
  }

  add(income) {
    if (income instanceof Income) {
      this.add(income.as(this.period))
    } else {
      this.coins += income.coins || 0
      this.rubies += income.rubies || 0
      this.stones += income.stones || 0
      this.cards[0] += income.cards?.[0] ?? 0
      this.cards[1] += income.cards?.[1] ?? 0
      this.cards[2] += income.cards?.[2] ?? 0
      this.cards[3] += income.cards?.[3] ?? 0
      if (income.books) this.openBook(income.books)
    }
  }

  as(period) {
    if (period === this.period) {
      return {
        coins: this.coins,
        rubies: this.rubies,
        stones: this.stones,
        cards: this.cards.slice(0),
      }
    }

    const currentRatio = getPeriodMultiplier(this.period)
    const targetRatio = getPeriodMultiplier(period)

    return {
      coins: (this.coins / currentRatio) * targetRatio,
      rubies: (this.rubies / currentRatio) * targetRatio,
      stones: (this.stones / currentRatio) * targetRatio,
      cards: this.cards.map(rarity => (rarity / currentRatio) * targetRatio),
    }
  }

  openBook(id) {
    if (Array.isArray(id)) {
      id.map(id => this.openBook(id))
    } else {
      const book = this.books.find(book => book.id === id)
      console.log(id)
      const { draws, odds } = book

      this.stones += getAverageStonesPerBook(book)
      this.cards[0] += draws * odds[0]
      this.cards[1] += draws * odds[1]
      this.cards[2] += draws * odds[2]
      this.cards[3] += draws * odds[3]
    }
  }

  convertRubies(id) {
    if (!(id in this.conversionMap)) return

    const cost = this.conversionMap[id]
    const count = Math.floor(this.rubies / cost)

    this.rubies -= count * cost

    if (id === 'CARD_SHOP') this.cards[2] += count
    else for (let i = 0; i < count; i += 1) this.openBook(id)
  }
}

export class DailyIncome extends Income {
  constructor(books, income) {
    super('DAILY', books, income)
  }
}

export class WeeklyIncome extends Income {
  constructor(books, income) {
    super('WEEKLY', books, income)
  }
}

export class MonthlyIncome extends Income {
  constructor(books, income) {
    super('MONTHLY', books, income)
  }
}

export class YearlyIncome extends Income {
  constructor(books, income) {
    super('YEARLY', books, income)
  }
}
