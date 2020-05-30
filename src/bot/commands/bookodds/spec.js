import command from './'
const bookodds = command.handler

describe('Bot — !bookodds', () => {
  it('should return nothing for a missing term', () => {
    expect(bookodds('')).to.equal(undefined)
  })

  it('should return nothing for a missing book', () => {
    expect(bookodds('rare')).to.equal(undefined)
    expect(bookodds('rof')).to.equal(undefined)
  })

  it('should return odds for fusion stones', () => {
    expect(bookodds('mythic fs')).to.contain('Fusion stones')
    expect(bookodds('classic fs')).to.contain('Fusion stones')
    expect(bookodds('heroic fs')).to.contain('Fusion stones')
    expect(bookodds('noble fs')).to.contain('Fusion stones')
    expect(bookodds('humble fs')).to.contain('Fusion stones')
  })

  it('should return odds for a rarity', () => {
    expect(bookodds('mythic common')).to.contain('any common card')
    expect(bookodds('mythic common')).to.contain('specific common card')
    expect(bookodds('mythic rare')).to.contain('any rare card')
    expect(bookodds('mythic rare')).to.contain('specific rare card')
    expect(bookodds('mythic epic')).to.contain('any epic card')
    expect(bookodds('mythic epic')).to.contain('specific epic card')
    expect(bookodds('mythic legendary')).to.contain('any legendary card')
    expect(bookodds('mythic legendary')).to.contain('specific legendary card')
  })

  it('should return odds for a specific card', () => {
    expect(bookodds('mythic N1')).to.contain('Green Prototypes')
    expect(bookodds('mythic gifted')).to.contain('Gifted Recruits')
    expect(bookodds('mythic rof')).to.contain('Rain of Frogs')
    expect(bookodds('mythic QoH')).to.contain('Queen of Herds')
  })

  it('should ignore casing', () => {
    expect(bookodds('MytHiC fS')).to.contain('Fusion stones')
  })

  it('should ignore order', () => {
    expect(bookodds('fs classic')).to.contain('Fusion stones')
  })
})
