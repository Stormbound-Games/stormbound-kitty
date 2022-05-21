export const isNotAdmin = payload => !isAdmin(payload)
export const isAdmin = ({ currentUser = window._sanityUser } = {}) =>
  currentUser?.role === 'administrator' ||
  currentUser?.roles.some(role => role.name === 'administrator')
