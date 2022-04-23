import { Race, Effect, Slot } from './utils'

const KNIGHT = new Race('knight', 'neutral', [0, 1, 2], 'T3')
const FELINE = new Race('feline', 'neutral', [0, 1, 2], 'T13')
const PIRATE = new Race('pirate', 'neutral', [0, 1, 2], 'T4')
const RAVEN = new Race('raven', 'shadowfen', [0, 1], 'T5')
const TOAD = new Race('toad', 'shadowfen', [1, 2], 'T8')
const RODENT = new Race('rodent', 'ironclad', [0, 1, 2, 3], 'T6')
const CONSTRUCT = new Race('construct', 'ironclad', [1], 'T1')
const FROSTLING = new Race('frostling', 'winter', [0, 1], 'T2')
const DWARF = new Race('dwarf', 'winter', [1, 2, 3], 'T10')
const SATYR = new Race('satyr', 'swarm', [0, 1, 2], 'T7')
const UNDEAD = new Race('undead', 'swarm', [1, 2, 3], 'T9')

const SPELL_NEUTRAL = new Race('spell_neutral', 'neutral', [0], 'N15')
const SPELL_SHADOWFEN = new Race('spell_shadowfen', 'shadowfen', [0], 'F11')
const SPELL_IRONCLAD = new Race('spell_ironclad', 'ironclad', [0], 'I11')
const SPELL_WINTER = new Race('spell_winter', 'winter', [0], 'W6')
const SPELL_SWARM = new Race('spell_swarm', 'swarm', [0], 'S20')

const STRUCTURE_NEUTRAL = new Race('structure_neutral', 'neutral', [0], 'N13')
const STRUCTURE_SHADOWFEN = new Race('structure_shadowfen', 'shadowfen', [0], 'F13')
const STRUCTURE_IRONCLAD = new Race('structure_ironclad', 'ironclad', [0], 'I14')
const STRUCTURE_WINTER = new Race('structure_winter', 'winter', [0], 'W9')
const STRUCTURE_SWARM = new Race('structure_swarm', 'swarm', [0], 'S7')

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

export const RACES_SPELLS = [
	SPELL_NEUTRAL,
	SPELL_SHADOWFEN,
	SPELL_IRONCLAD,
	SPELL_WINTER,
	SPELL_SWARM,
]

export const RACES_STRUCTURES = [
	STRUCTURE_NEUTRAL,
	STRUCTURE_SHADOWFEN,
	STRUCTURE_IRONCLAD,
	STRUCTURE_WINTER,
	STRUCTURE_SWARM,
]

// prettier-ignore
KNIGHT.addEffects([
	new Effect('spawn a Knight with {value} strength {space}{friendlyAnd}', [3, 0, 1, 1, 1], 1),
	new Effect('deal {value} damage to {targetUnit} enemy {targetUnit2}{forEach}',[1, 0, 3, 1, 1],0.75),
	new Effect('deal {value} damage to {targetUnit} enemy {targetUnit2}{enemyAnd}',[1, 0, 3, 1, 1],0.75)
])

// prettier-ignore
PIRATE.addEffects([
	new Effect('gain {value} strength{pirateForEach}', [3, 0, 3, 3, 3], 0.75),
	new Effect('replace a random non-pirate card from your hand', [3, 3, 3, 3, 3], 0.5),
	new Effect('replace all cards that cost {valueNone} or less from your hand', [3, 3, 3, 3, 3], 0.25),
	new Effect('replace a random non-pirate card from your hand. Reduce the cost of the drawn card by {lowValue}{pirateForEach}', [3, 3, 3, 3, 3], 1),
	new Effect('discard your hand and gain {lowValue} strength for each card discarded', [3, 0, 3, 3, 3], 1.25),
	new Effect('discard a random non-Pirate card', [3, 3, 3, 3, 3], 0.25),
	new Effect('decrease the cost of a random card in your hand by {lowValue}{pirateForEach}', [3, 3, 3, 3, 3], 0.75),
	new Effect('deal {value} damage to {targetUnit} enemy {targetUnit2}{pirateForEach}', [3, 0, 3, 3, 3], 0.75)
])

// prettier-ignore
FELINE.addEffects([
	new Effect('gain {lowValue} speed{forEach}', [3, 0, 0, 0, 0], 1.25),
	new Effect('confuse itself', [3, 0, 0, 3, 0], -0.75),
	new Effect('confuse {targetUnit} friendly {targetUnit2}', [3, 3, 3, 3, 3], -0.75),
	new Effect('confuse {targetUnit} enemy {targetUnit2}', [3, 3, 3, 3, 3], 0.75),
	new Effect('force {targetUnit} enemy {targetUnit2} to attack a random bordering enemy', [3, 3, 3, 3, 3], 1)
])

