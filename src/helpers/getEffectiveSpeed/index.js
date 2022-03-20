const getEffectiveSpeed = card => {
  switch (card.id) {
    // Doppelbocks effectively advances the frontline.
    case 'S1':
      return 1
    case 'W31':
      // Iceflakes not only does not have initial movement, but it’s also frozen
      // for a turn, which essentially negate its natural movement from the next
      // turn.
      return -0.5
    case 'S16':
      // Dreadfauns has an average speed of about 0.5. Out of the 16 slots it
      // can be played, 2 of them always move the line (corners), 8 of them have
      // 2 chances out of 3 to move the line (edges), and the 6 remaining ones
      // have 1 chance out of 2 to move the line (middle).
      return 0.625
    case 'N67':
      // Wild Saberpaws can have 0, 1 or 2 speed based on whether they are
      // played with bordering or surrounding units, so we consider an average
      // speed of 1.
      return 1
    // Sparkly Kitties do not have initial movement but gain 2 speed after conf-
    // using itself, so moves up 1 cell at most.
    case 'N86':
      return 1
    case 'I17':
      // Eloth the Ignited has 0 base movement, but can be used to move in front
      // of the first enemy (and then 1 extra tile if it kills it), so we
      // consider an average of 2.
      return 2
    case 'N89':
      // Erratic Neglects have 1 chance out of 5 to freeze themselves before
      // moving, therefore their effective speed is 0.8.
      return 0.8
    default:
      return card.movement || 0
  }
}

export default getEffectiveSpeed
