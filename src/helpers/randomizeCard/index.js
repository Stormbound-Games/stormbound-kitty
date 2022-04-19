import { FACTIONS, RACES, TYPES, RARITIES } from '~/constants/game'
import arrayRandom from '~/helpers/arrayRandom'

//##############
//# To-Do List #
//##############

// Add more effects
// Add effects that target structures
// Make Satyr self-base destruction less prevalent
// Add Dragons, Pirates, Felines, and plain Elders/Ancients
// Add better filters - maybe even filter for effect classes?
// Add effect classes for different types of effects
// Add randomly generated names - maybe combo off of effect classes
// Fix inconsistencies:
// -- Affecting bordering/surrounding units with no bordering/surrounding units
// -- Spawning units behind when played bordering the base
// -- Tweak Convert targeting/conditions a bit - add a new category for Convert targets, and increase the number of conditions
// -- Fix unspend mana calculations

//################################
//# Settings to mess around with #
//################################

// Turns on verbose logging, displaying how each card is calculated.
var verbose = false 

// Removes the caps on minimum mana, maximum mana, and effect cost. Can make some funy units.
var uncapped = false 

// These parameters can be used to limit the types of cards generated.
// maxEffCost can be used to tweak the maximum power of the effect.v
// Higher values tend towards smaller units with more potent effects.
// Be sensible with the faction and tribe requirments. Don't put in anything impossible.
var minMana = 1
var maxMana = 9
var maxEffCost = 4.5
var faction = ""
var tribe = ""
var cardsToGenerate = 1

//#####################
//# Class definitions #
//#####################

class Tribe {
  constructor(name,faction,movRange) {
    this.name = name
    this.faction = faction
    this.movRange = movRange
    this.effects = []
  }
  addEffect(effect) {
    this.effects.push(effect)
  }
}

class Effect {
  constructor(desc,valid,cost) {
    this.desc = desc
    this.valid = valid
    this.cost = cost
  }
}

class Slot {
  constructor(type,part1,part2,cost) {
    this.type = type
    this.part1 = part1
    this.part2 = part2
    this.cost = cost
  }
}
 
function eff(tribeName, effect) {
  tribes.forEach((tribe) => {
    if(tribe.name == tribeName) {
      tribe.addEffect(effect)
    }
  })
}

function rchoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randint(min,max) {
  return Math.floor(Math.random() * ((max-min)+1))+min
}

tribe = tribe.toLowerCase()

//############################
//# Values for the generator #
//############################

var tribes = [
  new Tribe("knight","Netural",[0,1,2]),
  //Tribe("pirate","Netural",[0,1,2]),
  //Tribe("feline","Netural",[0,1,2]),
  // Pirates, Felines, and Dragons aren't quite implemented yet.
  new Tribe("raven","Shadowfen",[0,1]),
  new Tribe("toad","Shadowfen",[1,2]),
  new Tribe("rodent","Ironclad",[0,1,2,3]),
  new Tribe("construct","Ironclad",[1]),
  new Tribe("frostling","Winter",[0,1]),
  new Tribe("dwarf","Winter",[1,2,3]),
  new Tribe("satyr","Swarm",[0,1,2]),
  new Tribe("undead","Swarm",[1,2,3]),
]

eff("knight",new Effect('spawn a Knight with {value} strength {space}',[3,0,1,1,1],1))
eff("knight",new Effect('deal {value} damage to {target} enemy {target2}',[1,0,3,1,1],0.75))

eff('pirate',new Effect('gain {value} strength{forEach}',[3,3,3,3,3],0.75))
eff('pirate',new Effect('draw a card',[3,0,0,0,0],0.75))
eff('pirate',new Effect('discard a random non-Pirate card',[3,3,3,3,3],-0.25))

eff('feline',new Effect('gain {value} speed{forEach}',[3,0,0,0,0],1.25))
eff('feline',new Effect('confuse itself',[3,0,0,3,0],-0.75))
eff('feline',new Effect('confuse {target} friendly {target2}',[3,3,3,3,3],-0.75))
eff('feline',new Effect('confuse {target} enemy {target2}',[3,3,3,3,3],0.75))
eff('feline',new Effect('force {target} enemy {target2} to attack a random bordering enemy',[3,3,3,3,3],1))

