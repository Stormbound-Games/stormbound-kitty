import getFactionFromDeckID from '~/helpers/getFactionFromDeckID'
import indexArray from '~/helpers/indexArray'
import getDecks from '~/api/decks/getDecks'
import { TAGS } from '~/constants/deck'
import command from './'
const suggestdeck = command.handler.bind(command)

const BASE_URL = 'https://stormbound-kitty.com/deck/'

// Skipped because the tests are costly in terms of Sanity requests at the moment.
describe.skip('Bot — !suggestdeck', () => {
  let DECKS_INDEX = null

  beforeAll(() => {
    return getDecks().then(decks => {
      DECKS_INDEX = indexArray(decks)
    })
  })

  it('should return a suggested deck for an empty search', () => {
    suggestdeck('').then(output => {
      expect(output.url).toContain(BASE_URL)
    })
  })

  it('should handle factions', () => {
    suggestdeck('ironclad').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('i')
    )
    suggestdeck('swarm').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('s')
    )
    suggestdeck('winter').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('w')
    )
    suggestdeck('shadowfen').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('f')
    )
  })

  it('should handle tags', () => {
    Object.keys(TAGS)
      .map(tag => [tag, suggestdeck(tag.toLowerCase())])
      .filter(([tag, result]) => Boolean(result))
      .forEach(([tag, result]) => {
        const id = result.url.replace(BASE_URL, '')
        const deck = DECKS_INDEX[id]

        expect(deck.tags.includes(tag)).toEqual(true)
      })
  })

  it('should handle aliases', () => {
    suggestdeck('ic').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('i')
    )
    suggestdeck('red').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('i')
    )
    suggestdeck('sw').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('s')
    )
    suggestdeck('yellow').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('s')
    )
    suggestdeck('w').ur.then(output =>
      expect(outputl.replace(BASE_URL, '')).toContain('w')
    )
    suggestdeck('wp').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('w')
    )
    suggestdeck('blue').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('w')
    )
    suggestdeck('sf').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('f')
    )
    suggestdeck('green').then(output =>
      expect(output.url.replace(BASE_URL, '')).toContain('f')
    )
  })

  it('should handle including a card', () => {
    suggestdeck('N48').then(output => expect(output.url).toContain('n48'))
    suggestdeck('Earyn').then(output => expect(output.url).toContain('n48'))
    suggestdeck('rof').then(output => expect(output.url).toContain('f8'))
  })

  it('should handle multi-searches', () => {
    suggestdeck('ic hl').then(output => {
      const id = output.url.replace(BASE_URL, '')
      const deck = DECKS_INDEX[id]

      expect(deck.tags.includes('HIGH_LEVELS')).toEqual(true)
      expect(getFactionFromDeckID(deck.id)).toEqual('ironclad')
    })
  })

  it('should ignore unknown terms', () => {
    suggestdeck('ic foobar').then(output => {
      expect(output.fields.pop().value).toContain('foobar')
    })
  })
})
