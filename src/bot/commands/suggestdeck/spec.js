import DECKS from '~/data/decks'
import getFactionFromDeckID from '~/helpers/getFactionFromDeckID'
import indexArray from '~/helpers/indexArray'
import { TAGS } from '~/constants/deck'
import command from './'
const suggestdeck = command.handler.bind(command)

const DECKS_INDEX = indexArray(DECKS)
const BASE_URL = 'https://stormbound-kitty.com/deck/'

describe('Bot — !suggestdeck', () => {
  it('should return a suggested deck for an empty search', () => {
    expect(suggestdeck('').url).to.contain(BASE_URL)
  })

  it('should handle factions', () => {
    expect(suggestdeck('ironclad').url.replace(BASE_URL, '')).to.contain('i')
    expect(suggestdeck('swarm').url.replace(BASE_URL, '')).to.contain('s')
    expect(suggestdeck('winter').url.replace(BASE_URL, '')).to.contain('w')
    expect(suggestdeck('shadowfen').url.replace(BASE_URL, '')).to.contain('f')
  })

  it('should handle tags', () => {
    Object.keys(TAGS)
      .map(tag => [tag, suggestdeck(tag.toLowerCase())])
      .filter(([tag, result]) => Boolean(result))
      .forEach(([tag, result]) => {
        const id = result.url.replace(BASE_URL, '')
        const deck = DECKS_INDEX[id]

        expect(deck.tags.includes(tag)).to.equal(true)
      })
  })

  it('should handle aliases', () => {
    expect(suggestdeck('ic').url.replace(BASE_URL, '')).to.contain('i')
    expect(suggestdeck('red').url.replace(BASE_URL, '')).to.contain('i')
    expect(suggestdeck('sw').url.replace(BASE_URL, '')).to.contain('s')
    expect(suggestdeck('yellow').url.replace(BASE_URL, '')).to.contain('s')
    expect(suggestdeck('w').url.replace(BASE_URL, '')).to.contain('w')
    expect(suggestdeck('wp').url.replace(BASE_URL, '')).to.contain('w')
    expect(suggestdeck('blue').url.replace(BASE_URL, '')).to.contain('w')
    expect(suggestdeck('sf').url.replace(BASE_URL, '')).to.contain('f')
    expect(suggestdeck('green').url.replace(BASE_URL, '')).to.contain('f')
  })

  it('should handle including a card', () => {
    expect(suggestdeck('N48').url).to.contain('n48')
    expect(suggestdeck('Earyn').url).to.contain('n48')
    expect(suggestdeck('rof').url).to.contain('f8')
  })

  it('should handle multi-searches', () => {
    const id = suggestdeck('ic hl').url.replace(BASE_URL, '')
    const deck = DECKS_INDEX[id]

    expect(deck.tags.includes('HIGH_LEVELS')).to.equal(true)
    expect(getFactionFromDeckID(deck.id)).to.equal('ironclad')
  })

  it('should ignore unknown terms', () => {
    const output = suggestdeck('ic foobar')
    expect(output.fields.pop().value).to.contain('foobar')
  })
})
