import { Race, Effect, Slot } from './utils'

const KNIGHT = new Race('knight', 'neutral', [0, 1, 2])
const FELINE = new Race('feline', 'neutral', [0, 1, 2])
const PIRATE = new Race('pirate', 'neutral', [0, 1, 2])
const RAVEN = new Race('raven', 'shadowfen', [0, 1])
const TOAD = new Race('toad', 'shadowfen', [1, 2])
const RODENT = new Race('rodent', 'ironclad', [0, 1, 2, 3])
const CONSTRUCT = new Race('construct', 'ironclad', [1])
const FROSTLING = new Race('frostling', 'winter', [0, 1])
const DWARF = new Race('dwarf', 'winter', [1, 2, 3])
const SATYR = new Race('satyr', 'swarm', [0, 1, 2])
const UNDEAD = new Race('undead', 'swarm', [1, 2, 3])

export const RACES = [
  KNIGHT,
  PIRATE,
  RAVEN,
  TOAD,
  RODENT,
  CONSTRUCT,
  FROSTLING,
  DWARF,
  SATYR,
  UNDEAD,
]

KNIGHT.addEffect(
  new Effect('spawn a Knight with {value} strength {space}', [3, 0, 1, 1, 1], 1)
)

KNIGHT.addEffect(
  new Effect(
    'deal {value} damage to {target} enemy {target2}{forEach}',
    [1, 0, 3, 1, 1],
    0.75
  )
)

PIRATE.addEffect(
  new Effect('gain {value} strength{pirateForEach}', [3, 0, 3, 3, 3], 0.75)
)

PIRATE.addEffect(
  new Effect(
    'replace a random non-pirate card from your hand',
    [3, 3, 3, 3, 3],
    0.5
  )
)

PIRATE.addEffect(
  new Effect(
    'replace all cards that cost {value} or less from your hand',
    [3, 3, 3, 3, 3],
    0.25
  )
)

PIRATE.addEffect(
  new Effect(
    'replace a random non-pirate card from your hand. Reduce the cost of the drawn card by {lowValue}{pirateForEach}',
    [3, 3, 3, 3, 3],
    1
  )
)

PIRATE.addEffect(
  new Effect(
    'discard your hand and gain {lowValue} strength for each card discarded',
    [3, 0, 3, 3, 3],
    1.25
  )
)

PIRATE.addEffect(
  new Effect('discard a random non-Pirate card', [3, 3, 3, 3, 3], 0.25)
)

PIRATE.addEffect(
  new Effect(
    'decrease the cost of a random card in your hand by {lowValue}{pirateForEach}',
    [3, 3, 3, 3, 3],
    0.75
  )
)

PIRATE.addEffect(
  new Effect(
    'deal {value} damage to {target} enemy {target2}{pirateForEach}',
    [3, 0, 3, 3, 3],
    0.75
  )
)

FELINE.addEffect(
  new Effect('gain {value} speed{forEach}', [3, 0, 0, 0, 0], 1.25)
)

FELINE.addEffect(new Effect('confuse itself', [3, 0, 0, 3, 0], -0.75))

FELINE.addEffect(
  new Effect('confuse {target} friendly {target2}', [3, 3, 3, 3, 3], -0.75)
)

FELINE.addEffect(
  new Effect('confuse {target} enemy {target2}', [3, 3, 3, 3, 3], 0.75)
)

FELINE.addEffect(
  new Effect(
    'force {target} enemy {target2} to attack a random bordering enemy',
    [3, 3, 3, 3, 3],
    1
  )
)

RAVEN.addEffect(
  new Effect('convert {target} enemy {target2} {condition}', [3, 1, 1, 1, 1], 2)
)

RAVEN.addEffect(
  new Effect(
    'destroy {target} enemy {target2} {condition}',
    [1, 1, 3, 1, 1],
    1.5
  )
)

RAVEN.addEffect(
  new Effect(
    'drain {value} strength from {target} {target2}{forEach}',
    [1, 0, 3, 1, 1],
    1.25
  )
)

TOAD.addEffect(new Effect('poison itself', [3, 0, 0, 0, 0], -0.75))

TOAD.addEffect(
  new Effect('poison {target} friendly {target2}', [3, 1, 1, 1, 1], -0.5)
)

TOAD.addEffect(
  new Effect('poison {target} enemy {target2}', [3, 3, 3, 3, 3], 0.75)
)

TOAD.addEffect(
  new Effect(
    'poison {target} enemy {target2} and deal {value} damage to it{forEach}',
    [3, 3, 3, 3, 3],
    1
  )
)

