const sortSaga = (a, b) => {
  const indexA = parseInt(a.title, 10)
  const indexB = parseInt(b.title, 10)

  return isNaN(indexA) || isNaN(indexB) ? 0 : indexA - indexB
}

export default sortSaga
