// Essentially a take on FIDE’s elo rating system.
// See: https://en.wikipedia.org/wiki/Elo_rating_system
const getHeroScore = ({ current: Sa, opponent: Sb, coefficient: K, won }) => {
  // This is the difference between the two players’ score, capped at 400 to
  // avoid too much fluctuation in case of uneven matchmaking.
  const diff = Math.min(won ? Sa - Sb : Sb - Sa, 400)
  const deviation = 1 / (1 + 10 ** (diff / 400))

  return Sa + K * deviation * (won ? 1 : -1)
}

export default getHeroScore