TOAD.addEffect(
  new Effect(
    'spawn a Toad with {value} strength{value2} {space}',
    [3, 3, 1, 1, 1],
    1
  )
)

TOAD.addEffect(
  new Effect(
    'drain {value} strength from {target} enemy {target2}{forEach}',
    [1, 0, 1, 1, 1],
    0.5
  )
)

RODENT.addEffect(new Effect('push {targetPush}', [3, 3, 3, 3, 3], 0.5))

RODENT.addEffect(new Effect('pull {targetPull}', [3, 0, 3, 3, 3], 0.5))

RODENT.addEffect(
  new Effect(
    'push {targetPush} and deal {value} damage to it{forEach}',
    [3, 3, 3, 3, 3],
    0.75
  )
)

RODENT.addEffect(
  new Effect(
    'pull {targetPull} and deal {value} damage to it{forEach}',
    [3, 0, 3, 3, 3],
    0.75
  )
)

RODENT.addEffect(
  new Effect(
    'deal {value} damage to {target} enemy {target2}{forEach}',
    [3, 3, 3, 3, 3],
    0.75
  )
)

RODENT.addEffect(
  new Effect(
    'deal {valueHigh} damage to {target} enemy {target2}',
    [3, 3, 3, 3, 3],
    0.75
  )
)

RODENT.addEffect(
  new Effect(
    'deal {valueHigh} damage spread randomly among {targetSpread}',
    [3, 3, 3, 3, 3],
    0.75
  )
)

CONSTRUCT.addEffect(
  new Effect(
    'give {value} strength to {target} friendly {target2}{forEach}',
    [3, 3, 3, 3, 3],
    1
  )
)

CONSTRUCT.addEffect(
  new Effect(
    'give {value} strength to {target} friendly {target2} and itself{forEach}',
    [3, 0, 3, 3, 3],
    1.5
  )
)

CONSTRUCT.addEffect(
  new Effect('vitalize {target} friendly {target2}', [1, 1, 1, 1, 1], 0.5)
)

CONSTRUCT.addEffect(
  new Effect(
    'vitalize {target} friendly {target2} and itself',
    [3, 0, 0, 0, 0],
    1
  )
)

CONSTRUCT.addEffect(
  new Effect(
    'spawn a Construct with {value} strength {space}',
    [0, 3, 3, 3, 3],
    1
  )
)

FROSTLING.addEffect(new Effect('freeze itself', [1, 0, 0, 1, 0], -0.75))

FROSTLING.addEffect(
  new Effect('freeze {target} friendly {target2}', [1, 1, 1, 1, 1], -0.75)
)

FROSTLING.addEffect(
  new Effect('freeze {target} enemy {target2}', [3, 3, 3, 3, 3], 1)
)

FROSTLING.addEffect(
  new Effect(
    'freeze {target} enemy {target2} and deal {value} damage to it{forEach}',
    [3, 3, 3, 3, 3],
    1
  )
)

FROSTLING.addEffect(
  new Effect(
    'deal {value} damage to {target} enemy {target2}{forEach}',
    [3, 3, 3, 3, 3],
    0.75
  )
)

FROSTLING.addEffect(
  new Effect('gain {value} mana{forEach}', [3, 0, 3, 0, 3], 1)
)

DWARF.addEffect(
  new Effect('gain {value} strength{forEach}', [0, 0, 3, 3, 3], 0.75)
)

DWARF.addEffect(
  new Effect(
    'give {value} strength to {target} friendly {target2}{forEach}',
    [3, 3, 3, 3, 3],
    0.75
  )
)

DWARF.addEffect(
  new Effect('lose {value} strength{forEach}', [0, 0, 3, 3, 3], -0.5)
)

UNDEAD.addEffect(
  new Effect(
    'spawn an Undead with {value} strength {space}',
    [3, 3, 3, 3, 3],
    1
  )
)

UNDEAD.addEffect(
  new Effect('deal {value} damage to the enemy base', [3, 3, 3, 3, 3], 1)
)

UNDEAD.addEffect(
  new Effect('command {target} friendly {target2} forward', [3, 3, 3, 3, 3], 1)
)

UNDEAD.addEffect(
  new Effect(
    'give {value} strength to {target} friendly {target2}{forEach} and command it forward',
    [3, 3, 3, 3, 3],
    1
  )
)

SATYR.addEffect(
  new Effect('spawn a Satyr with {value} strength {space}', [3, 0, 3, 3, 3], 1)
)

