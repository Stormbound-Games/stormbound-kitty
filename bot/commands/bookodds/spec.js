import command from './'
const bookodds = command.handler.bind(command)

describe('Bot — !bookodds', () => {
  it('should return nothing for a missing term', () => {
    return bookodds('').then(output => expect(output).toEqual(undefined))
  })

  it('should return nothing for a missing book', () => {
    return bookodds('rare').then(output => expect(output).toEqual(undefined))
  })

  it('should return odds for fusion stones', () => {
    return Promise.all([
      bookodds('mythic fs'),
      bookodds('classic fs'),
      bookodds('heroic fs'),
      bookodds('noble fs'),
      bookodds('humble fs'),
    ]).then(outputs => {
      expect(outputs[0].description).toContain('Fusion stones')
      expect(outputs[1].description).toContain('Fusion stones')
      expect(outputs[2].description).toContain('Fusion stones')
      expect(outputs[3].description).toContain('Fusion stones')
      expect(outputs[4].description).toContain('Fusion stones')
    })
  })

  it('should return odds for a rarity', () => {
    return bookodds('mythic common').then(output => {
      const fields = output.fields.map(field => field.name).join(' ')

      expect(fields).toContain('Any common card')
      expect(fields).toContain('Specific common card')
    })
  })

  it('should return odds for a specific card', () => {
    return Promise.all([
      bookodds('mythic N1'),
      bookodds('mythic gifted'),
      bookodds('mythic rof'),
      bookodds('mythic QoH'),
    ]).then(outputs => {
      expect(outputs[0].title).toContain('Green Prototypes')
      expect(outputs[1].title).toContain('Gifted Recruits')
      expect(outputs[2].title).toContain('Rain of Frogs')
      expect(outputs[3].title).toContain('Queen of Herds')
    })
  })

  it('should ignore casing', () => {
    return bookodds('MytHiC fS').then(output =>
      expect(output.title).toContain('Fusion stones')
    )
  })

  it('should ignore order', () => {
    return bookodds('fs classic').then(output =>
      expect(output.title).toContain('Fusion stones')
    )
  })
})
