import getFactionFromDeckID from './'

describe('The `getFactionFromDeckID` helper', () => {
  it('should recognise shadowfen', () => {
    expect(getFactionFromDeckID('5xn1n2f3n3n4n6n10f9n16f14n46n52')).toEqual(
      'shadowfen'
    )
  })

  it('should recognise ironclad', () => {
    expect(getFactionFromDeckID('3xn1i1n3n6i6i7i8i12i15n28i17n47')).toEqual(
      'ironclad'
    )
  })

  it('should recognise winter', () => {
    expect(getFactionFromDeckID('5xn1n2w2n3n4n16w6w7n28w12w19n52')).toEqual(
      'winter'
    )
  })

  it('should recognise swarm', () => {
    expect(getFactionFromDeckID('3xn4s1n3s5s9s8s7s12s13s14s17s16')).toEqual(
      'swarm'
    )
  })

  it('should handle neutral decks', () => {
    expect(
      getFactionFromDeckID('4n14n23n664n34n44n53n64n623n674n74n93n10')
    ).toEqual('neutral')
  })

  it('should handle multi-faction decks', () => {
    expect(
      getFactionFromDeckID('3n664n34n44n53n64n623n674n74n93n104f53s4')
    ).toEqual('multi-factions')
  })
})
