import {
  getShortFaction,
  getLongFaction,
  getShortType,
  getLongType,
  getShortRarity,
  getLongRarity,
  getShortRace,
  getLongRace,
  getShortCurrency,
  getLongCurrency,
  getShortMatchStatus,
  getLongMatchStatus,
} from './'

describe('The `getShortFaction` helper', () => {
  it('should return single-letter faction', () => {
    expect(getShortFaction('neutral')).toEqual('N')
    expect(getShortFaction('ironclad')).toEqual('I')
    expect(getShortFaction('swarm')).toEqual('S')
    expect(getShortFaction('shadowfen')).toEqual('F')
    expect(getShortFaction('winter')).toEqual('W')
  })

  it('should default to neutral', () => {
    expect(getShortFaction()).toEqual('N')
    expect(getShortFaction('mldsffkmsd')).toEqual('N')
  })
})

describe('The `getLongFaction` helper', () => {
  it('should return full faction', () => {
    expect(getLongFaction('N')).toEqual('neutral')
    expect(getLongFaction('I')).toEqual('ironclad')
    expect(getLongFaction('S')).toEqual('swarm')
    expect(getLongFaction('F')).toEqual('shadowfen')
    expect(getLongFaction('W')).toEqual('winter')
  })

  it('should default to neutral', () => {
    expect(getLongFaction()).toEqual('neutral')
    expect(getLongFaction('mldsffkmsd')).toEqual('neutral')
  })
})

describe('The `getShortType` helper', () => {
  it('should return single-letter type', () => {
    expect(getShortType('unit')).toEqual('U')
    expect(getShortType('spell')).toEqual('C')
    expect(getShortType('structure')).toEqual('S')
  })

  it('should default to unit', () => {
    expect(getShortType()).toEqual('U')
    expect(getShortType('mldsffkmsd')).toEqual('U')
  })
})

describe('The `getLongType` helper', () => {
  it('should return full type', () => {
    expect(getLongType('U')).toEqual('unit')
    expect(getLongType('C')).toEqual('spell')
    expect(getLongType('S')).toEqual('structure')
  })

  it('should default to unit', () => {
    expect(getLongType()).toEqual('unit')
    expect(getLongType('mldsffkmsd')).toEqual('unit')
  })
})

describe('The `getShortRarity` helper', () => {
  it('should return single-letter rarity', () => {
    expect(getShortRarity('legendary')).toEqual('L')
    expect(getShortRarity('epic')).toEqual('E')
    expect(getShortRarity('rare')).toEqual('R')
    expect(getShortRarity('common')).toEqual('C')
  })

  it('should default to common', () => {
    expect(getShortRarity()).toEqual('C')
    expect(getShortRarity('mldsffkmsd')).toEqual('C')
  })
})

describe('The `getLongRarity` helper', () => {
  it('should return full rarity', () => {
    expect(getLongRarity('L')).toEqual('legendary')
    expect(getLongRarity('E')).toEqual('epic')
    expect(getLongRarity('R')).toEqual('rare')
    expect(getLongRarity('C')).toEqual('common')
  })

  it('should default to common', () => {
    expect(getLongRarity()).toEqual('common')
    expect(getLongRarity('mldsffkmsd')).toEqual('common')
  })
})

describe('The `getShortRace` helper', () => {
  it('should return single-letter race', () => {
    expect(getShortRace('construct')).toEqual('C')
    expect(getShortRace('dragon')).toEqual('D')
    expect(getShortRace('dwarf')).toEqual('W')
    expect(getShortRace('frostling')).toEqual('F')
    expect(getShortRace('feline')).toEqual('E')
    expect(getShortRace('knight')).toEqual('K')
    expect(getShortRace('pirate')).toEqual('P')
    expect(getShortRace('raven')).toEqual('R')
    expect(getShortRace('rodent')).toEqual('O')
    expect(getShortRace('satyr')).toEqual('S')
    expect(getShortRace('toad')).toEqual('T')
    expect(getShortRace('undead')).toEqual('U')
  })

  it('should default to empty', () => {
    expect(getShortRace()).toEqual('')
  })

  it('should support custom values', () => {
    expect(getShortRace('mldsffkmsd')).toEqual('mldsffkmsd')
  })
})

describe('The `getLongRace` helper', () => {
  it('should return full race', () => {
    expect(getLongRace('C')).toEqual('construct')
    expect(getLongRace('D')).toEqual('dragon')
    expect(getLongRace('W')).toEqual('dwarf')
    expect(getLongRace('F')).toEqual('frostling')
    expect(getLongRace('E')).toEqual('feline')
    expect(getLongRace('K')).toEqual('knight')
    expect(getLongRace('P')).toEqual('pirate')
    expect(getLongRace('R')).toEqual('raven')
    expect(getLongRace('O')).toEqual('rodent')
    expect(getLongRace('S')).toEqual('satyr')
    expect(getLongRace('T')).toEqual('toad')
    expect(getLongRace('U')).toEqual('undead')
  })

  it('should default to empty', () => {
    expect(getLongRace()).toEqual('')
  })

  it('should support custom values', () => {
    expect(getLongRace('mldsffkmsd')).toEqual('mldsffkmsd')
  })
})

describe('The `getShortCurrency` helper', () => {
  it('should return single-letter currency', () => {
    expect(getShortCurrency('coins')).toEqual('C')
    expect(getShortCurrency('rubies')).toEqual('R')
    expect(getShortCurrency('stones')).toEqual('S')
  })

  it('should default to coins', () => {
    expect(getShortCurrency()).toEqual('C')
    expect(getShortCurrency('mldsffkmsd')).toEqual('C')
  })
})

describe('The `getLongCurrency` helper', () => {
  it('should return full currency', () => {
    expect(getLongCurrency('C')).toEqual('coins')
    expect(getLongCurrency('R')).toEqual('rubies')
    expect(getLongCurrency('S')).toEqual('stones')
  })

  it('should default to coins', () => {
    expect(getLongCurrency()).toEqual('coins')
    expect(getLongCurrency('mldsffkmsd')).toEqual('coins')
  })
})

describe('The `getShortMatchStatus` helper', () => {
  it('should return single-letter currency', () => {
    expect(getShortMatchStatus('WON')).toEqual('W')
    expect(getShortMatchStatus('FORFEIT')).toEqual('F')
    expect(getShortMatchStatus('DRAW')).toEqual('D')
    expect(getShortMatchStatus('SURRENDERED')).toEqual('S')
    expect(getShortMatchStatus('LOST')).toEqual('L')
  })

  it('should default to an empty string', () => {
    expect(getShortMatchStatus()).toEqual('')
    expect(getShortMatchStatus('mldsffkmsd')).toEqual('')
  })
})

describe('The `getLongMatchStatus` helper', () => {
  it('should return full currency', () => {
    expect(getLongMatchStatus('W')).toEqual('WON')
    expect(getLongMatchStatus('F')).toEqual('FORFEIT')
    expect(getLongMatchStatus('D')).toEqual('DRAW')
    expect(getLongMatchStatus('S')).toEqual('SURRENDERED')
    expect(getLongMatchStatus('L')).toEqual('LOST')
  })

  it('should default to an empty string', () => {
    expect(getLongMatchStatus()).toEqual('')
    expect(getLongMatchStatus('mldsffkmsd')).toEqual('')
  })
})
