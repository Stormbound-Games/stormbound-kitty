import getWikiCardLink from '~/helpers/getWikiCardLink'
import isCardOfficial from '~/helpers/isCardOfficial'
import { formatPreciseDate } from '~/helpers/formatDate'

const usePageProps = (props, versionId) => {
  const properties = {}
  const isEditing = props.mode === 'EDITOR'
  const { name, faction, type, race } = props.card
  const id = props.cardId

  if (isCardOfficial(id)) {
    const date = versionId ? 'Prior ' + formatPreciseDate(+versionId) : null
    const wiki = getWikiCardLink(name)

    properties.meta = [faction, type, race, date].filter(Boolean).join(' · ')
    properties.action = isEditing
      ? { to: `/card/${id}/display`, children: 'Display view', icon: 'eye' }
      : { href: wiki, children: 'Open in wiki' }
  } else if (props.contest) {
    const { id, season, winner } = props.contest

    properties.meta = `Week #${id} (season ${season})`
    properties.author = winner.author
    properties.action = { to: '/card/contest', children: 'Back to SWCC' }
  } else if (id) {
    const to = `/card/${id}` + (isEditing ? '/display' : '')
    const label = isEditing ? 'Display view' : 'Edit card'
    const icon = isEditing ? 'eye' : undefined

    properties.meta = [faction, type, race].filter(Boolean).join(' · ')
    properties.action = { to, children: label, icon }
  }

  return properties
}

export default usePageProps
