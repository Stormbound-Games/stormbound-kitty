const getPathname = url => {
  try {
    return new URL(url).pathname
  } catch (error) {
    return null
  }
}

export default getPathname
