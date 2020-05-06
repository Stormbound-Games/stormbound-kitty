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
} from './'

describe('The `getShortFaction` helper', () => {
  it('should return single-letter faction', () => {
    expect(getShortFaction('neutral')).to.equal('N')
    expect(getShortFaction('ironclad')).to.equal('I')
    expect(getShortFaction('swarm')).to.equal('S')
    expect(getShortFaction('shadowfen')).to.equal('F')
    expect(getShortFaction('winter')).to.equal('W')
  })

  it('should default to neutral', () => {
    expect(getShortFaction()).to.equal('N')
    expect(getShortFaction('mldsffkmsd')).to.equal('N')
  })
})

describe('The `getLongFaction` helper', () => {
  it('should return full faction', () => {
    expect(getLongFaction('N')).to.equal('neutral')
    expect(getLongFaction('I')).to.equal('ironclad')
    expect(getLongFaction('S')).to.equal('swarm')
    expect(getLongFaction('F')).to.equal('shadowfen')
    expect(getLongFaction('W')).to.equal('winter')
  })

  it('should default to neutral', () => {
    expect(getLongFaction()).to.equal('neutral')
    expect(getLongFaction('mldsffkmsd')).to.equal('neutral')
  })
})

describe('The `getShortType` helper', () => {
  it('should return single-letter type', () => {
    expect(getShortType('unit')).to.equal('U')
    expect(getShortType('spell')).to.equal('C')
    expect(getShortType('structure')).to.equal('S')
  })

  it('should default to unit', () => {
    expect(getShortType()).to.equal('U')
    expect(getShortType('mldsffkmsd')).to.equal('U')
  })
})

describe('The `getLongType` helper', () => {
  it('should return full type', () => {
    expect(getLongType('U')).to.equal('unit')
    expect(getLongType('C')).to.equal('spell')
    expect(getLongType('S')).to.equal('structure')
  })

  it('should default to unit', () => {
    expect(getLongType()).to.equal('unit')
    expect(getLongType('mldsffkmsd')).to.equal('unit')
  })
})

describe('The `getShortRarity` helper', () => {
  it('should return single-letter rarity', () => {
    expect(getShortRarity('legendary')).to.equal('L')
    expect(getShortRarity('epic')).to.equal('E')
    expect(getShortRarity('rare')).to.equal('R')
    expect(getShortRarity('common')).to.equal('C')
  })

  it('should default to common', () => {
    expect(getShortRarity()).to.equal('C')
    expect(getShortRarity('mldsffkmsd')).to.equal('C')
  })
})

describe('The `getLongRarity` helper', () => {
  it('should return full rarity', () => {
    expect(getLongRarity('L')).to.equal('legendary')
    expect(getLongRarity('E')).to.equal('epic')
    expect(getLongRarity('R')).to.equal('rare')
    expect(getLongRarity('C')).to.equal('common')
  })

  it('should default to common', () => {
    expect(getLongRarity()).to.equal('common')
    expect(getLongRarity('mldsffkmsd')).to.equal('common')
  })
})

describe('The `getShortRace` helper', () => {
  it('should return single-letter race', () => {
    expect(getShortRace('construct')).to.equal('C')
    expect(getShortRace('dragon')).to.equal('D')
    expect(getShortRace('dwarf')).to.equal('W')
    expect(getShortRace('frostling')).to.equal('F')
    expect(getShortRace('feline')).to.equal('E')
    expect(getShortRace('knight')).to.equal('K')
    expect(getShortRace('pirate')).to.equal('P')
    expect(getShortRace('raven')).to.equal('R')
    expect(getShortRace('rodent')).to.equal('O')
    expect(getShortRace('satyr')).to.equal('S')
    expect(getShortRace('toad')).to.equal('T')
    expect(getShortRace('undead')).to.equal('U')
  })

  it('should default to empty', () => {
    expect(getShortRace()).to.equal('')
    expect(getShortRace('mldsffkmsd')).to.equal('')
  })
})

describe('The `getLongRace` helper', () => {
  it('should return full race', () => {
    expect(getLongRace('C')).to.equal('construct')
    expect(getLongRace('D')).to.equal('dragon')
    expect(getLongRace('W')).to.equal('dwarf')
    expect(getLongRace('F')).to.equal('frostling')
    expect(getLongRace('E')).to.equal('feline')
    expect(getLongRace('K')).to.equal('knight')
    expect(getLongRace('P')).to.equal('pirate')
    expect(getLongRace('R')).to.equal('raven')
    expect(getLongRace('O')).to.equal('rodent')
    expect(getLongRace('S')).to.equal('satyr')
    expect(getLongRace('T')).to.equal('toad')
    expect(getLongRace('U')).to.equal('undead')
  })

  it('should default to empty', () => {
    expect(getLongRace()).to.equal('')
    expect(getLongRace('mldsffkmsd')).to.equal('')
  })
})

describe('The `getShortCurrency` helper', () => {
  it('should return single-letter currency', () => {
    expect(getShortCurrency('coins')).to.equal('C')
    expect(getShortCurrency('rubies')).to.equal('R')
    expect(getShortCurrency('stones')).to.equal('S')
  })

  it('should default to coins', () => {
    expect(getShortCurrency()).to.equal('C')
    expect(getShortCurrency('mldsffkmsd')).to.equal('C')
  })
})

describe('The `getLongCurrency` helper', () => {
  it('should return full currency', () => {
    expect(getLongCurrency('C')).to.equal('coins')
    expect(getLongCurrency('R')).to.equal('rubies')
    expect(getLongCurrency('S')).to.equal('stones')
  })

  it('should default to coins', () => {
    expect(getLongCurrency()).to.equal('coins')
    expect(getLongCurrency('mldsffkmsd')).to.equal('coins')
  })
})
