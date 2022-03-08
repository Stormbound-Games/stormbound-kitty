import getFactionFromDeckID from '~/helpers/getFactionFromDeckID'
import command from './'
const suggestdeck = command.handler.bind(command)

const BASE_URL = 'https://stormbound-kitty.com/deck/'

// Skipped because the tests are costly in terms of Sanity requests at the moment.
describe('Bot — !suggestdeck', () => {
  it('should return a suggested deck for an empty search', () => {
    return suggestdeck('').then(output => {
      expect(output.url).toContain(BASE_URL)
    })
  })

  it('should handle factions', () => {
    return suggestdeck('ironclad').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('i')
    )
  })

  it('should handle aliases', () => {
    return suggestdeck('ic').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('i')
    )
  })

  it('should handle including a card', () => {
    return Promise.all([
      suggestdeck('N48'),
      suggestdeck('Earyn'),
      suggestdeck('rof'),
    ]).then(outputs => {
      expect(outputs[0].url).toContain('n48')
      expect(outputs[1].url).toContain('n48')
      expect(outputs[2].url).toContain('f8')
    })
  })

  it('should handle multi-searches', () => {
    return suggestdeck('ic hl').then(output => {
      const id = output.url.replace(BASE_URL, '')
      const deck = global.__DECKS_INDEX__[id]
      const tagSlugs = deck.tags.map(tag => tag.slug)

      expect(tagSlugs.includes('HIGH_LEVELS')).toEqual(true)
      expect(getFactionFromDeckID(deck.id)).toEqual('ironclad')
    })
  })

  it('should ignore unknown terms', () => {
    return suggestdeck('ic foobar').then(output => {
      expect(output.fields.pop().value).toContain('foobar')
    })
  })
})
