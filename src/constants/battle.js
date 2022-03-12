import { DEFAULT_DECK } from '~/constants/deck'

export const DEFAULT_PLAYER = { health: 10, faction: 'neutral' }
export const DEFAULT_CELL = {
  player: null,
  card: {},
  strength: 0,
  level: 1,
  poisoned: false,
  vitalized: false,
  frozen: false,
  confused: false,
  disabled: false,
}
export const DEFAULT_MANA = 3
export const DEFAULT_BOARD = [
  [
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
  ],
  [
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
  ],
  [
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
  ],
  [
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
  ],
  [
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
    { ...DEFAULT_CELL },
  ],
]

export const DEFAULT_SIM = {
  board: DEFAULT_BOARD,
  mana: DEFAULT_MANA,
  cards: [...DEFAULT_DECK],
  hand: [],
  players: {
    RED: { ...DEFAULT_PLAYER },
    BLUE: { ...DEFAULT_PLAYER },
  },
}
