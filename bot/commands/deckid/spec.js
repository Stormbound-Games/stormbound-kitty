import command from './'
const deckid = command.handler.bind(command)

const BASE_URL = 'https://stormbound-kitty.com/deck/'

describe('Bot — !deckid', () => {
  it('should return nothing for a missing term', () => {
    return deckid('').then(output => expect(output).toEqual(undefined))
  })

  it('should default to level 1 for no mentioned levels', () => {
    return deckid('gp,sm,dopp,gr,start,rg,uh,wild,forg,pog,sg,dev').then(
      output =>
        expect(output.url).toEqual(BASE_URL + '1xn1n2s1n3s24s2n63n67s6n15s8s11')
    )
  })

  it('should handle leading deck level', () => {
    return deckid('5 gp,sm,dopp,gr,start,rg,uh,wild,forg,pog,sg,dev').then(
      output =>
        expect(output.url).toEqual(BASE_URL + '5xn1n2s1n3s24s2n63n67s6n15s8s11')
    )
  })

  it('should handle trailing deck level', () => {
    return deckid('gp,sm,dopp,gr,start,rg,uh,wild,forg,pog,sg,dev 5').then(
      output =>
        expect(output.url).toEqual(BASE_URL + '5xn1n2s1n3s24s2n63n67s6n15s8s11')
    )
  })

  it('should handle card levels', () => {
    return deckid(
      'gp 1,2sm,3 dopp,gr4,5  start,rg,uh,wild,forg,pog,sg,dev'
    ).then(output =>
      expect(output.url).toEqual(
        BASE_URL + '1n12n23s14n35s241s21n631n671s61n151s81s11'
      )
    )
  })

  it('should handle card level and deck level', () => {
    return deckid(
      'gp 1,2sm,3 dopp,gr4,5  start,rg,uh,wild,forg,pog,sg,dev 3'
    ).then(output =>
      expect(output.url).toEqual(
        BASE_URL + '1n12n23s14n35s243s23n633n673s63n153s83s11'
      )
    )
  })

  it('should cap the deck length at 12', () => {
    return deckid(
      'gp,sm,dopp,gr,start,rg,uh,wild,forg,pog,sg,dev,5lawles'
    ).then(output => expect(output.url).not.toContain('5n2'))
  })

  it('should prevent duplicates', () => {
    return deckid('salty,5 salty').then(output =>
      expect(output.url).toEqual(BASE_URL + '1n52')
    )
  })

  it('should return nothing for a no-match', () => {
    return deckid('flksdjf').then(output => expect(output).toEqual(undefined))
  })

  it('should ignore unknown terms', () => {
    return deckid('gp,qsdkljsk,gr').then(output => {
      expect(output.url).toContain('1n11n3')
      expect(output.fields.pop().value).toContain('qsdkljsk')
    })
  })
})
