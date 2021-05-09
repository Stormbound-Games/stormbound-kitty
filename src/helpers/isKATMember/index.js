const isKATMember = ({ donations = [], contributions = [] }) => {
  const isKAT = donations.length > 0 || contributions.length > 0
  const isSuperKAT = donations.length > 1

  return { isKAT, isSuperKAT }
}

export default isKATMember
