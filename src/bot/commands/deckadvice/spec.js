import command from './'
const deckadvice = command.handler.bind(command)

describe('Bot — !deckadvice', () => {
  it('should return nothing for a missing term', () => {
    deckadvice('').then(output => expect(output).to.equal(undefined))
  })

  it('should handle a Stormbound-Kitty deck ID', () => {
    deckadvice('5n35n125n163w54n184w95w125w133n394w153w194w21').then(output =>
      expect(output).to.not.equal(undefined)
    )
  })

  it('should handle a Stormbound-Kitty deck URL', () => {
    const url =
      'https://stormbound-kitty.com/deck/5n35n125n163w54n184w95w125w133n394w153w194w21'

    deckadvice(url).then(output => expect(output).to.not.equal(undefined))
    deckadvice(url + '/detail').then(output =>
      expect(output).to.not.equal(undefined)
    )
    deckadvice(url + '/dry-run').then(output =>
      expect(output).to.not.equal(undefined)
    )
  })

  it('should handle a lack of advice', () => {
    deckadvice('5n31n45n121n145n163w54n181n94w95w125w133w19').then(output =>
      expect(output.description).to.contain('No particular suggestions')
    )
  })

  it('should return advice', () => {
    deckadvice('3n631n703n335n133n415n193n592w102n614n225w23n7').then(output =>
      expect(output.fields.length > 0).to.equal(true)
    )
  })

  it('should return nothing for a no-match', () => {
    deckadvice('flksdjf').then(output => expect(output).to.equal(undefined))
  })
})
