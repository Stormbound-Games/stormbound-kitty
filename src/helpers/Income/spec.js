import { DailyIncome, WeeklyIncome, MonthlyIncome, YearlyIncome } from './'

describe('The `Income` class', () => {
  it('should provide all resources', () => {
    const income = new DailyIncome(global.__BOOKS__)
    expect(income.coins).toEqual(0)
    expect(income.rubies).toEqual(0)
    expect(income.stones).toEqual(0)
    expect(income.cards).toEqual([0, 0, 0, 0])
  })

  it('should handle passing resources to constructor', () => {
    const income = new DailyIncome(global.__BOOKS__, {
      coins: 100,
      rubies: 25,
      stones: 5,
      cards: [10, 5, 2, 0],
    })
    expect(income.coins).toEqual(100)
    expect(income.rubies).toEqual(25)
    expect(income.stones).toEqual(5)
    expect(income.cards).toEqual([10, 5, 2, 0])
  })

  it('should handle opening a book', () => {
    const income = new DailyIncome(global.__BOOKS__)
    income.openBook('HUMBLE')
    expect(income.cards).not.toEqual([0, 0, 0, 0])
  })

  it('should handle converting rubies', () => {
    const income = new DailyIncome(global.__BOOKS__, { rubies: 20 })
    income.convertRubies('CARD_SHOP')
    expect(income.cards).not.toEqual([0, 0, 0, 0])
    expect(income.rubies).toEqual(0)
  })

  it('should handle adding Daily to Daily', () => {
    const income = new DailyIncome(global.__BOOKS__, {
      coins: 10,
      cards: [4, 3, 2, 1],
    })
    const extra = new DailyIncome(global.__BOOKS__, {
      coins: 10,
      rubies: 5,
      cards: [1, 2, 3, 4],
    })
    income.add(extra)
    expect(income.coins).toEqual(20)
    expect(income.rubies).toEqual(5)
    expect(income.stones).toEqual(0)
    expect(income.cards).toEqual([5, 5, 5, 5])
  })

  it('should handle add Weekly to Daily', () => {
    const income = new DailyIncome(global.__BOOKS__, {
      coins: 10,
      cards: [4, 3, 2, 1],
    })
    const extra = new WeeklyIncome(global.__BOOKS__, {
      coins: 70,
      rubies: 35,
      cards: [7, 14, 21, 28],
    })
    income.add(extra)
    expect(income.coins).toEqual(20)
    expect(income.rubies).toEqual(5)
    expect(income.stones).toEqual(0)
    expect(income.cards).toEqual([5, 5, 5, 5])
  })

  it('should handle add Monthly to Daily', () => {
    const income = new DailyIncome(global.__BOOKS__, {
      coins: 10,
      cards: [4, 3, 2, 1],
    })
    const extra = new MonthlyIncome(global.__BOOKS__, {
      coins: 304.375,
      rubies: 152.1875,
      cards: [30.4375, 60.875, 91.3125, 121.75],
    })
    income.add(extra)
    expect(income.coins).toEqual(20)
    expect(income.rubies).toEqual(5)
    expect(income.stones).toEqual(0)
    expect(income.cards).toEqual([5, 5, 5, 5])
  })

  it('should handle add Yearly to Daily', () => {
    const income = new DailyIncome(global.__BOOKS__, {
      coins: 10,
      cards: [4, 3, 2, 1],
    })
    const extra = new YearlyIncome(global.__BOOKS__, {
      coins: 365.25 * 10,
      rubies: 365.25 * 5,
      cards: [365.25, 365.25 * 2, 365.25 * 3, 365.25 * 4],
    })
    income.add(extra)
    expect(income.coins).toEqual(20)
    expect(income.rubies).toEqual(5)
    expect(income.stones).toEqual(0)
    expect(income.cards).toEqual([5, 5, 5, 5])
  })

  it('should handle add Daily to Weekly', () => {
    const income = new WeeklyIncome(global.__BOOKS__, {
      coins: 13,
      cards: [4, 3, 2, 1],
    })
    const extra = new DailyIncome(global.__BOOKS__, {
      coins: 1,
      rubies: 1,
      cards: [1, 2, 3, 4],
    })
    income.add(extra)
    expect(income.coins).toEqual(20)
    expect(income.rubies).toEqual(7)
    expect(income.stones).toEqual(0)
    expect(income.cards).toEqual([11, 17, 23, 29])
  })
})
