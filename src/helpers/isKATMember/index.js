const isKATMember = ({ member = '', donations = [], contributions = [] }) => {
  const isKAT = donations.length > 0 || contributions.length > 0
  const isSuperKAT = donations.length > 1
  const roles = { isKAT, isSuperKAT }

  if (member.toLowerCase() === 'kitty') {
    roles.isActualKAT = true
  }

  return roles
}

export default isKATMember
