export const getLooseActiveLink = ({ isCurrent, isPartiallyCurrent }) => ({
  className: [
    'Header__link',
    (isCurrent || isPartiallyCurrent) && 'Header__link--active'
  ]
    .filter(Boolean)
    .join(' ')
})

export const getStrictActiveLink = ({ isCurrent }) => ({
  className: ['Header__link', isCurrent && 'Header__link--active']
    .filter(Boolean)
    .join(' ')
})
