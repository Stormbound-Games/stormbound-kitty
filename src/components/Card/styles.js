// Horizontal spacing within the card is expressed in `em` instead of using a
// spacing variable (`rem`) as it needs to scale with the card font size.
// Additionally, `2em` would be fine generally, but spells have a thicker border
// where additional spacing is needed. If it’s too big for other cards, it could
// be based on the card type.
const HORIZONTAL_SPACING = '2.35em'
const MISSING_FILTER = 'contrast(200%) saturate(0.5) grayscale(0.5)'
const IMAGES = {
  mana: "url('/assets/images/card/mana.png')",
  movement: {
    regular: "url('/assets/images/card/movement.png')",
    fixed: "url('/assets/images/card/movement-fixed.png')",
  },
  strength: {
    regular: "url('/assets/images/card/strength-unit.png')",
    hero: "url('/assets/images/card/strength-hero.png')",
    structure: "url('/assets/images/card/strength-structure.png')",
  },
}

export const getOutlineColor = ({ isAffordable, isUpgradable, player }) => {
  if (isUpgradable) return 'var(--upgradable)'
  if (isAffordable) return 'var(--affordable)'
  if (player === 'RED') return 'var(--player-red)'
  if (player === 'BLUE') return 'var(--player-blue)'
  return 'transparent'
}

// 1. Relative positioning for absolutely positioning mana.
// 2. The `--font-size` CSS custom property is computed at runtime in JS.
// 3. The color of the outline is relevant when the card is in a particular
//    state (affordable, upgradable, owned by a player…). A CSS custom property
//    is used so it can be inherited by the child mana element which also needs
//    to know about the outline color.
// 4. Prevent the ability from being hyphenated.
// 5. Pseudo-element padding hack used to enforce a certain aspect ratio
//    regardless of the content of the card (or lack thereof).
const card = {
  position: 'relative', // 1
  fontSize: 'var(--font-size)', // 2
  borderRadius: '2.25em',
  transition: 'box-shadow 250ms, transform 250ms',
  boxShadow: '0 1em 0.75em #00000040, 0 0 0 0.5em var(--outline-color)', // 3
  hyphens: 'none', // 4

  '::before': {
    content: '""', // 5
    display: 'block',
    paddingTop: '168.6%',
  },
}

// 1. Slightly offset the mana diamond from the card so it shows from the top.
const mana = ({ hasDecreasedMana, hasIncreasedMana, isMissing }) => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translate(-50%, -30%)', // 1
  width: '20%',
  backgroundImage: IMAGES.mana,
  backgroundSize: 'cover',
  transition: 'filter 250ms',
  filter: [
    isMissing && MISSING_FILTER,
    'drop-shadow(0 -0.15em var(--outline-color))',
  ]
    .filter(Boolean)
    .join(' '),
  fontSize: '250%',
  color: hasDecreasedMana
    ? 'var(--affordable)'
    : hasIncreasedMana
    ? 'var(--light-ironclad)'
    : 'var(--white)',

  '::before': {
    content: '""',
    display: 'block',
    paddingTop: '80%',
  },
})

// 1. Improve vertical alignment of the mana cost within the diamond.
const manaContent = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  transform: 'translateY(-0.08em)', // 1
}

// 1. Static background color for missing cards.
const content = ({ isMissing }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  textAlign: 'center',
  color: isMissing ? '#7d7d7d' : 'var(--white)',

  borderRadius: 'inherit',
  backgroundColor: isMissing ? '#172630' : undefined, // 1
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',

  animationName: { from: { opacity: 0 } },
  animationDuration: '200ms',
  animationDelay: '100ms',
  animationFillMode: 'both',
})

// 1. The element has no content, therefore needs a height.
// 2. Not quite the same as the image itself, but somewhat works.
// 3. Color used through the mask, effectively being the color of the image.
const missing = {
  display: 'block',
  flexGrow: 1, // 2
  width: '70%', // 3
  margin: 'auto',
  backgroundColor: '#0e181f', // 1
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
  WebkitMaskPosition: 'center',
}

// 1. Leave some room at the top of the card, below the mana diamond.
const header = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '4em', // 1
  padding: '0 ' + HORIZONTAL_SPACING,
  textTransform: 'uppercase',
}

const name = {
  fontSize: '165%',
  marginBottom: '0.25em',
}

// 1. Make the race a little less prominent than the header without harcoding
//    a color as it would need to vary from faction to faction.
// 2. Make sure the element always take the same amount of room regardless of
//    whether or not the card has a race.
const race = {
  fontSize: '135%',
  opacity: 0.7, // 1
  minHeight: '1.25em', // 2
}

