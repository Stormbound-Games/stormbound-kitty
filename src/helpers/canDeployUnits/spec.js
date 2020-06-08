import getRawCardData from '../getRawCardData'
import getResolvedCardData from '../getResolvedCardData'
import canDeployUnits from './'

describe('The `canDeployUnits` helper', () => {
  it('should return true if a unit can be played', () => {
    const cards = [getRawCardData('N1')]
    expect(canDeployUnits(3, cards)).to.equal(true)
  })

  it('should return false if no unit can be played', () => {
    const cards = [getRawCardData('N30')]
    expect(canDeployUnits(3, cards)).to.equal(false)
  })

  it('should return true if Summon Militia can be played', () => {
    const cards = [getRawCardData('N2')]
    expect(canDeployUnits(3, cards)).to.equal(true)
  })

  it('should return true if Head Start can be played', () => {
    const cards = [getRawCardData('S24')]
    expect(canDeployUnits(3, cards)).to.equal(true)
  })

  it('should return true if Rain of Frogs can be played', () => {
    const cards = [getResolvedCardData({ id: 'F8', level: 1 })]
    expect(canDeployUnits(3, cards)).to.equal(true)
  })
})
