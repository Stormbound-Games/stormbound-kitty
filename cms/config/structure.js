import { MdGrading, MdSettings } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'
import Iframe from 'sanity-plugin-iframe-pane'
import { getCurrentUser, isAdmin, COMMUNITY_TYPES } from './access'
import preview from './previewer'

getCurrentUser()

// Define the `lang` attribute manually as Sanity doesn’t set it.
document.documentElement.lang = 'en'

const VIEWS = [
  S.view.form(),
  S.view
    .component(Iframe)
    .options({
      url: doc => preview(doc),
      reload: { button: true, revision: true },
    })
    .title('Preview'),
]

const EqualTierList = S.listItem()
  .title('Equal tier list')
  .icon(MdGrading)
  .child(
    S.document()
      .views(VIEWS)
      .schemaType('equalTierList')
      .documentId('equalTierList')
  )
const SiteSettings = S.listItem()
  .title('Site settings')
  .icon(MdSettings)
  .child(
    S.document()
      .views(VIEWS)
      .schemaType('siteSettings')
      .documentId('siteSettings')
  )

// Types that are manually added to the structure as they are singleton
// documents.
const SINGLETONS = [EqualTierList, SiteSettings]
export const SINGLETON_TYPES = SINGLETONS.map(type => type.getId())

const sortByTitle = (a, b) => a.getTitle().localeCompare(b.getTitle())
const isNotSingleton = listItem => !SINGLETON_TYPES.includes(listItem.getId())
const isCommunity = listItem => COMMUNITY_TYPES.includes(listItem.getId())

const structure = () => {
  const admin = isAdmin({ currentUser: window._sanityUser })
  const items = S.documentTypeListItems()
    .filter(isNotSingleton)
    .concat(SINGLETONS)

  if (admin) {
    return S.list().title('Content').items(items.sort(sortByTitle))
  }

  return S.list()
    .title('Community Content')
    .items(items.filter(isCommunity).sort(sortByTitle))
}

export const getDefaultDocumentNode = () => S.document().views(VIEWS)

export default structure
