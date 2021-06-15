const getMilestoneCost = (milestone, costModifier = 1) => {
  // In some instances, the Premium Pass discount is artificially reduced or
  // increased to yield a certain result. Since it is not possible to retreive
  // the exact in-game cost from the usual formula, some milestones have a
  // hard-coded Premium Pass cost.
  if (costModifier === 0.9 && typeof milestone.ppCost === 'number')
    return milestone.ppCost

  const cost = Math.ceil(Math.ceil(milestone.cost * costModifier) / 5) * 5

  // If there is a discount (cost modifier below 1), but the cost remains the
  // same, force a discount by rounding the cost the other way around.
  if (costModifier < 1 && cost === milestone.cost) {
    return Math.floor(Math.floor(milestone.cost * costModifier) / 5) * 5
  }

  return cost
}

export default getMilestoneCost
