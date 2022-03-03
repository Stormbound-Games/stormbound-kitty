import S from '@sanity/desk-tool/structure-builder'

const structure = () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
      ...S.documentTypeListItems().filter(
        listItem => !['siteSettings'].includes(listItem.getId())
      ),
    ])

export default structure
