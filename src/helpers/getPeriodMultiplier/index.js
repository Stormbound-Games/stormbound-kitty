const getMultiplier = period => {
  switch (period) {
    case 'YEARLY':
      return 365.25
    case 'MONTHLY':
      return 365.25 / 12
    case 'WEEKLY':
      return 7
    case 'DAILY':
    default:
      return 1
  }
}

export default getMultiplier
