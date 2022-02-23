const clean = avatar => {
  delete avatar._createdAt
  delete avatar._updatedAt
  delete avatar._rev
  delete avatar._type

  return avatar
}

export default clean
