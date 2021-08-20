import command from './'
const bookodds = command.handler.bind(command)

describe('Bot — !bookodds', () => {
  it('should return nothing for a missing term', () => {
    expect(bookodds('')).toEqual(undefined)
  })

  it('should return nothing for a missing book', () => {
    expect(bookodds('rare')).toEqual(undefined)
    expect(bookodds('rof')).toEqual(undefined)
  })

  it('should return odds for fusion stones', () => {
    expect(bookodds('mythic fs').description).toContain('Fusion stones')
    expect(bookodds('classic fs').description).toContain('Fusion stones')
    expect(bookodds('heroic fs').description).toContain('Fusion stones')
    expect(bookodds('noble fs').description).toContain('Fusion stones')
    expect(bookodds('humble fs').description).toContain('Fusion stones')
  })

  it('should return odds for a rarity', () => {
    expect(
      bookodds('mythic common')
        .fields.map(field => field.name)
        .join(' ')
    ).toContain('Any common card')
    expect(
      bookodds('mythic common')
        .fields.map(field => field.name)
        .join(' ')
    ).toContain('Specific common card')
    expect(
      bookodds('mythic rare')
        .fields.map(field => field.name)
        .join(' ')
    ).toContain('Any rare card')
    expect(
      bookodds('mythic rare')
        .fields.map(field => field.name)
        .join(' ')
    ).toContain('Specific rare card')
    expect(
      bookodds('mythic epic')
        .fields.map(field => field.name)
        .join(' ')
    ).toContain('Any epic card')
    expect(
      bookodds('mythic epic')
        .fields.map(field => field.name)
        .join(' ')
    ).toContain('Specific epic card')
    expect(
      bookodds('mythic legendary')
        .fields.map(field => field.name)
        .join(' ')
    ).toContain('Any legendary card')
    expect(
      bookodds('mythic legendary')
        .fields.map(field => field.name)
        .join(' ')
    ).toContain('Specific legendary card')
  })

  it('should return odds for a specific card', () => {
    expect(bookodds('mythic N1').title).toContain('Green Prototypes')
    expect(bookodds('mythic gifted').title).toContain('Gifted Recruits')
    expect(bookodds('mythic rof').title).toContain('Rain of Frogs')
    expect(bookodds('mythic QoH').title).toContain('Queen of Herds')
  })

  it('should ignore casing', () => {
    expect(bookodds('MytHiC fS').title).toContain('Fusion stones')
  })

  it('should ignore order', () => {
    expect(bookodds('fs classic').title).toContain('Fusion stones')
  })
})