SATYR.addEffect(
  new Effect(
    'give {value} strength to {target} friendly {target2}{forEach}',
    [3, 3, 3, 3, 3],
    0.75
  )
)

SATYR.addEffect(
  new Effect('vitalize {target} friendly {target2}', [3, 3, 3, 3, 3], 0.75)
)

SATYR.addEffect(
  new Effect('deal {value} damage to your base', [3, 3, 3, 3, 3], -1)
)

export const BASE_SLOTS = [
  new Slot('target', 'a random bordering', 'unit', 1),
  new Slot('target', 'a random surrounding', 'unit', 1.25),
  new Slot('target', 'bordering', 'units', 1.5),
  new Slot('target', 'surrounding', 'units', 1.75),
  new Slot('target', '', 'units', 2),
  new Slot('target', 'a random', 'unit', 1.25),
  new Slot('target', '', 'units bordering your base', 1.25),
  new Slot('target', '', 'units bordering the enemy base', 1.25),

  new Slot('space', 'on a random bordering tile', '', 1),
  new Slot('space', 'on a random surrounding tile', '', 1),
  new Slot('space', 'bordering your base', '', 0.5),
  new Slot('space', 'bordering the enemy base', '', 1.5),
  new Slot('space', 'on a random tile', '', 1),
  new Slot('space', 'on the tile behind', '', 0.75),
  new Slot('space', 'on the tile in front', '', 0.75),
  new Slot('space', 'on a random tile on your frontline', '', 1.25),
  new Slot('space', 'in front of a random enemy unit', '', 1),
  new Slot('space', 'on bordering tiles', '', 2),
  new Slot('space', 'on spaces bordering your base', '', 2),
  new Slot('space', 'on 2 random tiles', '', 1.75),
  new Slot('space', 'behind {target} friendly {target2}', '', 0.75),
  new Slot('space', 'in front of {target} enemy {target2}', '', 0.75),
  new Slot('space', 'on both sides', '', 1.5),
  new Slot('space', 'on tiles behind', '', 1.75),

  new Slot('value', '1', '', 1),
  new Slot('value', '2', '', 2),
  new Slot('value', '3', '', 3),
  new Slot('value', '4', '', 4),
  new Slot('value', '5', '', 5),

  new Slot('lowValue', '1', '', 1),
  new Slot('lowValue', '2', '', 2),

  new Slot('forEach', '', '', 1),
  new Slot('forEach', '', '', 1),
  new Slot('forEach', '', '', 1),
  new Slot('forEach', '', '', 1),
  new Slot('forEach', '', '', 1),
  new Slot('forEach', ' for each enemy unit', '', 1.75),
  new Slot('forEach', ' for each other friendly unit', '', 1.5),

  new Slot('condPlay', 'When played bordering your base', '', 0.5),
  new Slot('condPlay', 'When played bordering a friendly unit', '', 0.75),
  new Slot('condPlay', 'When played bordering an enemy unit', '', 0.75),
  new Slot('condPlay', 'When played with no surrounding units', '', 0.5),

  new Slot('condAttack', 'After attacking', '', 0.75),
  new Slot(
    'condAttack',
    'Before attacking a unit bordering another friendly unit',
    '',
    0.5
  ),

  new Slot('template', 'value', 'value', 1),

  new Slot('pirateForEach', ' for each Pirate in your hand', '', 1.5),
  new Slot(
    'pirateForEach',
    ' for each card in your hand that costs more than this card',
    '',
    1.75
  ),
  new Slot(
    'pirateForEach',
    ' for each card in your hand that costs less than this card',
    '',
    1.75
  ),
  new Slot('pirateForEach', ' for each friendly Pirate', '', 1.25),

  new Slot(
    'pirateCondPlay',
    'When played as the last card in your hand',
    '',
    0.25
  ),
  new Slot('pirateCondPlay', 'When played with a full hand', '', 0.75),
  new Slot(
    'pirateCondPlay',
    'When played with another Pirate in your hand',
    '',
    0.5
  ),
]