eff('raven',new Effect('convert {target} enemy {target2} {condition}',[3,1,1,1,1],2))
eff('raven',new Effect('destroy {target} enemy {target2} {condition}',[1,1,3,1,1],1.5))
eff('raven',new Effect('drain {value} strength from {target} {target2}{forEach}',[1,0,3,1,1],1.25))

eff('toad',new Effect('poison itself',[3,0,0,0,0],-0.75))
eff('toad',new Effect('poison {target} friendly {target2}',[3,1,1,1,1],-0.5))
eff('toad',new Effect('poison {target} enemy {target2}',[3,3,3,3,3],0.75))
eff('toad',new Effect('poison {target} enemy {target2} and deal {value} damage to it{forEach}',[3,3,3,3,3],1))
eff('toad',new Effect('spawn a Toad with {value} strength{value2} {space}',[3,3,1,1,1],1))
eff('toad',new Effect('drain {value} strength from {target} enemy {target2}{forEach}',[1,0,1,1,1],0.5))

eff('rodent',new Effect('push {targetPush}',[3,3,3,3,3],0.5))
eff('rodent',new Effect('pull {targetPull}',[3,0,3,3,3],0.5))
eff('rodent',new Effect('push {targetPush} and deal {value} damage to it{forEach}',[3,3,3,3,3],0.75))
eff('rodent',new Effect('pull {targetPull} and deal {value} damage to it{forEach}',[3,0,3,3,3],0.75))
eff('rodent',new Effect('deal {value} damage to {target} enemy {target2}{forEach}',[3,3,3,3,3],0.75))
eff('rodent',new Effect('deal {valueHigh} damage to {target} enemy {target2}',[3,3,3,3,3],0.75))
eff('rodent',new Effect('deal {valueHigh} damage spread randomly among {targetSpread}',[3,3,3,3,3],0.75))

eff('construct',new Effect('give {value} strength to {target} friendly {target2}{forEach}',[3,3,3,3,3],1))
eff('construct',new Effect('give {value} strength to {target} friendly {target2} and itself{forEach}',[3,0,3,3,3],1.5))
eff('construct',new Effect('vitalize {target} friendly {target2}',[1,1,1,1,1],0.5))
eff('construct',new Effect('vitalize {target} friendly {target2} and itself',[3,0,0,0,0],1))
eff('construct',new Effect('spawn a Construct with {value} strength {space}',[0,3,3,3,3],1))

eff('frostling',new Effect('freeze itself',[1,0,0,1,0],-0.75))
eff('frostling',new Effect('freeze {target} friendly {target2}',[1,1,1,1,1],-0.75))
eff('frostling',new Effect('freeze {target} enemy {target2}',[3,3,3,3,3],1))
eff('frostling',new Effect('freeze {target} enemy {target2} and deal {value} damage to it{forEach}',[3,3,3,3,3],1))
eff('frostling',new Effect('deal {value} damage to {target} enemy {target2}{forEach}',[3,3,3,3,3],0.75))
eff('frostling',new Effect('gain {value} mana{forEach}',[3,0,3,0,3],1))

eff('dwarf',new Effect('gain {value} strength{forEach}',[0,0,3,3,3],0.75))
eff('dwarf',new Effect('give {value} strength to {target} friendly {target2}{forEach}',[3,3,3,3,3],0.75))
eff('dwarf',new Effect('lose {value} strength{forEach}',[0,0,3,3,3],-0.5))

eff('undead',new Effect('spawn an Undead with {value} strength {space}',[3,3,3,3,3],1))
eff('undead',new Effect('deal {value} damage to the enemy base',[3,3,3,3,3],1))
eff('undead',new Effect('command {target} friendly {target2} forward',[3,3,3,3,3],1))
eff('undead',new Effect('give {value} strength to {target} friendly {target2}{forEach} and command it forward',[3,3,3,3,3],1))

