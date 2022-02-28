const clean = guide => {
  const [year, month] = guide.date.split(/[-/]/g)

  guide.date = month + '/' + year
  guide.slug = guide.slug.current
  guide.cardId = guide.card ? guide.card.id : null
  console.log(guide.card)
  if (guide.background) {
    if (typeof guide.background.ratio === 'number') {
      guide.ratio = guide.background.ratio + '%'
    }
    guide.background = guide.background.asset.url || null
  }

  delete guide.card
  delete guide._createdAt
  delete guide._updatedAt
  delete guide._id
  delete guide._rev
  delete guide._type

  return guide
}

export default clean