export const SHADOWFEN_SLOTS = [
  new Slot('target', 'a random poisoned', 'unit', 0.5),
  new Slot('target', 'poisoned', 'units', 1),
  new Slot('target', 'the weakest', 'unit', 1),
  new Slot('target', 'the strongest', 'unit', 1),
  new Slot('target', 'weaker', 'units', 1.25),
  new Slot('target', 'stronger', 'units', 1.75),

  new Slot('forEach', ' for each bordering poisoned enemy unit', '', 1),
  new Slot('forEach', ' for each surrounding poisoned enemy unit', '', 1),
  new Slot('forEach', ' for each poisoned enemy unit', '', 1.25),

  new Slot('condition', 'with {value} or less strength', '', 1),
  new Slot('condition', 'weaker than this unit', '', 1),
  new Slot('condition', 'with the lowest strength among all units', '', 1),
  new Slot('condition', 'not bordering another enemy unit', '', 1),

  new Slot('condPlay', 'When played bordering a poisoned unit', '', 0.5),
  new Slot(
    'condPlay',
    'When played bordering a unit with {value} or less strength',
    '',
    0.75
  ),

  new Slot('condAttack', 'Before attacking a stronger unit', '', 0.5),
  new Slot('condAttack', 'Before attacking a weaker unit', '', 0.5),
  new Slot('condAttack', 'Before attacking a poisoned unit', '', 0.5),
  new Slot(
    'condAttack',
    'Before attacking a unit with no bordering enemy units',
    '',
    0.5
  ),
]

export const IRONCLAD_SLOTS = [
  new Slot('target', 'the closest', 'unit in front', 1),
  new Slot('target', 'the closest', 'unit behind', 1),
  new Slot('target', 'all', 'units in front', 1.5),

  new Slot('targetPush', 'a random bordering enemy unit away', '', 1),
  new Slot('targetPush', 'bordering enemy units away', '', 1.25),
  new Slot('targetPush', 'the unit in front away', '', 1),

  new Slot('targetPull', 'enemy units towards itself', '', 1),
  new Slot('targetPull', 'the first unit from behind towards itself', '', 1),

  new Slot('targetSpread', 'bordering enemy units', '', 0.75),
  new Slot('targetSpread', 'surrounding enemy units', '', 1),
  new Slot('targetSpread', 'enemy units', '', 1.25),
  new Slot('targetSpread', 'enemy units in front', '', 0.75),

  new Slot('valueHigh', '6', '', 5),
  new Slot('valueHigh', '7', '', 6),
  new Slot('valueHigh', '8', '', 6),
  new Slot('valueHigh', '9', '', 7),

  new Slot('condPlay', 'When played bordering a friendly Construct', '', 0.5),
]

export const WINTER_SLOTS = [
  new Slot('target', 'a random frozen', 'unit', 0.5),
  new Slot('target', 'frozen', 'units', 1),

  new Slot('forEach', ' for each bordering frozen enemy unit', '', 1),
  new Slot('forEach', ' for each surrounding frozen enemy unit', '', 1),
  new Slot('forEach', ' for each frozen enemy unit', '', 1.25),
  new Slot('forEach', ' for each stronger friendly unit', '', 1.25),
  new Slot('forEach', ' for each weaker friendly unit', '', 1.25),
  new Slot('forEach', ' for each bordering friendly unit', '', 1),
  new Slot('forEach', ' for each surrounding friendly unit', '', 1),
  new Slot('forEach', ' for each enemy unit bordering your base', '', 0.5),
  new Slot('forEach', ' for every {value} unspent mana', '', 0.1),

  new Slot(
    'condPlay',
    'When played bordering a stronger friendly unit',
    '',
    0.5
  ),
  new Slot('condPlay', 'When played bordering a weaker friendly unit', '', 0.5),
  new Slot('condPlay', 'When played bordering a frozen unit', '', 0.5),

  new Slot('condAttack', 'Before attacking a frozen unit', '', 0.5),
  new Slot('condAttack', 'Before attacking a unit bordering any base', '', 0.5),
]

export const SWARM_SLOTS = [
  new Slot('forEach', ' for each bordering friendly Saytr', '', 1),
  new Slot('forEach', ' for each surrounding friendly Saytr', '', 1),
  new Slot('forEach', ' for each friendly Saytr', '', 1.25),

  new Slot(
    'condPlay',
    'When played with 2 or more bordering friendly Satyrs',
    '',
    0.25
  ),

  new Slot('condAttack', 'Before attacking the enemy base', '', 0.5),
]

export const FACTION_SLOTS = {
  ironclad: IRONCLAD_SLOTS,
  shadowfen: SHADOWFEN_SLOTS,
  swarm: SWARM_SLOTS,
  winter: WINTER_SLOTS,
}

