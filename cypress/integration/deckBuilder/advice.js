describe('Deck Builder — Advice', () => {
  it('should warn about multi-factions decks', () => {
    cy.visit('/deck/5n15n25n33n633n71n643w114w72i253f172s184n44/detail')
      .get('#MULTI_FACTIONS')
      .should('be.visible')
  })

  it('should warn about expensive decks', () => {
    cy.visit('/deck/1n701n481n491n501n511n521n531n541n551n561n571n58/detail')
      .get('#HEAVY_DECK')
      .should('be.visible')
  })

  it('should warn about cheap decks', () => {
    cy.visit('/deck/1n11n21n31n41n51n61n621n631n671n661n71n8/detail')
      .get('#LIGHT_DECK')
      .should('be.visible')
  })

  it('should warn about static decks', () => {
    cy.visit('/deck/4n382s195n131n702n232n625n194n345n32s34s13s14/detail')
      .get('#SLOW_DECK')
      .should('be.visible')
  })

  it('should warn about spell decks', () => {
    cy.visit('/deck/1w11n21n631n231n151n91n211n291n311n401n441n50/detail')
      .get('#MANY_SPELLS')
      .should('be.visible')
  })

  it('should warn about inefficient Archdruid Earyn', () => {
    cy.visit('/deck/1n11n101n111n121i91i61i141n321n691n721n471n48/detail')
      .get('#INEFFICIENT_EARYN')
      .should('be.visible')
  })

  it('should warn about inefficient Ubass', () => {
    cy.visit('/deck/1n11i11i81i91i61i141n241i271i161n321n351n47/detail')
      .get('#INEFFICIENT_UBASS')
      .should('be.visible')
  })

  it('should warn about inefficient Mia', () => {
    cy.visit('/deck/1n11n21i11i21i81i91i61n241i271i161n321n47/detail')
      .get('#INEFFICIENT_MIA')
      .should('be.visible')
  })

  it('should warn about inefficient Linked Golems', () => {
    cy.visit('/deck/1i11n51i41n101i81n731n191n281i201n381n701n55/detail')
      .get('#INEFFICIENT_LINKED_GOLEMS')
      .should('be.visible')
  })

  it('should warn about inefficient High Priestess Klaxi', () => {
    cy.visit('/deck/1f41n81n611n181n91n251f131n311n341n361n381f23/detail')
      .get('#INEFFICIENT_KLAXI')
      .should('be.visible')
  })

  it('should warn about inefficient High Priestess Klaxi with Brood Sages', () => {
    cy.visit('/deck/1n21f11n41n71n731n191n91n211n241n361n701f23/detail')
      .get('#INEFFICIENT_KLAXI')
      .should('be.visible')
  })

  it('should warn about inefficient Spellbinder Zhevana', () => {
    cy.visit('/deck/1n501w191n621w171n701n51n631n141w81w281n151n41/detail')
      .get('#INEFFICIENT_SPELLBINDER_ZHEVANA')
      .should('be.visible')
  })

  it('should warn about inefficient Freeze Combos', () => {
    cy.visit('/deck/1n51n621n631n141n151w41w281n411w171n701n501w19/detail')
      .get('#INEFFICIENT_FREEZE_COMBOS')
      .should('be.visible')
  })

  it('should warn about inefficient Poison Combos', () => {
    cy.visit('/deck/1n11n671n71n141f61n161n171f151n331n451n701n55/detail')
      .get('#INEFFICIENT_POISON_COMBOS')
      .should('be.visible')
  })

  it('should warn about inefficient Brood Sages', () => {
    cy.visit('/deck/1n11f11n41n671n71n141f61n161n331n451n701n55/detail')
      .get('#INEFFICIENT_BROOD_SAGES')
      .should('be.visible')
  })

  it('should warn about lack of AoE', () => {
    cy.visit('/deck/1n11n21n31n671n71n101n201i141n651n271i281n76/detail')
      .get('#LACK_OF_AOE')
      .should('be.visible')
  })
  ;[
    ['Beasts of Terror', '1n11n21n31n671n71n101n181n201i141n651n271i28'],
    ['Victors of the Melee', '1n11n21n31n671n71n101n201i141n651n271i281n47'],
    ['Hunter’s Vengeance', '1n11n21n31n671n71n101n231n201i141n651n271i28'],
    ['Bladestorm', '1n11n21n31n671n71n101n201i141n651n271n291i28'],
    ['Needle Blast', '1n11n21n31n671n71n101n201i141n651n271i281n44'],
    ['Powder Tower', '1n11n21n31n671n71n101n201i141n651n271i281n45'],
    ['Joust Champions', '1n11n21n31n671n71n101n201i141n651n271i281n55'],
    ['Crazy Bombers', '1n11n21n31n671n71n101n201i141n651n271i281n57'],
    ['Siren of the Seas', '1n11n21n31n671n71n101n201i141n651n271i281n58'],
    ['Trekking Aldermen', '1n11n21n31n671n71n101n731n201i141n651n271i28'],
    ['Broken Earth Drake', '1n11n21n31n41n621n151w71n241w81w161n381w15'],
    ['Flaming Stream', '1n11n21n31n671n71n101n201i141n651n271i181i28'],
    ['Windmakers', '1n11n21n31n671n71n101n201i141n651n271i201i28'],
    ['Toxic Sacrifice', '1n21f41f31n31n661f271n591n211n751n641f161n76'],
    ['Crimson Sentry', '1n21f31n31n661f51f271n591n211n751n641f161n76'],
    ['Witches of the Wild', '1n21f31n31n661f271n591n211n751n641f141f161n76'],
    ['Dark Harvest', '1n631n141s251n191n91s121n241n261s151s191n461n48'],
  ].forEach(([card, id]) => {
    it(`should consider ${card} as AoE`, () => {
      cy.visit(`/deck/${id}/detail`)
        .get('#LACK_OF_AOE')
        .should('not.be.visible')
    })
  })
})
