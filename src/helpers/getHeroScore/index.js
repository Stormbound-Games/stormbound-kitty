const getHeroScore = ({ current, opponent, coefficient, won }) => {
  const Ro = current
  const K = Number(coefficient)
  const W = Number(won)
  const dr = Math.min(Ro - opponent, 400)
  const We = 1 / (Math.pow(10, -1 * (dr / 400)) + 1)
  const Rn = Ro + K * (W - We)

  return Rn
}

export default getHeroScore
