import S from '@sanity/base/structure-builder'
import { isAdmin, COMMUNITY_TYPES, SINGLETON_TYPES } from './structure'

const newDocumentMenu = S.defaultInitialValueTemplateItems().filter(
  template =>
    !SINGLETON_TYPES.includes(template.spec.id) &&
    (isAdmin() || COMMUNITY_TYPES.includes(template.getId()))
)

export default newDocumentMenu
