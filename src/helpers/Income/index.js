import { BOOKS } from '../../constants/game'
import getAverageStonesPerBook from '../../helpers/getAverageStonesPerBook'
import getPeriodMultiplier from '../../helpers/getPeriodMultiplier'

const RUBY_CONVERSION_MAP = {
  CARD_SHOP: 20,
  CLASSIC: 20,
  DRAGON: 60,
  ELDER: 60,
  FELINE: 60,
  HEROIC: 40,
  ARCHDRAGON: 80,
  MYTHIC: 80,
  PIRATE: 60,
}

class Income {
  constructor(period, income) {
    this.coins = 0
    this.rubies = 0
    this.stones = 0
    this.cards = [0, 0, 0, 0]
    this.period = period

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

  openBook(type) {
    if (Array.isArray(type)) {
      type.map(bookType => this.openBook(bookType))
    } else {
      const { draws, percentiles } = BOOKS[type]

      this.stones += getAverageStonesPerBook(type)
      this.cards[0] += draws * percentiles[0]
      this.cards[1] += draws * percentiles[1]
      this.cards[2] += draws * percentiles[2]
      this.cards[3] += draws * percentiles[3]
    }
  }

  convertRubies(type) {
    if (!(type in RUBY_CONVERSION_MAP)) return

    const cost = RUBY_CONVERSION_MAP[type]
    const count = Math.floor(this.rubies / cost)

    this.rubies -= count * cost

    if (type === 'CARD_SHOP') this.cards[2] += count
    else for (let i = 0; i < count; i += 1) this.openBook(type)
  }
}

export class DailyIncome extends Income {
  constructor(income) {
    super('DAILY', income)
  }
}

export class WeeklyIncome extends Income {
  constructor(income) {
    super('WEEKLY', income)
  }
}

export class MonthlyIncome extends Income {
  constructor(income) {
    super('MONTHLY', income)
  }
}

export class YearlyIncome extends Income {
  constructor(income) {
    super('YEARLY', income)
  }
}
