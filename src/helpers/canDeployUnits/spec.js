import getResolvedCardData from '~/helpers/getResolvedCardData'
import canDeployUnits from './'

describe('The `canDeployUnits` helper', () => {
  it('should return true if a unit can be played', () => {
    const cards = [global.__CARDS_INDEX__.N1]
    expect(canDeployUnits(3, cards)).toEqual(true)
  })

  it('should return false if no unit can be played', () => {
    const cards = [global.__CARDS_INDEX__.N30]
    expect(canDeployUnits(3, cards)).toEqual(false)
  })

  it('should return true if Summon Militia can be played', () => {
    const cards = [global.__CARDS_INDEX__.N2]
    expect(canDeployUnits(3, cards)).toEqual(true)
  })

  it('should return true if Head Start can be played', () => {
    const cards = [global.__CARDS_INDEX__.S24]
    expect(canDeployUnits(3, cards)).toEqual(true)
  })

  it('should return true if Rain of Frogs can be played', () => {
    const cards = [
      getResolvedCardData(global.__CARDS_INDEX__, { id: 'F8', level: 1 }),
    ]
    expect(canDeployUnits(3, cards)).toEqual(true)
  })
})
