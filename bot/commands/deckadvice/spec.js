import command from './'
const deckadvice = command.handler.bind(command)

describe('Bot — !deckadvice', () => {
  it('should return nothing for a missing term', () => {
    return deckadvice('').then(output => expect(output).toEqual(undefined))
  })

  it('should handle a Stormbound-Kitty deck ID', () => {
    return deckadvice('5n35n125n163w54n184w95w125w133n394w153w194w21').then(
      output => expect(output).not.toEqual(undefined)
    )
  })

  it('should handle a Stormbound-Kitty deck URL', () => {
    const url =
      'https://stormbound-kitty.com/deck/5n35n125n163w54n184w95w125w133n394w153w194w21'

    return Promise.all([
      deckadvice(url).then(output => expect(output).not.toEqual(undefined)),
      deckadvice(url + '/detail').then(output =>
        expect(output).not.toEqual(undefined)
      ),
      deckadvice(url + '/dry-run').then(output =>
        expect(output).not.toEqual(undefined)
      ),
    ])
  })

  it('should handle a lack of advice', () => {
    return deckadvice('5n31n41n95n121n143w54n185w74w95w125w133w19').then(
      output =>
        expect(output.description).toContain('No particular suggestions')
    )
  })

  it('should return advice', () => {
    return deckadvice('3n631n703n335n133n415n193n592w102n614n225w23n7').then(
      output => expect(output.fields.length > 0).toEqual(true)
    )
  })

  it('should return nothing for a no-match', () => {
    return deckadvice('flksdjf').then(output =>
      expect(output).toEqual(undefined)
    )
  })
})
