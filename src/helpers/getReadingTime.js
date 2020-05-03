const getReadingTime = content => {
  const words = content.split(/\s+/g).length

  return words < 360 ? '1 minute' : `${Math.floor(words / (360 / 2))} minutes`
}

export default getReadingTime
