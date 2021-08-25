const cell = ({ type }) => ({
  padding: '3px',
  backgroundClip: 'content-box',
  borderRadius: '8px',

  ...(type === 'Devastators'
    ? {
        backgroundColor: '#e74c3c99',
      }
    : {}),

  ...(type === 'Snowmasons'
    ? {
        backgroundColor: '#2ecc7199',
      }
    : {}),

  ...(type === 'guardians'
    ? {
        backgroundImage:
          'linear-gradient(to top left, #3498db99 50%, #2ecc7199 50%)',
      }
    : {}),
})

const legend = {
  '::before': {
    content: '""',
    width: '0.8em',
    height: '0.8em',
    display: 'inline-block',
    transform: 'rotate(45deg)',
    margin: '0 var(--s-smaller)',
    border: '1px solid var(--beige)',
    boxSizing: 'border-box',
  },

  ':nth-of-type(1)::before': { backgroundColor: '#e74c3c' },
  ':nth-of-type(2)::before': { backgroundColor: '#3498db' },
  ':nth-of-type(3)::before': { backgroundColor: '#2ecc71' },
}

const styles = { legend, cell }

export default styles
