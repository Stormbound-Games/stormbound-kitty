export const DEFAULT_PLAYER = { health: 10, faction: 'neutral' }
export const DEFAULT_CELL = {
  player: null,
  card: {},
  strength: 0,
  level: 1,
  poisoned: false,
  vitalised: false,
  frozen: false,
  confused: false,
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