eff('satyr',new Effect('spawn a Satyr with {value} strength {space}',[3,0,3,3,3],1))
eff('satyr',new Effect('give {value} strength to {target} friendly {target2}{forEach}',[3,3,3,3,3],0.75))
eff('satyr',new Effect('vitalize {target} friendly {target2}',[3,3,3,3,3],0.75))
eff('satyr',new Effect('deal {value} damage to your base',[3,3,3,3,3],-1))

var slots = [
  new Slot('target','a random bordering','unit',1),
  new Slot('target','a random surrounding','unit',1.25),
  new Slot('target','bordering','units',1.5),
  new Slot('target','surrounding','units',1.75),
  new Slot('target','','units',2),
  new Slot('target','a random','unit',1.25),
  new Slot('target','','units bordering your base',1.25),
  new Slot('target','','units bordering the enemy base',1.25),
 
  new Slot('space','on a random bordering tile','',1),
  new Slot('space','on a random surrounding tile','',1),
  new Slot('space','bordering your base','',0.5),
  new Slot('space','bordering the enemy base','',1.5),
  new Slot('space','on a random tile','',1),
  new Slot('space','on the tile behind','',0.75),
  new Slot('space','on the tile in front','',0.75),
  new Slot('space','on a random tile on your frontline','',1.25),
  new Slot('space','in front of a random enemy unit','',1),
  new Slot('space','on bordering tiles','',2),
  new Slot('space','on spaces bordering your base','',2),
  new Slot('space','on 2 random tiles','',1.75),
  new Slot('space','behind {target} friendly {target2}','',0.75),
  new Slot('space','in front of {target} enemy {target2}','',0.75),
  new Slot('space','on both sides','',1.5),
  new Slot('space','on tiles behind','',1.75),
  
  new Slot('value','1','',1),
  new Slot('value','2','',2),
  new Slot('value','3','',3),
  new Slot('value','4','',4),
  new Slot('value','5','',5),

  new Slot('forEach','','',1),
  new Slot('forEach','','',1),
  new Slot('forEach','','',1),
  new Slot('forEach','','',1),
  new Slot('forEach','','',1),
  new Slot('forEach',' for each enemy unit','',1.75),
  new Slot('forEach',' for each other friendly unit','',1.5),

  new Slot('condPlay','When played bordering your base','',0.5),
  new Slot('condPlay','When played bordering a friendly unit','',0.75),
  new Slot('condPlay','When played bordering an enemy unit','',0.75),
  new Slot('condPlay','When played with no surrounding units','',0.5),

  new Slot('condAttack','After attacking','',0.75),
  new Slot('condAttack','Before attacking a unit bordering another friendly unit','',0.5),
  
  new Slot('template','value','value',1),
]

var slotsShadowfen = [
  new Slot('target','a random poisoned','unit',0.5),
  new Slot('target','poisoned','units',1),
  new Slot('target','the weakest','unit',1),
  new Slot('target','the strongest','unit',1),
  new Slot('target','weaker','units',1.25),
  new Slot('target','stronger','units',1.75),

  new Slot('forEach',' for each bordering poisoned enemy unit','',1),
  new Slot('forEach',' for each surrounding poisoned enemy unit','',1),
  new Slot('forEach',' for each poisoned enemy unit','',1.25),

  new Slot('condition','with {value} or less strength','',1),
  new Slot('condition','weaker than this unit','',1),
  new Slot('condition','with the lowest strength among all units','',1),
  new Slot('condition','not bordering another enemy unit','',1),

  new Slot('condPlay','When played bordering a poisoned unit','',0.5),
  new Slot('condPlay','When played bordering a unit with {value} or less strength','',0.75),

  new Slot('condAttack','Before attacking a stronger unit','',0.5),
  new Slot('condAttack','Before attacking a weaker unit','',0.5),
  new Slot('condAttack','Before attacking a poisoned unit','',0.5),
  new Slot('condAttack','Before attacking a unit with no bordering enemy units','',0.5),
]

