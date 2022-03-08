import React from 'react'
import { PersonalDecksContext } from '~/components/PersonalDecksProvider'
import { NotificationContext } from '~/components/NotificationProvider'
import CTA from '~/components/CTA'
import Only from '~/components/Only'
import FileUpload from '~/components/FileUpload'
import uuid from '~/helpers/uuid'

const parseCSVData = data => {
  return data
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map(item => {
      // prettier-ignore
      const [id, name, /* faction */, tags] = item.split(',')
      return {
        id,
        name,
        tags: tags.split(' ').map(tag => {
          const [slug, name = slug] = tag.split('/')
          return { slug, name }
        }),
        uuid: uuid(),
      }
    })
}

const notification = {
  icon: 'stack',
  children: 'Your decks have been successfully imported.',
}

export default React.memo(function ImportDecks(props) {
  const { setDecks } = React.useContext(PersonalDecksContext)
  const { notify } = React.useContext(NotificationContext)
  const { onChange } = props

  const handleSuccess = React.useCallback(
    data => {
      setDecks(data)
      notify(notification)
      if (typeof onChange === 'function') onChange(data)
    },
    [onChange, notify, setDecks]
  )

  return (
    <CTA as='label' htmlFor='import' isFullWidthOnMobile>
      Import<Only.Desktop> decks</Only.Desktop>
      <FileUpload
        id='import'
        process={parseCSVData}
        onSuccess={handleSuccess}
        data-testid='import-decks-btn'
      />
    </CTA>
  )
})
