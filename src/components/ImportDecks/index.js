import React from 'react'
import { PersonalDecksContext } from '~/components/PersonalDecksProvider'
import { NotificationContext } from '~/components/NotificationProvider'
import CTA from '~/components/CTA'
import Only from '~/components/Only'
import FileUpload from '~/components/FileUpload'
import uuid from '~/helpers/uuid'
import capitalize from '~/helpers/capitalize'
import chunk from '~/helpers/chunk'

const parseCSVData = data => {
  return data
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map(item => {
      // prettier-ignore
      const [id, name, /* faction */, tagString] = item.split(',')
      // Tags used to be split on spaces which is an issue since their label
      // part can contain spaces (e.g `HIGH_LEVELS/High Levels`). This fix
      // captures groups of a constant case followed by a slash, then group
      // results by chunks of 2 ([ID, label]). This is ugly, but this way we
      // don’t break any existing CSV and solve the issue with a parsing rule.
      const tags = chunk(
        tagString
          .split(/([A-Z_]+)\//)
          .map(value => value.trim())
          .filter(Boolean),
        2
      )

      return {
        id,
        name,
        tags: tags.map(([slug, name]) => ({
          slug,
          name: name || slug.toLowerCase().split('_').map(capitalize).join(' '),
        })),
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
