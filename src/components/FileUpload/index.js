import React from 'react'
import { useFela } from 'react-fela'
import styles from './styles'

const identity = value => value

const handleFileUpload =
  ({ onSuccess = identity, onError = identity, process = identity }) =>
  event => {
    const { nativeEvent } = event
    const file = nativeEvent.file
      ? new File([nativeEvent.file.data], nativeEvent.file.name, {
          type: nativeEvent.file.type,
        })
      : event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    try {
      reader.readAsText(file)
    } catch (error) {
      onError(error)
    }

    reader.onload = event => {
      try {
        onSuccess(process(event.target.result))
      } catch (error) {
        onError(error)
      }
    }
  }

export default React.memo(function FileUpload(props) {
  const { css } = useFela()
  const id = props.id || 'import'

  return (
    <input
      id={id}
      name={props.name || id}
      type='file'
      accept={props.accept || '.csv'}
      onChange={handleFileUpload(props)}
      className={css(styles.file)}
      data-testid={props['data-testid']}
    />
  )
})