var slotsIronclad = [
  new Slot('target','the closest','unit in front',1),
  new Slot('target','the closest','unit behind',1),
  new Slot('target','all','units in front',1.5),

  new Slot('targetPush','a random bordering enemy unit away','',1),
  new Slot('targetPush','bordering enemy units away','',1.25),
  new Slot('targetPush','the unit in front away','',1),

  new Slot('targetPull','enemy units towards itself','',1),
  new Slot('targetPull','the first unit from behind towards itself','',1),

  new Slot('targetSpread','bordering enemy units','',0.75),
  new Slot('targetSpread','surrounding enemy units','',1),
  new Slot('targetSpread','enemy units','',1.25),
  new Slot('targetSpread','enemy units in front','',0.75),

  new Slot('valueHigh','6','',5),
  new Slot('valueHigh','7','',6),
  new Slot('valueHigh','8','',6),
  new Slot('valueHigh','9','',7),

  new Slot('condPlay','When played bordering a friendly Construct','',0.5),
]

var slotsWinter = [
  new Slot('target','a random frozen','unit',0.5),
  new Slot('target','frozen','units',1),

  new Slot('forEach',' for each bordering frozen enemy unit','',1),
  new Slot('forEach',' for each surrounding frozen enemy unit','',1),
  new Slot('forEach',' for each frozen enemy unit','',1.25),
  new Slot('forEach',' for each stronger friendly unit','',1.25),
  new Slot('forEach',' for each weaker friendly unit','',1.25),
  new Slot('forEach',' for each bordering friendly unit','',1),
  new Slot('forEach',' for each surrounding friendly unit','',1),
  new Slot('forEach',' for each enemy unit bordering your base','',0.5),
  new Slot('forEach',' for every {value} unspent mana','',0.1),

  new Slot('condPlay','When played bordering a stronger friendly unit','',0.5),
  new Slot('condPlay','When played bordering a weaker friendly unit','',0.5),
  new Slot('condPlay','When played bordering a frozen unit','',0.5),

  new Slot('condAttack','Before attacking a frozen unit','',0.5),
  new Slot('condAttack','Before attacking a unit bordering any base','',0.5),
]

var slotsSwarm = [
  new Slot('forEach',' for each bordering friendly Saytr','',1),
  new Slot('forEach',' for each surrounding friendly Saytr','',1),
  new Slot('forEach',' for each friendly Saytr','',1.25),
  
  new Slot('condPlay','When played with 2 or more bordering friendly Satyrs','',0.25),

  new Slot('condAttack','Before attacking the enemy base','',0.5),
]

var names = [ 
  ["knight",
   [
     "Gifted",
     "Bonded",
     "Fierce",
     "Terrific",
     "Warfront",
     "Heroic",
     "Victorious",
     "Veteran",
     "Regal",
     "Soverign",
     "Champion",
     "Trained",
     "Glorious",
     "Gallant"
   ],
   [
     "Recruits",
     "Slayers",
     "Runners",
     "Soliders",
     "Champions",
     "Guardians",
     "Couriers",
     "Combatants",
     "Templars",
     "Paladins",
     "Squires"
   ]
  ],
  ["raven",
    [
      "Dubious",
      "Faithless",
      "Hunting",
      "Wetland",
      "Entwined",
      "Wild",
      "Feral",
      "Avian",
      "Blood",
      "Untamed",
      "Feathered",
      "Flocking",
      "Corvid",
      "Soulless",
      "Occult",
      "Plumed"
    ],
    [
      "Hags",
      "Prophets",
      "Harpies",
      "Deceivers",
      "Witches",
      "Shamans",
      "Ministers",
      "Cultists",
      "Stalkers",
      "Augurs",
      "Conjurers",
      "Harbringers",
      "Omens"
    ]
  ],
  ["toad",
    [
      "Brood",
      "Copperskin",
      "Crimson",
      "Lime",
      "Azure",
      "Obsidian",
      "Plagued",
      "Hairy",
      "Salty",
      "Vermilion",
      "Viridian",
      "Scarlet",
      "Malachite",
      "Amber",
      "Rusthide"
    ],
    [
      "Sages",
      "Rangers",
      "Sentries",
      "Troopers",
      "Hatchers",
      "Butchers",
      "Chestnuts",
      "Tadpoles",
      "Polliwogs",
      "Sycophants",
      "Amphibians",
      "Leapers"
    ]
  ],
  ["frostling",
    [
      "Frosty",
      "Fel",
      "Orgone",
      "Wisp",
      "Blizzard",
      "Chilled",
      "Dawn",
      "Iced",
      "Calming"
    ],
    [
      "Hexers",
      "Flakes",
      "Flares",
      "Leechers",
      "Clouds",
      "Bombs",
      "Stonemanes",
      "Sparks",
      "Droplings",
      "Visions",
      "Spirits",
      "Channelers"
    ]
  ]
]

