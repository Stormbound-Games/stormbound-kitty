const clean = wallpaper => {
  delete wallpaper._createdAt
  delete wallpaper._updatedAt
  delete wallpaper._id
  delete wallpaper._rev
  delete wallpaper._type

  return wallpaper
}

export default clean
