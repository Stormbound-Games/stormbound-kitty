import S from '@sanity/base/structure-builder'
import { SINGLETON_TYPES } from './structure'
import { isAdmin, COMMUNITY_TYPES } from './access'

const newDocumentMenu = S.defaultInitialValueTemplateItems().filter(
  template =>
    !SINGLETON_TYPES.includes(template.spec.id) &&
    (isAdmin() || COMMUNITY_TYPES.includes(template.getId()))
)

export default newDocumentMenu
