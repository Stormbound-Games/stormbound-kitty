import command from './'
const bookodds = command.handler.bind(command)

describe('Bot — !bookodds', () => {
  it('should return nothing for a missing term', () => {
    expect(bookodds('')).to.equal(undefined)
  })

  it('should return nothing for a missing book', () => {
    expect(bookodds('rare')).to.equal(undefined)
    expect(bookodds('rof')).to.equal(undefined)
  })

  it('should return odds for fusion stones', () => {
    expect(bookodds('mythic fs').description).to.contain('Fusion stones')
    expect(bookodds('classic fs').description).to.contain('Fusion stones')
    expect(bookodds('heroic fs').description).to.contain('Fusion stones')
    expect(bookodds('noble fs').description).to.contain('Fusion stones')
    expect(bookodds('humble fs').description).to.contain('Fusion stones')
  })

  it('should return odds for a rarity', () => {
    expect(
      bookodds('mythic common')
        .fields.map(field => field.name)
        .join(' ')
    ).to.contain('Any common card')
    expect(
      bookodds('mythic common')
        .fields.map(field => field.name)
        .join(' ')
    ).to.contain('Specific common card')
    expect(
      bookodds('mythic rare')
        .fields.map(field => field.name)
        .join(' ')
    ).to.contain('Any rare card')
    expect(
      bookodds('mythic rare')
        .fields.map(field => field.name)
        .join(' ')
    ).to.contain('Specific rare card')
    expect(
      bookodds('mythic epic')
        .fields.map(field => field.name)
        .join(' ')
    ).to.contain('Any epic card')
    expect(
      bookodds('mythic epic')
        .fields.map(field => field.name)
        .join(' ')
    ).to.contain('Specific epic card')
    expect(
      bookodds('mythic legendary')
        .fields.map(field => field.name)
        .join(' ')
    ).to.contain('Any legendary card')
    expect(
      bookodds('mythic legendary')
        .fields.map(field => field.name)
        .join(' ')
    ).to.contain('Specific legendary card')
  })

  it('should return odds for a specific card', () => {
    expect(bookodds('mythic N1').title).to.contain('Green Prototypes')
    expect(bookodds('mythic gifted').title).to.contain('Gifted Recruits')
    expect(bookodds('mythic rof').title).to.contain('Rain of Frogs')
    expect(bookodds('mythic QoH').title).to.contain('Queen of Herds')
  })

  it('should ignore casing', () => {
    expect(bookodds('MytHiC fS').title).to.contain('Fusion stones')
  })

  it('should ignore order', () => {
    expect(bookodds('fs classic').title).to.contain('Fusion stones')
  })
})
