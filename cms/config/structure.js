import { MdGrading, MdSettings } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'
import tools from 'all:part:@sanity/base/tool'
import userStore from 'part:@sanity/base/user'
import Iframe from 'sanity-plugin-iframe-pane'
import { isAdmin, isNotAdmin } from '~/helpers/sanityRoles'
import preview from './previewer'

const getCurrentUser = () => {
  userStore.me.subscribe(user => {
    window._sanityUser = user || undefined

    // Hide all tools but the desk.
    if (isNotAdmin({ currentUser: user })) tools.splice(1)
  })
}

getCurrentUser()

// Document types that can be managed by moderators and community members.
// Anything not listed underneath will be restricted to administrators only.
export const COMMUNITY_TYPES = [
  'artwork',
  'equalTierList',
  'podcast',
  'deck',
  'deckTag',
  'guide',
  'puzzle',
  'story',
  'SWCC',
  'tournament',
  'user',
]

const EqualTierList = S.listItem()
  .title('Equal tier list')
  .icon(MdGrading)
  .child(S.document().schemaType('equalTierList').documentId('equalTierList'))
const SiteSettings = S.listItem()
  .title('Site settings')
  .icon(MdSettings)
  .child(S.document().schemaType('siteSettings').documentId('siteSettings'))

// Types that are manually added to the structure as they are singleton
// documents.
export const SINGLETON_TYPES = [EqualTierList.getId(), SiteSettings.getId()]

const sortByTitle = (a, b) => a.getTitle().localeCompare(b.getTitle())
const isNotSingleton = listItem => !SINGLETON_TYPES.includes(listItem.getId())
const isCommunity = listItem => COMMUNITY_TYPES.includes(listItem.getId())
const isAdministrative = listItem => !COMMUNITY_TYPES.includes(listItem.getId())

const COMMUNITY_ITEMS = S.documentTypeListItems()
  .filter(isNotSingleton)
  .filter(isCommunity)
  .concat([EqualTierList])
  .sort(sortByTitle)
const ADMIN_ITEMS = S.documentTypeListItems()
  .filter(isNotSingleton)
  .filter(isAdministrative)
  .concat([SiteSettings])
  .sort(sortByTitle)

const structure = () => {
  const admin = isAdmin({ currentUser: window._sanityUser })
  const title = admin ? 'Content' : 'Community content'

  return S.list()
    .title(title)
    .items([...COMMUNITY_ITEMS, S.divider(), ...(admin ? ADMIN_ITEMS : [])])
}

export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: doc => preview(doc),
        reload: { button: true, revision: true },
      })
      .title('Preview'),
  ])
}

export default structure
