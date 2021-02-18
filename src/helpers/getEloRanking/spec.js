import getEloRanking from './'

const CASES = [
  // Current, Opponent, Coefficient, Won -> New
  [[1000, 1000, 40, true], 1020],
  [[1000, 1000, 40, false], 980],
  [[2000, 2300, 40, true], 2033.960818],
  [[2300, 2000, 40, false], 2266.039182],
  [[2800, 2400, 10, true], 2800.909091],
  [[2400, 2800, 10, false], 2399.090909],
  [[4000, 1, 40, true], 4003.636364],
]

describe.only('The `getEloRanking` helper', () => {
  it('should pass Sheepyard-provided test cases', () => {
    CASES.forEach(([variables, expected]) => {
      const [current, opponent, coefficient, won] = variables
      expect(
        Math.round(getEloRanking({ current, opponent, coefficient, won }))
      ).to.equal(Math.round(expected))
    })
  })
})
