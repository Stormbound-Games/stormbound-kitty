import React from 'react'
import CTA from '~/components/CTA'
import Only from '~/components/Only'
import { NotificationContext } from '~/components/NotificationProvider'
import download from '~/helpers/download'
import track from '~/helpers/track'

export default React.memo(function BrawlExport(props) {
  const { notify: sendNotification } = React.useContext(NotificationContext)

  const notify = React.useCallback(
    message => sendNotification({ icon: 'crown', children: message }),
    [sendNotification]
  )

  const formatBrawlAsCSV = () => {
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
      content: formatBrawlAsCSV(),
      fileName: 'stormbound_brawl.csv',
      mimeType: 'text/csv;encoding:utf-8',
    })
    notify('Your Brawl data has been successfully exported.')
    track('export_brawl_data')
  }

  return (
    <CTA
      onClick={exportBrawl}
      data-testid='export-brawl-btn'
      isFullWidthOnMobile
    >
      Export<Only.Desktop> Brawl</Only.Desktop>
    </CTA>
  )
})
