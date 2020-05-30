import command from './'
const deckadvice = command.handler

describe('Bot — !deckadvice', () => {
  it('should return nothing for a missing term', () => {
    expect(deckadvice('')).to.equal(undefined)
    expect(deckadvice('  ')).to.equal(undefined)
  })

  it('should handle a Stormbound-Kitty deck ID', () => {
    expect(
      deckadvice('5n35n125n163w54n184w95w125w133n394w153w194w21')
    ).to.not.equal(undefined)
  })

  it('should handle a Stormbound-Kitty deck URL', () => {
    const url =
      'https://stormbound-kitty.com/deck/5n35n125n163w54n184w95w125w133n394w153w194w21'
    expect(deckadvice(url)).to.not.equal(undefined)
    expect(deckadvice(url + '/detail')).to.not.equal(undefined)
    expect(deckadvice(url + '/dry-run')).to.not.equal(undefined)
  })

  it('should handle a lack of advice', () => {
    expect(
      deckadvice('5n35n125n163w54n184w95w125w133n394w153w194w21')
    ).to.contain('alright!')
  })

  it('should return advice', () => {
    expect(
      deckadvice('3n631n703n335n133n415n193n592w102n614n225w23n7')
    ).to.contain('\n-')
  })

  it('should return nothing for a no-match', () => {
    expect(deckadvice('flksdjf')).to.equal(undefined)
  })
})
