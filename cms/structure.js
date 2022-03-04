import { MdGrading, MdSettings } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'

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

export default structure
