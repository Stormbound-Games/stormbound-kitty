import S from '@sanity/base/structure-builder'
import { isAdmin, COMMUNITY_STRUCTURE, SINGLETON_TYPES } from './structure'

const newDocumentMenu = S.defaultInitialValueTemplateItems().filter(
  template =>
    !SINGLETON_TYPES.includes(template.spec.id) &&
    (isAdmin() || COMMUNITY_STRUCTURE.includes(template.spec.id))
)

export default newDocumentMenu
