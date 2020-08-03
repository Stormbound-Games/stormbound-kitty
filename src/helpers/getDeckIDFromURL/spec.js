import getDeckIDFromURL from './'

describe('The `getDeckIDFromURL` helper', () => {
  it('should remove base URL', () => {
    expect(
      getDeckIDFromURL(
        'https://stormbound-kitty.com/deck/5n15n25f45f35n35n95n125n165n285f145n305n52'
      )
    ).to.equal('5n15n25f45f35n35n95n125n165n285f145n305n52')
  })
  it('should remove deck paths', () => {
    expect(
      getDeckIDFromURL(
        'https://stormbound-kitty.com/deck/5n15n25f45f35n35n95n125n165n285f145n305n52/detail'
      )
    ).to.equal('5n15n25f45f35n35n95n125n165n285f145n305n52')

    expect(
      getDeckIDFromURL(
        'https://stormbound-kitty.com/deck/5n15n25f45f35n35n95n125n165n285f145n305n52/dry-run'
      )
    ).to.equal('5n15n25f45f35n35n95n125n165n285f145n305n52')

    expect(
      getDeckIDFromURL(
        'https://stormbound-kitty.com/deck/5n15n25f45f35n35n95n125n165n285f145n305n52/tracker'
      )
    ).to.equal('5n15n25f45f35n35n95n125n165n285f145n305n52')
  })
})