// prettier-ignore
export const NAMES = {
  knight: [
    ['Gifted', 'Bonded', 'Fierce', 'Terrific', 'Warfront', 'Heroic', 'Victorious', 'Veteran', 'Regal', 'Soverign', 'Champion', 'Trained', 'Glorious', 'Gallant'],
    ['Recruits', 'Slayers', 'Runners', 'Soliders', 'Champions', 'Guardians', 'Couriers', 'Combatants', 'Templars', 'Paladins', 'Squires'],
  ],
  raven: [
    ['Dubious', 'Faithless', 'Hunting', 'Wetland', 'Entwined', 'Wild', 'Feral', 'Avian', 'Blood', 'Untamed', 'Feathered', 'Flocking', 'Corvid', 'Soulless', 'Occult', 'Plumed'],
    ['Hags', 'Prophets', 'Harpies', 'Deceivers', 'Witches', 'Shamans', 'Ministers', 'Cultists', 'Stalkers', 'Augurs', 'Conjurers', 'Harbringers', 'Omens'],
  ],
  toad: [
    ['Brood', 'Copperskin', 'Crimson', 'Lime', 'Azure', 'Obsidian', 'Plagued', 'Hairy', 'Salty', 'Vermilion', 'Viridian', 'Scarlet', 'Malachite', 'Amber', 'Rusthide'],
    ['Sages', 'Rangers', 'Sentries', 'Troopers', 'Hatchers', 'Butchers', 'Chestnuts', 'Tadpoles', 'Polliwogs', 'Sycophants', 'Amphibians', 'Leapers'],
  ],
  frostling: [
    ['Frosty', 'Fel', 'Orgone', 'Wisp', 'Blizzard', 'Chilled', 'Dawn', 'Iced', 'Calming'],
    ['Hexers', 'Flakes', 'Flares', 'Leechers', 'Clouds', 'Bombs', 'Stonemanes', 'Sparks', 'Droplings', 'Visions', 'Spirits', 'Channelers'],
  ],
  dwarf: [
    ['Myst', 'Snow', 'Rock', 'Hearth', 'Wolf', 'Earth', 'Sleet', 'Chill', 'Hail', 'Frost', 'Ore', 'Shale', 'Stone'],
    ['wives', 'masons', 'workers', 'guards', 'cloaks', 'fathers', 'menders', 'stompers', 'beards', 'smiths', 'forgers', 'singers'],
  ],
  rodent: [
    ['Ozone', 'Sound', 'Absorbing', 'Windy', 'Chaotic', 'Armed', 'Booming', 'Mechanical', 'Crazy'],
    ['Lackeys', 'Purifiers', 'Drivers', 'Varmints', 'Minions', 'Launchers', 'Chargers', 'Agents', 'Pupils', 'Schemers', 'Professors', 'Officers', 'Workers', 'Bombers'],
  ],
  construct: [
    ['Function', 'Linked', 'Finite', 'Scrapped', 'Debug', 'Projected', 'Plated', 'Oxidized', 'Sleek', 'Automated', 'Hardwired', 'Boolean', 'Software', 'Motorized', 'Analog', 'Zinc'],
    ['Prototypes', 'Golems', 'Loopers', 'Servers', 'Planners', 'Loggers', 'Automatons', 'Apparati', 'Engines', 'Androids', 'Chassis'],
  ],
  satyr: [
    ['Lawless', 'Restless', 'Mindless', 'Pan', 'Wasteland', 'Desolate', 'Arid', 'Collective', 'Horned'],
    ['Herd', 'Goats', 'Companions', 'Horde', 'Shepards', 'Heralds', 'Bucks', 'Fawns', 'Rams'],
  ],
  undead: [
    ['Forgotten', 'Shady', 'Mischevious', 'Petrified', 'Grim', 'Vindicative', 'Lasting', 'Feindish', 'Spectral', 'Graven', 'Accursed', 'Afflicted'],
    ['Regrets', 'Souls', 'Ghouls', 'Liches', 'Summoners', 'Fossils', 'Couriers', 'Harvesters', 'Martyrs', 'Remains', 'Misgivings', 'Laments'],
  ],
  pirate: [
    ['Northsea', 'Westwind', 'Cabin', 'Bluesail', 'Lucky', 'Seasick', 'Starboard', 'Nautical', 'Seafairing', 'Abyssal'],
    ['Dogs', 'Mutineers', 'Looters', 'Sailors', 'Privaters', 'Captains', 'Raiders', 'Swindlers', 'Charmers', 'Bouncers', 'Marines', 'Swabs', 'Navigators'],
  ],
}

export const STAT_LINES = [
  [2, 4, 5, 7, 8, 10, 11, 13], // 0 Speed
  [1, 2, 3, 5, 6, 8, 9, 11], // 1 Speed
  [0, 1, 2, 3, 4, 5, 6, 7], // 2 Speed
  [0, 0, 1, 2, 3, 4, 5, 6], // 3 Speed
]
