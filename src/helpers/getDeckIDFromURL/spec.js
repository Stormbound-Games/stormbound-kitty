import getDeckIDFromURL from './'

describe('The `getDeckIDFromURL` helper', () => {
  it('should remove base URL', () => {
    expect(
      getDeckIDFromURL(
        'https://stormbound-kitty.com/deck/5n15n25f45f35n35n95n125n165n285f145n305n52'
      )
    ).toEqual('5n15n25f45f35n35n95n125n165n285f145n305n52')
  })
  it('should remove deck paths', () => {
    expect(
      getDeckIDFromURL(
        'https://stormbound-kitty.com/deck/5n15n25f45f35n35n95n125n165n285f145n305n52/detail'
      )
    ).toEqual('5n15n25f45f35n35n95n125n165n285f145n305n52')

    expect(
      getDeckIDFromURL(
        'https://stormbound-kitty.com/deck/5n15n25f45f35n35n95n125n165n285f145n305n52/dry-run'
      )
    ).toEqual('5n15n25f45f35n35n95n125n165n285f145n305n52')
  })
})
