const download = ({
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

    // When running in Cypress, do not click and remove the link as the
    // `exportFile` command is doing something similar.
    if (!window.Cypress) {
      a.click()
      a.remove()
    } else {
      a.setAttribute('data-testid', 'export-blob')
    }
  } else {
    window.location.href =
      'data:application/octet-stream,' + encodeURIComponent(content)
  }
}

export default download
