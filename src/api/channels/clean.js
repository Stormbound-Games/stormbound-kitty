const clean = channel => {
  delete channel._createdAt
  delete channel._updatedAt
  delete channel._id
  delete channel._rev
  delete channel._type

  return channel
}

export default clean
