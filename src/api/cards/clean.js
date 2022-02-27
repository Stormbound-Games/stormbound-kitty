const clean = card => {
  card.image = card.image.asset.url + '?auto=format'
  card.movement = +card.movement
  card.ability = card.ability || null

  delete card._createdAt
  delete card._updatedAt
  delete card._id
  delete card._rev
  delete card._type

  return card
}

export default clean
