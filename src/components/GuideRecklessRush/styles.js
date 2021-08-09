const caption = {
  fontSize: '80%',
  color: 'var(--beige)',
  marginTop: '1em',
}

const cell = ({ type }) => ({
  padding: '3px',
  backgroundClip: 'content-box',
  borderRadius: '8px',

  ...(type === 'Devastators' && {
    backgroundColor: 'rgba(231, 76, 60, 0.6)',
  }),

  ...(type === 'Snowmasons' && {
    backgroundColor: 'rgba(46, 204, 113, 0.6)',
  }),

  ...(type === 'guardians' && {
    background:
      'linear-gradient(to top left, rgba(52, 152, 219, 0.6) 50%, rgba(46, 204, 113, 0.6) 50%)',
  }),
})

const legend = {
  '::before': {
    content: '""',
    width: '0.8em',
    height: '0.8em',
    display: 'inline-block',
    transform: 'rotate(45deg)',
    margin: '0 0.5em',
    border: '1px solid var(--beige)',
    boxSizing: 'border-box',
  },

  ':nth-of-type(1)::before': { backgroundColor: 'rgba(231, 76, 60, 1)' },
  ':nth-of-type(2)::before': { backgroundColor: 'rgba(52, 152, 219, 1)' },
  ':nth-of-type(3)::before': { backgroundColor: 'rgba(46, 204, 113, 1)' },
}

export default { caption, legend, cell }
