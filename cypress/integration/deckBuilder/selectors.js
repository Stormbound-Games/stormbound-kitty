const selectors = {
  CARD: '[data-testid="card"]',
  CARD_ABILITY: '[data-testid="card-ability"]',
  CARD_LEVEL: '[data-testid="card-level"]',
  CARD_MANA: '[data-testid="card-mana"]',
  CARD_MOVEMENT: '[data-testid="card-movement"]',
  CARD_RARITY: '[data-testid="card-rarity"]',
  CARD_UNIT_TYPE: '[data-testid="card-unit-type"]',

  LEVEL_SELECT: '[data-testid="level-select"]',
  FACTION_SELECT: '[data-testid="faction-select"]',
  TYPE_SELECT: '[data-testid="type-select"]',
  MANA_SELECT: '[data-testid="mana-select"]',
  MOVEMENT_SELECT: '[data-testid="movement-select"]',
  RARITY_SELECT: '[data-testid="rarity-select"]',
  UNIT_TYPE_SELECT: '[data-testid="unit-type-select"]',
  ABILITY_SELECT: '[data-testid="ability-select"]',
  NAME_INPUT: '[data-testid="name-input"]',
  RESET_FILTERS_BTN: '[data-testid="reset-filters-btn"]',

  RANDOM_BTN: '[data-testid="random-deck-btn"]',
  RANDOM_DIALOG: '#random-deck-dialog',
  RANDOM_FACTION_SELECT: '[data-testid="random-faction-select"]',
  RANDOM_MIN_FACTION_SELECT: '[data-testid="random-min-faction-select"]',
  RANDOM_MAX_EPIC_SELECT: '[data-testid="random-max-epic-select"]',
  RANDOM_MAX_LEGENDARY_SELECT: '[data-testid="random-max-legendary-select"]',
  RANDOM_DIALOG_CONFIRM: '[data-testid="random-deck-dialog-confirm-btn"]',
  DECK_CARD: '#deck [data-testid*="deck-slot"]',

  IMPORT_BTN: '[data-testid="import-btn"]',
  RESET_BTN: '[data-testid="reset-btn"]',
  RESET_CONFIRM_BTN: '[data-testid="reset-confirm-btn"]',

  GHOST_DECK: '[data-testid="ghost-deck"]',
  EDIT_DECK_BTN: '[data-testid="edit-deck-btn"]',
  DELETE_DECK_BTN: '[data-testid="delete-deck-btn"]',
  DELETE_DECK_CONFIRM_BTN: '[data-testid="delete-confirm-btn"]',
  PERSONAL_DECKS: '[data-testid="featured-deck"]',
  GHOST_DECK_BTN: '[data-testid="ghost-deck-btn"]',
  DECK_FORM: '[data-testid="deck-form"]',
  DECK_ID_INPUT: '[data-testid="deck-id-input"]',
  DECK_NAME_INPUT: '[data-testid="deck-name-input"]',
  DECK_TAGS_INPUT: '#deck-tags input:not([type="hidden"])',
  DECK_SUBMIT_BTN: '[data-testid="deck-submit"]',

  IMPORT_DECKS_BTN: '[data-testid="import-decks-btn"]',
  EXPORT_DECKS_BTN: '[data-testid="export-decks-btn"]',

  PERSONAL_DECKS_NAME_INPUT: '[data-testid="decks-name-input"]',
  PERSONAL_DECKS_FACTION_SELECT: '[data-testid="decks-faction-select"]',
  PERSONAL_DECKS_TAGS_SELECT: '#tags input:not([type="hidden"])',

  DECK_SUGGESTION: '[data-testid="featured-deck"]',
  BOOKMARK_BTN: '[data-testid="bookmark-btn"]',

  PAGE_META: '[data-testid="page-meta"]',
}

export default selectors
