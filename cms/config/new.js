import S from '@sanity/base/structure-builder'
import { COMMUNITY_TYPES, SINGLETON_TYPES } from './structure'
import { isAdmin } from '~/helpers/sanityRoles'

const newDocumentMenu = S.defaultInitialValueTemplateItems().filter(
  template =>
    !SINGLETON_TYPES.includes(template.spec.id) &&
    (isAdmin() || COMMUNITY_TYPES.includes(template.getId()))
)

export default newDocumentMenu
