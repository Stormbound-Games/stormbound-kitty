import { MdGrading, MdSettings } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'
import Iframe from 'sanity-plugin-iframe-pane'
import preview from './previewer'

const structure = () =>
  S.list()
    .title('Content')
    .items([
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
      ...S.documentTypeListItems().filter(
        listItem =>
          !['siteSettings', 'equalTierList'].includes(listItem.getId())
      ),
    ])

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
