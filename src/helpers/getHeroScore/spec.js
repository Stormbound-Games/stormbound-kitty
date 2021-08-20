import getHeroScore from './'

const CASES = [
  // [Current, Opponent, Coefficient, Won] -> New
  [[1000, 1000, 40, true], 1020],
  [[1000, 1000, 40, false], 990],
  [[2000, 2300, 40, true], 2034],
  [[2300, 2000, 40, false], 2290],
  [[2800, 2400, 10, true], 2805],
  [[2400, 2800, 10, false], 2399],
  [[4000, 1, 40, true], 4005],
  [[1, 4000, 10, false], 0],
  [[1000, 0, 40, true], 1005],
  [[0, 1000, 40, false], -4],
]

describe.only('The `getHeroScore` helper', () => {
  it('should pass Sheepyard-provided test cases', () => {
    CASES.forEach(([variables, expected]) => {
      const [current, opponent, coefficient, won] = variables
      expect(getHeroScore({ current, opponent, coefficient, won })).toEqual(
        expected
      )
    })
  })
})
