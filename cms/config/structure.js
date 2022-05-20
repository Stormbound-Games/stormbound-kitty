import { MdGrading, MdSettings } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'
import userStore from 'part:@sanity/base/user'
import Iframe from 'sanity-plugin-iframe-pane'
import preview from './previewer'

const getCurrentUser = () => {
  userStore.me.subscribe(user => {
    window._sanityUser = user || undefined
  })
}

getCurrentUser()

// Document types that can be managed by moderators and community members.
// Anything non listed underneath will be restricted to administrators only.
const COMMUNITY_STRUCTURE = [
  'artwork',
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

const structure = () => {
  const isAdmin = window._sanityUser?.role === 'administrator'

  return S.list()
    .title('Content')
    .items(
      [
        isAdmin &&
          S.listItem()
            .title('Site settings')
            .icon(MdSettings)
            .child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
        S.listItem()
          .title('Equal tier list')
          .icon(MdGrading)
          .child(
            S.document().schemaType('equalTierList').documentId('equalTierList')
          ),
        ...S.documentTypeListItems().filter(listItem => {
          const id = listItem.getId()

          return isAdmin
            ? !['siteSettings', 'equalTierList'].includes(id)
            : COMMUNITY_STRUCTURE.includes(id)
        }),
      ].filter(Boolean)
    )
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
