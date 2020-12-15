const getCalendarValue = (rewards, type = 'FREE') => {
  return rewards.reduce((acc, day) => {
    const [free, premium] = day

    if (typeof acc[free.reward] === 'undefined') {
      acc[free.reward] = 0
    }

    acc[free.reward] += free.amount

    if (type === 'PREMIUM') {
      if (typeof acc[premium.reward] === 'undefined') {
        acc[premium.reward] = 0
      }

      acc[premium.reward] += premium.amount
    }

    return acc
  }, {})
}

export default getCalendarValue
