import { computeBaseHealth, computeProgress } from './'

describe('The `computeBaseHealth` helper', () => {
  it('should handle 20 BH', () => {
    expect(computeBaseHealth(8000)).to.equal(20)
    expect(computeBaseHealth(8001)).to.equal(20)
  })

  it('should handle 19 BH', () => {
    expect(computeBaseHealth(6000)).to.equal(19)
    expect(computeBaseHealth(6001)).to.equal(19)
  })

  it('should handle 18 BH', () => {
    expect(computeBaseHealth(4400)).to.equal(18)
    expect(computeBaseHealth(4401)).to.equal(18)
  })

  it('should handle 17 BH', () => {
    expect(computeBaseHealth(3000)).to.equal(17)
    expect(computeBaseHealth(3001)).to.equal(17)
  })

  it('should handle 16 BH', () => {
    expect(computeBaseHealth(1900)).to.equal(16)
    expect(computeBaseHealth(1901)).to.equal(16)
  })

  it('should handle 15 BH', () => {
    expect(computeBaseHealth(1200)).to.equal(15)
    expect(computeBaseHealth(1201)).to.equal(15)
  })

  it('should handle 14 BH', () => {
    expect(computeBaseHealth(800)).to.equal(14)
    expect(computeBaseHealth(801)).to.equal(14)
  })

  it('should handle 13 BH', () => {
    expect(computeBaseHealth(500)).to.equal(13)
    expect(computeBaseHealth(501)).to.equal(13)
  })

  it('should handle 12 BH', () => {
    expect(computeBaseHealth(300)).to.equal(12)
    expect(computeBaseHealth(301)).to.equal(12)
  })

  it('should handle 11 BH', () => {
    expect(computeBaseHealth(100)).to.equal(11)
    expect(computeBaseHealth(101)).to.equal(11)
  })

  it('should handle 10 BH', () => {
    expect(computeBaseHealth(0)).to.equal(10)
    expect(computeBaseHealth(1)).to.equal(10)
  })
})

describe('The `computeProgress` helper', () => {
  it('should return current progress', () => {
    expect(computeProgress(7000)).to.equal(0.5)
  })
})