// 1. Using `max-height` does not work properly in Safari and results in the
//    image not being properly contained despite `object-fit: contain`.
// 2. Add a hue animation to hero cards like in the game.
const imageWrapper = ({ rarity }) => ({
  width: `calc(100% - ${HORIZONTAL_SPACING} * 2)`,
  margin: 'auto',
  height: '42%', // 1

  ...(rarity === 'legendary'
    ? {
        animationName: { to: { filter: 'hue-rotate(360deg)' } }, // 2
        animationDuration: '8000ms',
        animationIterationCount: 'infinite',
      }
    : {}),
})

// 1. Make sure the card doesn’t get distorded despite occupying all available
//    space.
const image = {
  width: '100%',
  objectFit: 'contain', // 1
  maxHeight: '100%',
  margin: 0,
}

const ability = {
  fontSize: '130%',
  marginBottom: '0.5em',
}

// 1. Relative positioning for the absolutely positioned strength and movement
//    markers.
const footer = {
  position: 'relative', // 1
  padding: '0 ' + HORIZONTAL_SPACING,
}

// 1. Every card rarity icon is slightly off-scale and needs to be adjusted,
//    with scale to avoid messing with the card layout.
// 2. “Created” cards (tokens created by Collector Mirz or Harvesters of Souls
//    should not render the rarity however the card layout should remain
//    unchanged, hence why the image is still rendered but visually hidden.
const rarity = ({ isCreated, level }) => ({
  display: 'inline-block',
  objectFit: 'contain',
  margin: '0 auto 0.25em',
  maxHeight: '2em',
  transform: `scale(${[0.71, 1.05, 0.85, 1.15, 1.05][level - 1]})`, // 1
  visibility: isCreated ? 'hidden' : 'visible', // 2
})

const strengthAndMovement = ({ isMissing }) => ({
  position: 'absolute',
  bottom: 0,
  transform: 'translateY(25%)',
  width: '22.5%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  filter: isMissing ? MISSING_FILTER : undefined,
})

const movement = ({
  hasDecreasedMovement,
  hasIncreasedMovement,
  hasFixedMovement,
  isMissing,
}) => ({
  ...strengthAndMovement({ isMissing }),
  color: hasDecreasedMovement
    ? 'var(--light-ironclad)'
    : hasIncreasedMovement
    ? 'var(--affordable)'
    : 'inherit',
  transform: hasFixedMovement ? 'translateY(20%)' : 'translateY(25%)',
  backgroundImage: hasFixedMovement
    ? IMAGES.movement.fixed
    : IMAGES.movement.regular,
  right: '5%',

  '::before': {
    content: '""',
    display: 'block',
    paddingTop: hasFixedMovement ? '139%' : '112%',
  },
})

const strength = ({
  hasDecreasedStrength,
  hasIncreasedStrength,
  type,
  isHero,
  isMissing,
}) => ({
  ...strengthAndMovement({ isMissing }),
  color: hasDecreasedStrength
    ? 'var(--light-ironclad)'
    : hasIncreasedStrength
    ? 'var(--affordable)'
    : 'inherit',
  backgroundImage: isHero
    ? IMAGES.strength.hero
    : type === 'structure'
    ? IMAGES.strength.structure
    : IMAGES.strength.regular,
  left: '5%',

  '::before': {
    content: '""',
    display: 'block',
    paddingTop: '117%',
  },
})

const strengthAndMovementContent = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '270%',
}

const strengthContent = {
  ...strengthAndMovementContent,
}

const movementContent = ({ hasFixedMovement }) => ({
  ...strengthAndMovementContent,
  transform: hasFixedMovement
    ? 'translate(-50%, -30%)'
    : 'translate(-50%, -50%)',
})

// 1. “Created” cards (tokens created by Collector Mirz or Harvesters of Souls
//    should not render the rarity however the card layout should remain
//    unchanged, hence why the image is still rendered but visually hidden.
// 2. Make sure the element always take the same amount of room regardless of
//    whether or not the card has a race.
const level = ({ isCreated, rarity, isMissing }) => ({
  fontSize: '140%',
  textTransform: 'uppercase',
  color: `var(--${rarity || 'common'})`,
  opacity: isMissing ? 0.5 : undefined,
  display: 'block',
  visibility: isCreated ? 'hidden' : 'visible', // 1
  minHeight: '1em', // 2
  marginBottom: '0.3em',
})

const styles = {
  card,
  mana,
  manaContent,
  content,
  missing,
  header,
  name,
  race,
  imageWrapper,
  image,
  ability,
  footer,
  rarity,
  movement,
  strength,
  strengthContent,
  movementContent,
  level,
}

export default styles