// prettier-ignore
RAVEN.addEffects([
	new Effect('convert {targetUnit} enemy {targetUnit2} {condition}', [3, 1, 1, 1, 1], 2),
	new Effect('destroy {targetUnit} enemy {targetUnit2} {condition}', [1, 1, 3, 1, 1], 1.5 ),
	new Effect('drain {value} strength from {targetUnit} {targetUnit2}{forEach}', [1, 0, 3, 1, 1], 1.25 ),
	new Effect('drain {value} strength from {targetUnit} {targetUnit2}', [1, 0, 3, 1, 1], 1.25 )
])

// prettier-ignore
TOAD.addEffects([
	new Effect('poison {targetUnit} friendly {targetUnit2}', [3, 1, 1, 1, 1], -0.5),
	new Effect('poison itself', [3, 0, 0, 0, 0], -0.75),
	new Effect('poison {targetUnit} enemy {targetUnit2}', [3, 3, 3, 3, 3], 0.75),
	new Effect('poison {targetUnit} enemy {targetUnit2} and deal {value} damage to it{forEach}', [3, 3, 3, 3, 3], 1 ),
	new Effect('spawn a Toad with {value} strength {space}{friendlyAnd}', [3, 3, 1, 1, 1], 1 ),
	new Effect('drain {value} strength from {targetUnit} enemy {targetUnit2}{forEach}', [1, 0, 1, 1, 1], 1 ),
	new Effect('drain {value} strength from {targetUnit} enemy {targetUnit2}{enemyAnd}', [3, 0, 3, 3, 3], 1 ),
	new Effect('deal {value} damage to {targetUnit} enemy {targetUnit2}{forEach}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('deal {value} damage to {targetUnit} enemy {targetUnit2}{enemyAnd}', [3, 3, 3, 3, 3], 0.75 )
])

// prettier-ignore
RODENT.addEffects([
	new Effect('push {targetPush}', [3, 3, 3, 3, 3], 0.5),
	new Effect('pull {targetPull}', [3, 0, 3, 3, 3], 0.5),
	new Effect('push {targetPush} and deal {value} damage to it{forEach}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('pull {targetPull} and deal {value} damage to it{forEach}', [3, 0, 3, 3, 3], 0.75 ),
	new Effect('deal {value} damage to {targetUnit} enemy {targetUnit2}{forEach}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('deal {value} damage to {targetUnit} enemy {targetUnit2}{enemyAnd}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('deal {valueHigh} damage to {targetUnit} enemy {targetUnit2}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('deal {valueHigh} damage spread randomly among {targetSpread}', [3, 3, 3, 3, 3], 0.75 )
])

// prettier-ignore
CONSTRUCT.addEffects([
	new Effect('give {value} strength to {targetUnit} friendly {targetUnit2}{forEach}', [3, 3, 3, 3, 3], 1 ),
	new Effect('give {value} strength to {targetUnit} friendly {targetUnit2}{friendlyAnd}', [3, 3, 3, 3, 3], 1 ),
	new Effect('give {value} strength to {targetUnit} friendly {targetUnit2} and itself{forEach}', [3, 0, 3, 3, 3], 1.5 ),
	new Effect('vitalize {targetUnit} friendly {targetUnit2}', [1, 1, 1, 1, 1], 0.5),
	new Effect('vitalize {targetUnit} friendly {targetUnit2} and itself', [3, 0, 0, 0, 0], 1 ),
	new Effect('spawn a Construct with {value} strength {space}{friendlyAnd}', [0, 3, 3, 3, 3], 1 )
])

// prettier-ignore
FROSTLING.addEffects([
	new Effect('freeze itself', [1, 0, 0, 1, 0], -0.75),
	new Effect('freeze {targetUnit} friendly {targetUnit2}', [1, 1, 1, 1, 1], -0.75),
	new Effect('freeze {targetUnit} enemy {targetUnit2}', [3, 3, 3, 3, 3], 1),
	new Effect('freeze {targetUnit} enemy {targetUnit2} and deal {value} damage to it{forEach}', [3, 3, 3, 3, 3], 1 ),
	new Effect('deal {value} damage to {targetUnit} enemy {targetUnit2}{forEach}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('deal {value} damage to {targetUnit} enemy {targetUnit2}{enemyAnd}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('gain {value} mana{forEach}', [3, 0, 3, 0, 3], 1)
])

// prettier-ignore
DWARF.addEffects([
	new Effect('gain {value} strength{forEach}', [3, 0, 3, 3, 3], 0.75),
	new Effect('give {value} strength to {targetUnit} friendly {targetUnit2}{forEach}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('give {value} strength to {targetUnit} friendly {targetUnit2}{friendlyAnd}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('lose {valueNone} strength{forEach}', [0, 0, 3, 3, 3], -0.5),
])

// prettier-ignore
UNDEAD.addEffects([
	new Effect('spawn an Undead with {value} strength {space}{friendlyAnd}', [3, 3, 3, 3, 3], 1 ),
	new Effect('deal {value} damage to the enemy base', [3, 3, 3, 3, 3], 1),
	new Effect('command {targetUnit} friendly {targetUnit2} forward', [3, 3, 3, 3, 3], 1),
	new Effect('give {value} strength to {targetUnit} friendly {targetUnit2}{forEach} and command it forward', [3, 3, 3, 3, 3], 1 )
])

// prettier-ignore
SATYR.addEffects([
	new Effect('spawn a Satyr with {value} strength {space}{friendlyAnd}', [3, 0, 3, 3, 3], 1),
	new Effect('give {value} strength to {targetUnit} friendly {targetUnit2}{forEach}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('give {value} strength to {targetUnit} friendly {targetUnit2}{friendlyAnd}', [3, 3, 3, 3, 3], 0.75 ),
	new Effect('vitalize {targetUnit} friendly {targetUnit2}', [3, 3, 3, 3, 3], 0.75),
	new Effect('deal {valueNone} damage to your base', [3, 3, 3, 3, 3], -1),
])

// prettier-ignore
SPELL_NEUTRAL.addEffects([
	new Effect('give {valueFast} strength to {targetSpell} friendly {targetSpell2}{friendlyAnd}', [], 1),
	new Effect('deal {valueFast} damage to {targetSpell} enemy {targetSpell2}{enemyAnd}', [], 1),
	new Effect('spawn a friendly Knight with {valueFast} stregnth on {spaceSpell}{friendlyAnd}', [], 1.25),
	new Effect('teleport {targetSpell} friendly {targetSpell2} to {spaceSpell}{friendlyAnd}', [], 1),
])

// prettier-ignore
SPELL_SHADOWFEN.addEffects([
	new Effect('give {valueFast} strength to {targetSpell} friendly {targetSpell2}{friendlyAnd}', [], 1),
	new Effect('deal {valueFast} damage to {targetSpell} enemy {targetSpell2}{enemyAnd}', [], 1),
	new Effect('spawn a 1 strength Toad {spaceToads}{friendlyAnd}', [], 1),
	new Effect('destroy target friendly unit, then {deathEffect}', [], 1),
	new Effect('destroy target friendly unit, then {deathEffect} and {deathEffect}', [], 1),
	new Effect('poison {targetSpell} enemy {targetSpell2}', [], 0.75),
	new Effect('convert {targetSpell} enemy {targetSpell2} {condition}', [], 2),
	new Effect('destroy {targetSpell} enemy {targetSpell2} {condition}', [], 1.5 ),
	new Effect('Make {targetSpell} friendly {targetSpell2} drain {valueFast} strength from {targetAny} enemy {targetAny2}{friendlyAnd}', [], 1.5),
])

// prettier-ignore
SPELL_IRONCLAD.addEffects([
	new Effect('give {valueFast} strength to {targetSpell} friendly {targetSpell2}{friendlyAnd}', [], 1),
	new Effect('deal {valueFast} damage to {targetSpell} enemy {targetSpell2}{enemyAnd}', [], 1),
	new Effect('destroy {targetSpell} friendly {targetSpell2}. Respawn it with {valueHigh} strength on {spaceSpell}{friendlyAnd}', [], 0.75),
	new Effect('teleport {targetSpell} friendly {targetSpell2} to {spaceSpell}{friendlyAnd}', [], 1),
	new Effect('spawn a friendly Construct with {valueFast} stregnth on {spaceSpell}{friendlyAnd}', [], 1.25),
])

// prettier-ignore
SPELL_WINTER.addEffects([
	new Effect('give {valueFast} strength to {targetSpell} friendly {targetSpell2}{friendlyAnd}', [], 1),
	new Effect('deal {valueFast} damage to {targetSpell} enemy {targetSpell2}{enemyAnd}', [], 1),
	new Effect('freeze {targetSpell} enemy {targetSpell2}', [], 1),
	new Effect('{manaIf}gain {valueFast} mana {manaIf2}', [], 0.75)
])

// prettier-ignore
SPELL_SWARM.addEffects([
	new Effect('give {valueFast} strength to {targetSpell} friendly {targetSpell2}{friendlyAnd}', [], 1),
	new Effect('deal {valueFast} damage to {targetSpell} enemy {targetSpell2}{enemyAnd}', [], 1),
	new Effect('spawn a friendly Satyr with {valueFast} stregnth on {spaceSpell}{friendlyAnd}', [], 1.25),
	new Effect('deal {valueSelfDmg} damage to your base. Give {valueHigh} strength to {targetSpell} friendly {targetSpell2}{friendlyAnd}', [], 0.75),
	new Effect('deal {valueSelfDmg} damage to your base. Deal {valueHigh} damage to {targetSpell} enemy {targetSpell2}{enemyAnd}', [], 0.75),
	new Effect('deal {valueSelfDmg} damage to your base. Spawn a friendly Satyr with {valueHigh} stregnth on {spaceSpell}{friendlyAnd}', [], 0.75),
])

// prettier-ignore
STRUCTURE_NEUTRAL.addEffects([
	new Effect('give {valueFast} strength to {targetStructure} friendly {targetStructure2}{friendlyAnd}{structureThen}', [], 1),
	new Effect('deal {valueFast} damage to {targetStructure} enemy {targetStructure2}{enemyAnd}{structureThen}', [], 1),
	new Effect('spawn a friendly Knight with {valueFast} stregnth {space}{friendlyAnd}{structureThen}', [], 1)
])

// prettier-ignore
STRUCTURE_SHADOWFEN.addEffects([
	new Effect('give {valueFast} strength to {targetStructure} friendly {targetStructure2}{friendlyAnd}{structureThen}', [], 1),
	new Effect('deal {valueFast} damage to {targetStructure} enemy {targetStructure2}{enemyAnd}{structureThen}', [], 1),
	new Effect('spawn a friendly Knight with {valueFast} stregnth {space}{friendlyAnd}{structureThen}', [], 1)
])

// prettier-ignore
STRUCTURE_IRONCLAD.addEffects([
	new Effect('give {valueFast} strength to {targetStructure} friendly {targetStructure2}{friendlyAnd}{structureThen}', [], 1),
	new Effect('deal {valueFast} damage to {targetStructure} enemy {targetStructure2}{enemyAnd}{structureThen}', [], 1),
	new Effect('spawn a friendly Knight with {valueFast} stregnth {space}{friendlyAnd}{structureThen}', [], 1)
])

// prettier-ignore
STRUCTURE_WINTER.addEffects([
	new Effect('give {valueFast} strength to {targetStructure} friendly {targetStructure2}{friendlyAnd}{structureThen}', [], 1),
	new Effect('deal {valueFast} damage to {targetStructure} enemy {targetStructure2}{enemyAnd}{structureThen}', [], 1),
	new Effect('spawn a friendly Knight with {valueFast} stregnth {space}{friendlyAnd}{structureThen}', [], 1)
])

// prettier-ignore
STRUCTURE_SWARM.addEffects([
	new Effect('give {valueFast} strength to {targetStructure} friendly {targetStructure2}{friendlyAnd}{structureThen}', [], 1),
	new Effect('deal {valueFast} damage to {targetStructure} enemy {targetStructure2}{enemyAnd}{structureThen}', [], 1),
	new Effect('spawn a friendly Knight with {valueFast} stregnth {space}{friendlyAnd}{structureThen}', [], 1)
])

// prettier-ignore
export const BASE_SLOTS = [
	new Slot('targetUnit', 'a random bordering', '[unit]', 1),
	new Slot('targetUnit', 'a random surrounding', '[unit]', 1.25),
	new Slot('targetUnit', 'bordering', '[unit]s', 1.5),
	new Slot('targetUnit', 'surrounding', '[unit]s', 1.75),

	new Slot('targetAny', 'all', '[unit]s', 2),
	new Slot('targetAny', 'a random', '[unit]', 1),
	new Slot('targetAny', '', '[unit]s bordering your base', 1.25),
	new Slot('targetAny', '', '[unit]s bordering the enemy base', 1.25),

	new Slot('targetSpell', 'target', '[unit]', 1.25),

	new Slot('targetStructure', 'a random bordering', '[unit]', 1),
	new Slot('targetStructure', 'a random surrounding', '[unit]', 1.25),
	new Slot('targetStructure', 'bordering', '[unit]s', 1.5),
	new Slot('targetStructure', 'surrounding', '[unit]s', 1.75),
	new Slot('targetStructure', 'the most forward', '[unit]', 1),
	new Slot('targetStructure', 'all', '[unit]s', 2),
	new Slot('targetStructure', 'a random', '[unit]', 1),
	new Slot('targetStructure', '[unit]s', 'in front', 1.25),

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
	new Slot('space', 'on all tiles bordering your base', '', 2),
	new Slot('space', 'on 2 random tiles', '', 1.75),
	new Slot('space', 'behind {targetAny} friendly {targetAny2}', '', 0.75),
	new Slot('space', 'in front of {targetAny} enemy {targetAny2}', '', 0.75),
	new Slot('space', 'on both sides', '', 1.5),
	new Slot('space', 'on tiles behind', '', 1.75),
	
	new Slot('spaceSpell', 'a random tile', '', 1),
	new Slot('spaceSpell', 'a random tile on your frontline', '', 1.25),
	new Slot('spaceSpell', 'a random tile bordering your base', '', 1),

	new Slot('value', '1', '', 1),
	new Slot('value', '2', '', 2),
	new Slot('value', '3', '', 3),
	new Slot('value', '4', '', 4),
	new Slot('value', '5', '', 5),

	new Slot('valueNone', '1', '', 1),
	new Slot('valueNone', '2', '', 2),
	new Slot('valueNone', '3', '', 3),
	new Slot('valueNone', '4', '', 4),
	new Slot('valueNone', '5', '', 4.5),

	new Slot('valueSlow', '1/1/2/2/3','',1),
	new Slot('valueSlow', '2/2/3/3/4','',2),
	new Slot('valueSlow', '3/3/4/4/5','',3),
	new Slot('valueSlow', '4/4/5/5/6','',4),
	new Slot('valueSlow', '5/5/6/6/7','',4.5),

	new Slot('valueFast', '1/2/3/4/5', '', 1),
	new Slot('valueFast', '2/3/4/5/7', '', 2),
	new Slot('valueFast', '3/4/5/6/8', '', 3),
	new Slot('valueFast', '4/5/6/8/10', '', 4),
	new Slot('valueFast', '5/6/8/10/12', '', 4.5),

	new Slot('lowValue', '1', '', 1),
	new Slot('lowValue', '2', '', 2),

	new Slot('valueCostless', '1', '1', 1),
	new Slot('valueCostless', '2', '2', 1),
	new Slot('valueCostless', '3', '3', 1),
	new Slot('valueCostless', '4', '4', 1),
	new Slot('valueCostless', '5', '5', 1),
	
	new Slot('valueSelfDmg', '2', '2', 0.75),
	new Slot('valueSelfDmg', '3', '3', 0.6),
	new Slot('valueSelfDmg', '4', '4', 0.5),
	new Slot('valueSelfDmg', '5', '5', 0.4),
	
	new Slot('valueHigh', '5/6/7/9/11', '', 4.5),
	new Slot('valueHigh', '6/7/9/11/13', '', 5),
	new Slot('valueHigh', '7/8/10/12/15', '', 5.5),
	new Slot('valueHigh', '8/10/12/14/17', '', 6),
	new Slot('valueHigh', '9/11/14/17/20', '', 6.5),

	new Slot('forEach', '', '', 1),
	new Slot('forEach', '', '', 1),
	new Slot('forEach', '', '', 1),
	new Slot('forEach', '', '', 1),
	new Slot('forEach', '', '', 1),
	new Slot('forEach', ' for each enemy unit', '', 1.75),
	new Slot('forEach', ' for each other friendly unit', '', 1.5),

	new Slot('friendlyAnd', '', '', 1),
	new Slot('friendlyAnd', '', '', 1),
	new Slot('friendlyAnd', ' and vitalize it', '', 1.25),
	new Slot('friendlyAnd', '. Deal {value} damage to enemy units bordering it', '', 1.25),
	new Slot('friendlyAnd', '. Deal {value} damage to enemy units surrounding it', '', 1.5),

	new Slot('enemyAnd', '', '', 1),
	new Slot('enemyAnd', '', '', 1),
	new Slot('enemyAnd', '', '', 1),
	new Slot('enemyAnd', ', then deal {valueHigh} damage spread among enemies surrounding it', '', 0.5),
	new Slot('enemyAnd', ' and disable its ability', '', 1.25),
	new Slot('enemyAnd', ' and teleport the strongest friendly unit to the tile in front of it', '', 1.25),

	new Slot('structureThen', '', '', 1),
	new Slot('structureThen', '', '', 1),
	new Slot('structureThen', '. Then, destroy this structure', '', 0.25),

	new Slot('condPlay', 'When played bordering your base', '', 0.5),
	new Slot('condPlay', 'When played bordering a friendly [unit]', '', 0.75),
	new Slot('condPlay', 'When played bordering an enemy unit', '', 0.75),
	new Slot('condPlay', 'When played with no surrounding units', '', 0.5),

	new Slot('condAttack', 'After attacking', '', 0.75),
	new Slot('condAttack', 'Before attacking a unit bordering another friendly unit', '', 0.5 ),

	new Slot('template', 'value', 'value', 1),

	new Slot('pirateForEach', ' for each Pirate in your hand', '', 1.5),
	new Slot('pirateForEach', ' for each card in your hand that costs more than this card', '', 1.75 ),
	new Slot('pirateForEach', ' for each card in your hand that costs less than this card', '', 1.75 ),
	new Slot('pirateForEach', ' for each friendly Pirate', '', 1.25),

	new Slot('pirateCondPlay', 'When played as the last card in your hand', '', 0.25 ),
	new Slot('pirateCondPlay', 'When played with a full hand', '', 0.75),
	new Slot('pirateCondPlay', 'When played with another Pirate in your hand', '', 0.5 ),
	new Slot('pirateCondPlay', 'When played immedately after playing another Pirate', '',0.25),
]

// prettier-ignore
export const SHADOWFEN_SLOTS = [
	new Slot('targetAny', 'a random poisoned', '[unit]', 0.5),
	new Slot('targetAny', 'poisoned', '[unit]s', 1),
	new Slot('targetAny', 'the weakest', '[unit]', 1),
	new Slot('targetAny', 'the strongest', '[unit]', 1),

	new Slot('targetUnit', 'weaker', '[unit]s', 1.25),
	new Slot('targetUnit', 'stronger', '[unit]s', 1.75),

	new Slot('forEach', ' for each bordering poisoned enemy unit', '', 1),
	new Slot('forEach', ' for each surrounding poisoned enemy unit', '', 1),
	new Slot('forEach', ' for each poisoned enemy unit', '', 1.25),

	new Slot('condition', 'with {valueNone} or less strength', '', 1),
	new Slot('condition', 'weaker than this unit', '', 1),
	new Slot('condition', 'with the lowest strength among all units', '', 1),
	new Slot('condition', 'not bordering another enemy unit', '', 1),
	
	new Slot('spaceToads', 'on {valueFast} random tiles', '', 1.25),
	new Slot('spaceToads', 'on all tiles bordering {targetAny} friendly {targetAny2}', '', 2.5),
	//new Slot('spaceToads', 'on all tiles behind your frontline', '', 3.5),

	new Slot('friendlyAnd', '. Poison enemy units surrounding it', '', 1.25),
	new Slot('friendlyAnd', '. Then, it drains 1 strength from the enemy base','',1.5),

	new Slot('enemyAnd', '. Then, if it has {value} or less strength, convert it', '', 1),
	new Slot('enemyAnd', ' and poison it', '', 1.25),
	new Slot('enemyAnd', '. If it dies, {deathEffect}', '', 0.75),
	new Slot('enemyAnd', '. If it dies, {deathEffect}', '', 0.75),
	new Slot('enemyAnd', '. Then, if it has the least strength among all units, destroy it and {deathEffect}', '', 0.75),
	new Slot('enemyAnd', '. Then, if it has {value} or less strength, destroy it and {deathEffect}', '', 0.75),

	new Slot('deathEffect', 'deal {valueSlow} damage to all enemies bordering it', '', 0.75),
	new Slot('deathEffect', 'deal {valueSlow} damage to all enemies surrounding it', '', 0.75),
	new Slot('deathEffect', 'poison all enemy units bordering it', '', 1.25),
	new Slot('deathEffect', 'poison all enemy units surrounding it', '', 1.25),
	new Slot('deathEffect', 'convert all enemy units with {valueSlow} or less strength that were bordering it', '', 1),
	new Slot('deathEffect', 'convert all enemy units with {valueSlow} or less strength that were surrounding it', '', 1),
	new Slot('deathEffect', 'spawn a {valueSlow} strength Raven there', '', 1),
	new Slot('deathEffect', 'spawn a 1 strength Toad on {valueSlow} random surrounding tiles', '', 1),

	new Slot('condPlay', 'When played bordering a poisoned unit', '', 0.5),
	new Slot('condPlay', 'When played bordering a unit with {valueNone} or less strength', '', 0.75 ),

	new Slot('condAttack', 'Before attacking a stronger unit', '', 0.5),
	new Slot('condAttack', 'Before attacking a weaker unit', '', 0.5),
	new Slot('condAttack', 'Before attacking a poisoned unit', '', 0.5),
	new Slot('condAttack', 'Before attacking a unit with no bordering enemy units', '', 0.5 ),
]

// prettier-ignore
export const IRONCLAD_SLOTS = [
	new Slot('targetSpell', 'all', '[unit]s in the same row as target [unit]', 1.75),
	new Slot('targetSpell', 'all', '[unit]s in the same column as target [unit]', 1.75),
	
	new Slot('targetAny', 'all', '[unit]s bordering a friendly structure', 1.25),
	new Slot('targetAny', 'all', '[unit]s surrounding a friendly structure', 1.5),

	new Slot('targetPush', 'a random bordering enemy [unit] away', '', 1),
	new Slot('targetPush', 'bordering enemy [unit]s away', '', 1.25),
	new Slot('targetPush', 'the [unit] in front away', '', 1),

	new Slot('targetPull', 'enemy [unit]s towards itself', '', 1),
	new Slot('targetPull', 'the first [unit] from behind towards itself', '', 1),

	new Slot('targetSpread', 'bordering enemy [unit]s', '', 0.75),
	new Slot('targetSpread', 'surrounding enemy [unit]s', '', 1),
	new Slot('targetSpread', 'all enemy [unit]s', '', 1.25),
	new Slot('targetSpread', 'enemy [unit]s in front', '', 0.75),
	
	new Slot('friendlyAnd', ' and trigger the effects of all structures surrounding it', '', 1.75),
	new Slot('friendlyAnd', ' and push it towards the enemy base', '', 1.75),
	
	new Slot('enemyAnd', '. All structures surrounding it gain strength equal to the damage dealt', '', 1.25),
	new Slot('enemyAnd', '. If it dies, trigger the effects of all structures surrouding it', '', 1.5),
	new Slot('enemyAnd', ' and push it away from your base', '', 1.25),

	new Slot('condPlay', 'When played bordering a friendly [unit]', '', 0.5),
]

// prettier-ignore
export const WINTER_SLOTS = [
	new Slot('targetAny', 'a random frozen', '[unit]', 0.5),
	new Slot('targetAny', 'all frozen', '[unit]s', 1),

	new Slot('targetSpell', 'target', '[unit] with {valueNone} or less strength', 0.25),

	new Slot('forEach', ' for each bordering frozen enemy unit', '', 1),
	new Slot('forEach', ' for each surrounding frozen enemy unit', '', 1),
	new Slot('forEach', ' for each frozen enemy unit', '', 1.25),
	new Slot('forEach', ' for each stronger friendly unit', '', 1.25),
	new Slot('forEach', ' for each weaker friendly unit', '', 1.25),
	new Slot('forEach', ' for each bordering friendly unit', '', 1),
	new Slot('forEach', ' for each surrounding friendly unit', '', 1),
	new Slot('forEach', ' for each enemy unit bordering your base', '', 0.5),
	new Slot('forEach', ' for every {valueCostless} unspent mana', '', 1),

	new Slot('friendlyAnd', '. Then, if it has {valueCostless} or less strength, give it {value} strength', '', 0.75),
	new Slot('friendlyAnd', '. Then, if it has {valueCostless} or more strength, all units take {valueCostless2} damage', '', 0.75),
	new Slot('friendlyAnd', ' and freeze enemy units surrounding it', '', 1.5),

	new Slot('enemyAnd', ' and freeze it', '', 1.25),
	new Slot('enemyAnd', '. Freeze it and all enemy units bordering it', '', 1.5),
	new Slot('enemyAnd', '. If it dies, your base gains 1 strength', '', 1.5),
	
	new Slot('manaIf', '', 'if this is not the first card you have played this turn', 0.75),
	new Slot('manaIf', '', 'if you have a friendly unit with {valueCostless} or more strength', 0.5),
	new Slot('manaIf', '', 'if you have exactly 1 friendly unit', 0.5),
	new Slot('manaIf', '', 'if your base has {valueCostless} or less strength', 0.5),
	new Slot('manaIf', 'Deal 2 damage to {targetSpell} friendly {targetSpell2}. If this dealt damage, ', '', 0.5),
	new Slot('manaIf', '', ', then deal 2 damage to your base',0.5),

	new Slot('condPlay', 'When played bordering a stronger friendly unit', '', 0.5 ),
	new Slot('condPlay', 'When played bordering a weaker friendly unit', '', 0.5),
	new Slot('condPlay', 'When played bordering a frozen unit', '', 0.5),

	new Slot('condAttack', 'Before attacking a frozen unit', '', 0.5),
	new Slot('condAttack', 'Before attacking a unit bordering any base', '', 0.5),
]

// prettier-ignore
export const SWARM_SLOTS = [
	new Slot('targetSpell', 'all', '[unit]s in the same row as target [unit]', 1.75),
	new Slot('targetSpell', 'all', '[unit]s in the same column as target [unit]', 1.75),

	new Slot('forEach', ' for each bordering friendly Saytr', '', 1),
	new Slot('forEach', ' for each surrounding friendly Saytr', '', 1),
	new Slot('forEach', ' for each friendly Saytr', '', 1.25),

	new Slot('friendlyAnd', ' and command it forwards', '', 1.25),

	new Slot('condPlay', 'When played with 2 or more bordering friendly [unit]s', '', 0.25 ),

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
		['Myst', 'Snow', 'Rock', 'Hearth', 'Wolf', 'Earth', 'Sleet', 'Chill', 'Hail', 'Frost', 'Ore', 'Shale', 'Stone', 'Helm'],
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
	spell_neutral: [
		['Infused', 'Rippling', 'Blessed', 'Faithful', 'Wild', 'Channeled',  'Attuned', 'Sealed', 'Arcane'],
		['Scripture', 'Enchantment', 'Boon', 'Light', 'Gift', 'Judgement', 'Rune', 'Grace']
	],
	spell_shadowfen: [
		['Murky', 'Infested', 'Firefly', 'Toxic', 'Stygian', 'Foul', 'Stagnant', 'Withered'],
		['Darkness', 'Ritual', 'Conjuration', 'Draught', 'Markings', 'Curse', 'Deluge']
	],
	spell_ironclad: [
		['Logical', 'Unstable', 'Patented', 'Hydrogen', 'Carbonized', 'Static', 'Boosted', 'Inferno'],
		['Catalyst', 'Overclock', 'Formula', 'Spark', 'Tonic', 'Elixir', 'Fabrication']
	],
	spell_winter: [
		['Chilling', 'Frozen', 'Silent', 'Crystalline', 'Midwinter', 'Stoneward', 'Primal', 'Frigid'],
		['Blizzard', 'Moon', 'Grace', 'Eclipse', 'Touch', 'Light', 'Blaze']
	],
	spell_swarm: [
		['Dusty', 'Heralds', 'Shepards', 'Harvesters', 'Fertile', 'Sunbaked', 'Sunlight', 'Grim', 'Reapers'],
		['Hymn', 'Chant', 'Rhythms', 'Command', 'Orders', 'Geas', 'Call']
	],
	structure_neutral: [
		['Mason’s', 'Old One’s', 'Crumbling', 'Grand', 'Gilded', 'Bygone', 'Noble', 'Opulent', 'Ebonrock', 'Emerald'],
		['Tower', 'Fortress', 'Encampment', 'Stonework', 'Relic', 'Monument', 'Ramparts', 'Citadel', 'Stronghold']
	],
	structure_shadowfen: [
		['Shrouded', 'Swampwater', 'Primordial', 'Oozing', 'Pestilent', 'Dismal', 'Venomfall', 'Hollow', 'Insufferable'],
		['Obelisk', 'Spire', 'Barrow', 'Nest', 'Altar', 'Sanctum', 'Grove', 'Weald']
	],
	structure_ironclad: [
		['Wrought-Iron', 'Charged', 'Voltaic', 'Upgraded', 'Overclocked', 'Metalwork', 'Lightning', 'Unstable', 'Siege', 'Centrifugal', 'Animated'],
		['Forge', 'Dynamo', 'Generator', 'Capacitor', 'Transistor', 'Turbine', 'Workshop', 'Factory']
	],
	structure_winter: [
		['Moon-touched', 'Glacial', 'Underground', 'Frozen', 'Frigid', 'Dwarven'],
		['Snowdrift', 'Spring', 'Palace', 'Core', 'Hearth', 'Cavern',  'Grotto']
	],
	structure_swarm: [
		['Harvest', 'Buried', 'Oasis', 'Verdant', 'Haunted', 'Undying', 'Derelict', 'Moonlit'],
		['Pillars', 'Hut', 'Campfire', 'Crypt', 'Tomb', 'Mausoleum', 'Catacombs', 'Ruins', 'Aerie', 'Silo', 'Sanctuary', 'Sepulcher']
	]
}

// prettier-ignore
export const STATLINES_NONE = [
	["2","4","5","7","8","10","11","13"],
	["1","2","3","5","6","8","9","11"],
	["0","1","2","3","4","5","6","7"],
	["0","0","1","2","3","4","5","6"]
]

// prettier-ignore
export const STATLINES_SLOW = [
	["2/3/3/4/4", "4/5/5/6/6", "5/6/6/7/8", "7/8/9/10/11", "8/9/10/11/13", "10/11/12/14/16", "11/13/15/17/19", "13/15/17/20/24"],
	["1/2/2/3/3", "2/3/3/4/4", "3/4/4/5/5", "5/6/6/7/8", "7/8/9/10/11", "8/9/10/11/13", "10/11/12/14/16", "12/14/16/19/23"],
	["0/0/0/0/0", "1/2/2/3/3", "2/3/3/4/4", "3/4/4/5/5", "4/5/5/6/6", "5/6/6/7/8", "6/7/7/8/9", "7/8/8/9/10"],
	["0/0/0/0/0", "0/0/0/0/0", "1/2/2/3/3", "2/3/3/4/4", "3/4/4/5/5", "4/5/5/6/6", "5/6/6/7/8", "6/7/7/8/9"],
]

// prettier-ignore
export const STATLINES_FAST = [
	["2/3/4/5/6", "4/5/6/7/8", "5/6/7/8/10", "7/8/10/12/14", "8/10/12/15/18", "10/13/16/20/24", "11/15/19/23/28", "13/17/21/25/30"],
	["1/2/3/4/5", "2/3/4/5/6", "3/4/5/6/8", "5/6/7/8/10", "7/8/10/12/15", "8/10/12/15/18", "10/13/16/20/24", "12/16/20/24/28"],
	["0/0/0/0/0", "1/2/3/4/5", "2/3/4/5/6", "3/4/5/6/7", "4/5/6/7/8", "5/6/7/8/10", "6/7/8/10/12", "7/8/10/12/14"],
	["0/0/0/0/0", "0/0/0/0/0", "1/2/3/4/5", "2/3/4/5/6", "3/4/5/6/7", "4/5/6/7/8", "5/6/7/9/11", "6/7/8/10/12"],
]
