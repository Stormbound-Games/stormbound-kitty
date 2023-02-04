import { MdGrading, MdSettings } from 'react-icons/md'
import Iframe from 'sanity-plugin-iframe-pane'
import { isAdmin, COMMUNITY_TYPES } from './access'
import preview from './productionUrl'
import { getOrderingFields } from './schema'

const getViews = (S, context) => [
  S.view.form(),
  S.view
    .component(Iframe)
    .options({
      url: document => preview(null, { ...context, document }),
      reload: { button: true, revision: true },
    })
    .title('Preview'),
]

const createSingleton = (title, name, icon) => (S, context) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document().views(getViews(S, context)).schemaType(name).documentId(name)
    )

const EqualTierList = createSingleton(
  'Equal tier list',
  'equalTierList',
  MdGrading
)

const SiteSettings = createSingleton(
  'Site settings',
  'siteSettings',
  MdSettings
)

export const SINGLETON_TYPES = ['siteSettings', 'equalTierList']

const structure = (S, context) => {
  const sortByTitle = (a, b) => a.getTitle().localeCompare(b.getTitle())
  const isNotSingleton = listItem => !SINGLETON_TYPES.includes(listItem.getId())
  const isCommunity = listItem => COMMUNITY_TYPES.includes(listItem.getId())

  const roles = context.currentUser?.roles
  const admin = isAdmin(roles)

  const items = S.documentTypeListItems()
    .filter(isNotSingleton)
    .concat([EqualTierList(S, context), SiteSettings(S, context)])

  if (admin) {
    return S.list()
      .title('Content')
      .items([
        ...items.sort(sortByTitle),
        S.divider(),
        ...getOrderingFields(S, context),
      ])
  }

  return S.list()
    .title('Community Content')
    .items(items.filter(isCommunity).sort(sortByTitle))
}

export const defaultDocumentNode = (S, context) =>
  S.document().views(getViews(S, context))

export default structure
