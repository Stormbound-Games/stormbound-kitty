const getDeckIDFromURL = url =>
  url
    .replace('https://stormbound-kitty.com/deck/', '')
    .replace('/detail', '')
    .replace('/dry-run', '')
    .replace('/tracker', '')

export default getDeckIDFromURL
