const roundToUpper5 = value => Math.ceil(Math.ceil(value) / 5) * 5
const roundToLower5 = value => Math.floor(Math.floor(value) / 5) * 5

const getMilestoneCost = (milestone, costModifier = 1) => {
  // In some instances, the Premium Pass discount is artificially reduced or
  // increased to yield a certain result. Since it is not possible to retreive
  // the exact in-game cost from the usual formula, some milestones have a
  // hard-coded Premium Pass cost.
  if (costModifier === 0.9 && typeof milestone.ppCost === 'number')
    return milestone.ppCost

  const cost = milestone.cost * costModifier
  const discountedCost = roundToUpper5(cost)

  // If there is a discount (cost modifier below 1), but the discounted cost
  // remains the same as the original cost, force a discount by rounding the
  // cost the other way around. That is, unless it would yield `0`, in which
  // case keep the original cost as it is. This is because it was decided that
  // only the very first milestone should be free.
  if (costModifier < 1 && discountedCost === milestone.cost) {
    return roundToLower5(cost) || discountedCost
  }

  return discountedCost
}

export default getMilestoneCost
