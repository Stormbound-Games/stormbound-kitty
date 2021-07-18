import { BRAWLS } from './brawl'

export const DEFAULT_CARD = { id: null, level: 1 }
export const DEFAULT_DECK = [
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
  { ...DEFAULT_CARD },
]

export const TAGS = {
  STARTER: 'Starter',
  REGULAR: 'Regular',
  HIGH_LEVELS: 'High Levels',
  BRAWL: 'Brawl',
  EQUALS: 'Equals',
  RUSH: 'Rush',
  CONTROL: 'Control',
}

// Add every single Brawl modifier as a potential deck tag
BRAWLS.forEach(brawl => (TAGS[brawl.id] = brawl.label))
