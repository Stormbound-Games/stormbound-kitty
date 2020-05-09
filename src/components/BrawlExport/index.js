import React from 'react'
import CTA from '../CTA'
import Only from '../Only'
import { NotificationContext } from '../NotificationProvider'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import download from '../../helpers/download'

export default React.memo(function BrawlExport(props) {
  const { brawl } = React.useContext(PersonalDecksContext)
  const { notify: sendNotification } = React.useContext(NotificationContext)

  const notify = React.useCallback(
    message => sendNotification({ icon: 'crown', children: message }),
    [sendNotification]
  )

  const formatBrawlAsCSV = decks => {
    const brawls = Object.keys(localStorage)
      .filter(key => key.startsWith('sk.brawl.'))
      .map(key => JSON.parse(localStorage.getItem(key)))
      .flat()
      .filter(brawl => brawl.matches.length)

    const headers = ['id', 'createdAt', 'updatedAt', 'matches']
    const data = [
      headers,
      ...brawls.map(brawl => [
        brawl.id,
        brawl.createdAt,
        brawl.updatedAt,
        brawl.matches.join(';'),
      ]),
    ].join('\n')

    return data
  }

  const exportBrawl = () => {
    download({
      content: formatBrawlAsCSV(brawl),
      fileName: 'stormbound_brawl.csv',
      mimeType: 'text/csv;encoding:utf-8',
    })
    notify('Your Brawl data has been successfully exported.')
  }

  return (
    <CTA onClick={exportBrawl} data-testid='export-brawl-btn'>
      Export<Only.Desktop> Brawl</Only.Desktop>
    </CTA>
  )
})
