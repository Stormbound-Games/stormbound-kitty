
// Turns on verbose logging, displaying how each card is calculated.
export const VERBOSE = false

// Removes the caps on minimum mana, maximum mana, and effect cost. Can make
// some funny units.
export const UNCAPPED = false

// MAX_EFF_COST can be used to tweak the maximum power of the effect.
// Higher values tend towards smaller units with more potent effects.
export const MIN_MANA = UNCAPPED ? -999 : 1
export const MAX_MANA = UNCAPPED ? 999 : 9
export const MAX_EFF_COST = UNCAPPED ? 999 : 6

// These parameters can be used to limit the types of cards generated.
// When the filter buttons are added, they will affect these variables.
// Be sensible with these requirments. Don't put in anything impossible.
export const filters = {
  faction: '',
  race: '',
}
