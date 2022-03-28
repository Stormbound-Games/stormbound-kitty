const getEffectiveSpeed = card => {
  switch (card.id) {
    // Doppelbocks effectively advances the frontline.
    case 'S1':
      return 1
    // Rockworkers has an average speed of ~0.32. Out of the 16 slots it can be
    // played on, 2 of them have 50% chance of moving the line, 6 of them have
    // 25% chance of moving the line and 8 of them have 33% chance of moving the
    // line.
    case 'W13':
      return (2 * (1 / 2) + 6 * (1 / 4) + 8 * (1 / 3)) / 16
    // Iceflakes not only does not have initial movement, but it’s also frozen
    // for a turn, which essentially negate its natural movement from the next
    // turn.
    case 'W31':
      return -0.5
    // Dreadfauns has an average speed of about 0.625. Out of the 16 tiles it
    // can be played on, 2 of them always move the line (corners), 8 of them
    // have 2 chances out of 3 to move the line (edges), and the 6 remaining
    // ones have 1 chance out of 2 to move the line (middle).
    case 'S16':
      return 0.625
    // Wild Saberpaws can have 0, 1 or 2 speed based on whether they are played
    // with bordering or surrounding units, so we consider an average speed of
    // 1.
    case 'N67':
      return 1
    // Sparkly Kitties do not have initial movement but gain 2 speed after conf-
    // using itself, so moves up 1 cell at most.
    case 'N86':
      return 1
    // Twilight Prowlers are typically played on the base line to gain speed and
    // it’s very uncommon to not be able to play on the base line, so for all
    // intents and purposes, they have 3 movement.
    case 'N68':
      return 3
    // Eloth the Ignited can move from 0 to 5 tiles depending on the enemy’s
    // position and strength, so on average we estimate it can move halfway
    // through the board.
    case 'I17':
      return (0 + 1 + 2 + 3 + 4 + 5) / 6
    default:
      return card.movement || 0
  }
}

export default getEffectiveSpeed
