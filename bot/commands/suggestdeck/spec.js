import getFactionFromDeckID from '~/helpers/getFactionFromDeckID'
import { TAGS } from '~/constants/deck'
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

  it.skip('should handle tags', () => {
    Object.keys(TAGS)
      .map(tag => [tag, suggestdeck(tag.toLowerCase())])
      .filter(([tag, result]) => Boolean(result))
      .forEach(([tag, result]) => {
        const id = result.url.replace(BASE_URL, '')
        const deck = global.__DECKS_INDEX__[id]

        expect(deck.tags.includes(tag)).toEqual(true)
      })
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

      expect(deck.tags.includes('HIGH_LEVELS')).toEqual(true)
      expect(getFactionFromDeckID(deck.id)).toEqual('ironclad')
    })
  })

  it('should ignore unknown terms', () => {
    return suggestdeck('ic foobar').then(output => {
      expect(output.fields.pop().value).toContain('foobar')
    })
  })
})
