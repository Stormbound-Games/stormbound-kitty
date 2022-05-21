const isNotAdmin = ({ currentUser }) =>
  !currentUser.roles.some(role => role.name === 'administrator')

export default isNotAdmin
