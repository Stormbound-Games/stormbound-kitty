import { computeBaseHealth, computeProgress } from './'

describe('The `computeBaseHealth` helper', () => {
  it('should handle 20 BH', () => {
    expect(computeBaseHealth(8000)).toEqual(20)
    expect(computeBaseHealth(8001)).toEqual(20)
  })

  it('should handle 19 BH', () => {
    expect(computeBaseHealth(6000)).toEqual(19)
    expect(computeBaseHealth(6001)).toEqual(19)
  })

  it('should handle 18 BH', () => {
    expect(computeBaseHealth(4400)).toEqual(18)
    expect(computeBaseHealth(4401)).toEqual(18)
  })

  it('should handle 17 BH', () => {
    expect(computeBaseHealth(3000)).toEqual(17)
    expect(computeBaseHealth(3001)).toEqual(17)
  })

  it('should handle 16 BH', () => {
    expect(computeBaseHealth(1900)).toEqual(16)
    expect(computeBaseHealth(1901)).toEqual(16)
  })

  it('should handle 15 BH', () => {
    expect(computeBaseHealth(1200)).toEqual(15)
    expect(computeBaseHealth(1201)).toEqual(15)
  })

  it('should handle 14 BH', () => {
    expect(computeBaseHealth(800)).toEqual(14)
    expect(computeBaseHealth(801)).toEqual(14)
  })

  it('should handle 13 BH', () => {
    expect(computeBaseHealth(500)).toEqual(13)
    expect(computeBaseHealth(501)).toEqual(13)
  })

  it('should handle 12 BH', () => {
    expect(computeBaseHealth(300)).toEqual(12)
    expect(computeBaseHealth(301)).toEqual(12)
  })

  it('should handle 11 BH', () => {
    expect(computeBaseHealth(100)).toEqual(11)
    expect(computeBaseHealth(101)).toEqual(11)
  })

  it('should handle 10 BH', () => {
    expect(computeBaseHealth(0)).toEqual(10)
    expect(computeBaseHealth(1)).toEqual(10)
  })
})

describe('The `computeProgress` helper', () => {
  it('should return current progress', () => {
    expect(computeProgress(7000)).toEqual(0.5)
  })
})
