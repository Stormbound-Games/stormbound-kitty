import { TYPES } from '~/constants/game'
import randomizeCard from './'

describe('The `randomizeCard` helper', () => {
  it('should return a valid card type', () => {
    expect(TYPES).toContain(randomizeCard().type)
  })
})
