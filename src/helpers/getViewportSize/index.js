const getViewportSize = () => {
  const html = document.documentElement

  return {
    viewportWidth: Math.max(html.clientWidth, window.innerWidth || 0),
    viewportHeight: Math.max(html.clientHeight || 0, window.innerHeight || 0),
  }
}

export default getViewportSize
