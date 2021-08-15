import React from 'react'
import { BrawlContext } from '../BrawlProvider'
import { NotificationContext } from '../NotificationProvider'
import CTA from '../CTA'
import FileUpload from '../FileUpload'
import Only from '../Only'

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

const notification = {
  icon: 'crown',
  children: 'Your Brawl data has been successfully imported.',
}

export default React.memo(function BrawlImport(props) {
  const { restoreBrawls } = React.useContext(BrawlContext)
  const { notify } = React.useContext(NotificationContext)
  const { onChange } = props

  const handleSuccess = React.useCallback(
    data => {
      restoreBrawls(data)
      notify(notification)
      if (typeof onChange === 'function') onChange(data)
    },
    [onChange, restoreBrawls, notify]
  )

  return (
    <FileUpload
      id='import'
      process={parseCSVData}
      onSuccess={handleSuccess}
      data-testid='import-brawl-btn'
    >
      <CTA htmlFor='import' as='label'>
        Import<Only.Desktop> Brawl</Only.Desktop>
      </CTA>
    </FileUpload>
  )
})
