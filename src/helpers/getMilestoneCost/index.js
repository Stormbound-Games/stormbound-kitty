const getMilestoneCost = (milestone, costModifier = 1) => {
  const cost = Math.ceil(Math.ceil(milestone.cost * costModifier) / 5) * 5

  // If there is a discount (cost modifier below 1), but the cost remains the
  // same, force a discount by rounding the cost the other way around.
  if (costModifier < 1 && cost === milestone.cost) {
    return Math.floor(Math.floor(milestone.cost * costModifier) / 5) * 5
  }

  return cost
}

export default getMilestoneCost
