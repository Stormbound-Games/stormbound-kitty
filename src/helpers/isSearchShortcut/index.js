const isSearchShortcut = event => {
  const { key, metaKey } = event
  const isTyping = ['TEXTAREA', 'INPUT'].includes(
    document.activeElement.tagName
  )

  return (!isTyping && key === '/') || (metaKey && key === 'k')
}

export default isSearchShortcut
