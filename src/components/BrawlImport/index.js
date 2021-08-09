import React from 'react'
import { useFela } from 'react-fela'
import { BrawlContext } from '../BrawlProvider'
import { NotificationContext } from '../NotificationProvider'
import CTA from '../CTA'
import Only from '../Only'
import styles from './styles'

const useFileUpload = onChange => {
  const { restoreBrawls } = React.useContext(BrawlContext)
  const { notify } = React.useContext(NotificationContext)

  return event => {
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
      if (onChange) onChange(null)
    }

    reader.onload = event => {
      try {
        const data = parseCSVData(event.target.result)
        restoreBrawls(data)
        notify({
          icon: 'crown',
          children: 'Your Brawl data has been successfully imported.',
        })
        if (onChange) onChange(data)
      } catch (error) {
        if (onChange) onChange(null)
      }
    }
  }
}

const parseCSVData = data => {
  const items = data.split('\n').slice(1).filter(Boolean)

  return items.map(item => {
    const [id, createdAt, updatedAt, matches] = item.split(',')
    return {
      id,
      createdAt,
      updatedAt,
      matches: matches.split(';'),
    }
  })
}

export default React.memo(function BrawlImport(props) {
  const { css } = useFela()
  const onFileUpload = useFileUpload(props.onChange)

  return (
    <div className={css(styles.container)}>
      <CTA htmlFor='import' as='label'>
        Import<Only.Desktop> Brawl</Only.Desktop>
      </CTA>
      <input
        id='import'
        name='import'
        type='file'
        accept='.csv'
        onChange={onFileUpload}
        className={css(styles.file)}
        data-testid='import-brawl-btn'
      />
    </div>
  )
})