var statlines = [
  [2,4,5,7,8,10,11,13], // 0 Speed
  [1,2,3,5,6,8,9,11],   // 1 Speed
  [0,1,2,3,4,5,6,7],    // 2 Speed
  [0,0,1,2,3,4,5,6]     // 3 Speed
]

//###########################
//# Code to generate a card #
//###########################

class Card {
  constructor() {
    this.mana = 0
    this.effCost = 0
    this.effCostMult = 0
    this.str = 0
    this.mov = 0
    this.tribe = ""
    this.subtribe = ""
    this.faction = ""
    this.effect = ""
    this.rarity = ""
    this.firstName = "Random"
    this.lastName = "unit"
  }

  generate() {
    while(true) {
      this.effect = ""
      this.effCostMult = 0
      this.effCost = 0
      this.subtribe = ""
      
      this.getTribe()
      this.getEffect()
      this.getStatline()
      if(uncapped) {
        maxEffCost = 999
        minMana = -999
        maxMana = 999
      }
      var sum = this.mana + this.effCost
      var reroll = false
      if (sum < minMana) {reroll = true}
      if (sum > maxMana) {reroll = true} 
      if (this.effCost > maxEffCost) {reroll = true}
      if (sum > 6) {
        if (this.effCost < 2) {reroll = true}
      }
      if ((this.trigger == 1) && (this.effect.includes('stronger') || this.effect.includes('weaker'))) {reroll = true}
      if (reroll==false) {break}
      if (verbose) {print("Rerolling effect\n")}
    }
    this.getName()
  }

  getTribe() {
    this.tribe = rchoice(tribes)
    this.faction = this.tribe.faction
    if (faction != "" && this.faction != faction) {this.getTribe()} 
    if (tribe != "" && this.tribe.name != tribe) {this.getTribe()}
  }

  getStatline() {
    while(true) {
      this.mana = randint(2,9)
      this.mov = rchoice(this.tribe.movRange)
      this.str = statlines[this.mov][this.mana-2]
      if (verbose) {print(`Base statline: ${this.mana}`)}
      var strCutoff = 0
      if (this.subtribe == "elder") {strCutoff = 3}
      if (this.str > strCutoff) {break}
      if (verbose) {print("Rerolling statline")}
    }
  }

