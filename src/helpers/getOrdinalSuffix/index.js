const getOrdinalSuffix = number => {
  const m10 = number % 10
  const m100 = number % 100

  if (m10 === 1 && m100 !== 11) return number + 'st'
  if (m10 === 2 && m100 !== 12) return number + 'nd'
  if (m10 === 3 && m100 !== 13) return number + 'rd'

  return number + 'th'
}

export default getOrdinalSuffix
