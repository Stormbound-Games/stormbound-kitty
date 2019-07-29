export default data => {
  const encodedData = encodeURIComponent(data)
  const url = window.location.pathname + '#/' + encodedData

  window.history.pushState(null, '', url)
}