  getEffect() {
    while (true) {
      this.trigger = rchoice([0,1,2,3,4])
      this.subtribe = ""
      // 0: On play
      // 1: On death
      // 2: Before attacking
      // 3: After surviving damage
      // 4: Before moving
      this.effCostMult = [0.75,0.75,1,1.5,1.75][this.trigger]
      this.effect = ["On play","On death","Before attacking","After surviving damage","Before moving"][this.trigger]
      if (this.mov == 0 && this.trigger > 1) {this.effCostMult -= 0.5}
      this.effect += ", "
      if (this.trigger == 3) {this.subtribe = "elder"}
      if (this.trigger == 4) {this.subtribe = "ancient"}

      var effectText = rchoice(this.tribe.effects)
      if (randint(1,3) <= effectText.valid[this.trigger]) {break}
    }
      
    this.effect += effectText.desc
    this.effCost = effectText.cost
    if (verbose) {print(`Base effect cost: ${this.effCost}`)}
    this.effCost *= this.effCostMult
    if (verbose) {print(`Adding trigger multiplier of ${this.effCostMult}. New cost: ${this.effCost}`)}

    // Conditional triggers:
    if ((this.effect.includes("On play")) && randint(1,3) == 1) {
      this.effect = this.effect.replace("On play","{condPlay}")
    }
    if ((this.effect.includes("Before attacking")) && randint(1,3) == 1) {
      this.effect = this.effect.replace("Before attacking","{condAttack}")
    }
    
    this.fillSlots()
    
    // Unique cases:
    if ((this.effect.includes(" it")) && (this.effect.includes("units")) && !(this.effect.includes("itself"))) {
      this.effect = this.effect.replaceAll(" it"," them")
    }
    if (this.effect.includes("poison ") && this.effect.includes("poisoned")) {
      this.effect = this.effect.replaceAll(" poisoned "," ")
    }
    if (this.effect.includes("freeze ") && this.effect.includes("frozen")) {
      this.effect = this.effect.replaceAll(" frozen "," ")
    }
    if ((this.tribe.name == "construct") && (this.effect.includes("unit")) && (randint(1,2) == 1)) {
      this.effect = this.effect.replaceAll("unit","Construct")
      this.effCost *= 0.5
      if (verbose) print(`Adding Construct-only multiplier of 0.5. New cost: ${this.effCost}`)
    }
    if ((this.tribe.name == "satyr") && (this.effect.includes("unit")) && (randint(1,3) != 1)) {
      this.effect = this.effect.replaceAll("unit","Satyr")
      this.effCost *= 0.5
      if (verbose) print(`Adding Satyr-only multiplier of 0.5. New cost: ${this.effCost}`)
    }
    
    this.rarity = "Epic"
    if (this.effCost%1 < 0.66) {
      this.rarity = "Rare"
    }
    if (this.effCost%1 < 0.33) {
      this.rarity = "Common"
    }
  }

  fillSlots() {
    while(true) {
      var foundState = 0
      var target = ""
      var char = ""
      for (let i=0; i<this.effect.length; i++) {
        char = this.effect[i]
        if (char == '{') {
          foundState = 1
        }
        if (foundState == 1 && char != '{' && char != '}') {
          target += char
        }
        if (char == '}' && foundState == 1) {
          foundState = 2
          break
        }
      }
      
      if (foundState != 2) {return}

      var valid = []
      slots.forEach((slot) => {
        if (slot.type == target) {valid.push(slot)}
      })
        
      if (this.faction == "Shadowfen") {
        slotsShadowfen.forEach((slot) => {
          if (slot.type == target) {valid.push(slot)}
        })
      }
      if (this.faction == "Ironclad") {
        slotsIronclad.forEach((slot) => {
          if (slot.type == target) {valid.push(slot)}
        })
      }
      if (this.faction == "Winter") {
        slotsWinter.forEach((slot) => {
          if (slot.type == target) {valid.push(slot)}
        })
      }
      if (this.faction == "Swarm") {
        slotsSwarm.forEach((slot) => {
          if (slot.type == target) {valid.push(slot)}
        })
      }
      
      var targetSlot = rchoice(valid)
      
      this.effect = this.effect.replace("{"+target+"}",targetSlot.part1)
      this.effect = this.effect.replace("{"+target+"2}",targetSlot.part2)
      this.effCost *= targetSlot.cost
      if (verbose) {print(`Adding {target} multiplier of {targetSlot.cost}. New cost: {this.effCost}`)}
    }
  }

  getName() {
    names.forEach((nameList) => {
      if (nameList[0] == this.tribe.name) {
        this.firstName = rchoice(nameList[1])
        this.lastName = rchoice(nameList[2])
      }
    })
  }
  
  printCard() {
    this.effect = this.effect.replace("  "," ")
    console.log(`${this.firstName} ${this.lastName}`)
    console.log(`${this.mana+Math.floor(this.effCost)} mana - ${this.tribe.name} ${this.subtribe}`)
    console.log(`|  ${this.str} / ${this.mov}`)
    console.log("| " + this.effect)
    console.log(`${this.faction} - ${this.rarity}`)
    if (verbose) {console.log(`Actual cost: ${this.mana}+${this.effCost}`)}
  }
}

const randomizeCard = () => {
  card = new Card()
  card.generate()
  return {
    type: 'unit',
    race: card.tribe.name,
    rarity: card.rarity,
    faction: card.faction,
  }
}

export default randomizeCard
