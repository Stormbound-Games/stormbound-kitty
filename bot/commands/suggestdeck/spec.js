import getFactionFromDeckID from '~/helpers/getFactionFromDeckID'
import indexArray from '~/helpers/indexArray'
import getDecks from '~/api/decks/getDecks'
import { TAGS } from '~/constants/deck'
import command from './'
const suggestdeck = command.handler.bind(command)

const BASE_URL = 'https://stormbound-kitty.com/deck/'

describe('Bot — !suggestdeck', () => {
  let DECKS_INDEX = null

  beforeAll(() => {
    return getDecks().then(decks => {
      DECKS_INDEX = indexArray(decks)
    })
  })

  it('should return a suggested deck for an empty search', () => {
    expect(suggestdeck('').url).toContain(BASE_URL)
  })

  it('should handle factions', () => {
    expect(suggestdeck('ironclad').url.replace(BASE_URL, '')).toContain('i')
    expect(suggestdeck('swarm').url.replace(BASE_URL, '')).toContain('s')
    expect(suggestdeck('winter').url.replace(BASE_URL, '')).toContain('w')
    expect(suggestdeck('shadowfen').url.replace(BASE_URL, '')).toContain('f')
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
    expect(suggestdeck('ic').url.replace(BASE_URL, '')).toContain('i')
    expect(suggestdeck('red').url.replace(BASE_URL, '')).toContain('i')
    expect(suggestdeck('sw').url.replace(BASE_URL, '')).toContain('s')
    expect(suggestdeck('yellow').url.replace(BASE_URL, '')).toContain('s')
    expect(suggestdeck('w').url.replace(BASE_URL, '')).toContain('w')
    expect(suggestdeck('wp').url.replace(BASE_URL, '')).toContain('w')
    expect(suggestdeck('blue').url.replace(BASE_URL, '')).toContain('w')
    expect(suggestdeck('sf').url.replace(BASE_URL, '')).toContain('f')
    expect(suggestdeck('green').url.replace(BASE_URL, '')).toContain('f')
  })

  it('should handle including a card', () => {
    expect(suggestdeck('N48').url).toContain('n48')
    expect(suggestdeck('Earyn').url).toContain('n48')
    expect(suggestdeck('rof').url).toContain('f8')
  })

  it('should handle multi-searches', () => {
    const id = suggestdeck('ic hl').url.replace(BASE_URL, '')
    const deck = DECKS_INDEX[id]

    expect(deck.tags.includes('HIGH_LEVELS')).toEqual(true)
    expect(getFactionFromDeckID(deck.id)).toEqual('ironclad')
  })

  it('should ignore unknown terms', () => {
    const output = suggestdeck('ic foobar')
    expect(output.fields.pop().value).toContain('foobar')
  })
})
