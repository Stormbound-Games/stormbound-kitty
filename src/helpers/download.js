export default ({
  content,
  fileName,
  mimeType = 'application/octet-stream',
  blob = true,
}) => {
  const a = document.createElement('a')

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(new Blob([content], { type: mimeType }), fileName)
  } else if (URL && 'download' in a) {
    a.href = blob
      ? URL.createObjectURL(new Blob([content], { type: mimeType }))
      : content
    a.setAttribute('download', fileName)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } else {
    window.location.href =
      'data:application/octet-stream,' + encodeURIComponent(content)
  }
}
