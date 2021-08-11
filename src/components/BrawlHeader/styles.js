const meta = {
  marginTop: '-3.5em',
  textTransform: 'uppercase',
  color: 'var(--beige)',
  fontSize: '90%',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: '4em',
  textAlign: 'center',

  medium: {
    marginTop: '-2em',
    marginBottom: '3em',
    display: 'flex',
    fontSize: '120%',
  },
}

const backLink = {
  textDecoration: 'none',
  flex: '1 0 100%',
  marginTop: '0.5em',
  fontSize: '80%',

  '::before': {
    content: '← ',
  },

  ':hover': {
    textDecoration: 'underline',
  },

  medium: {
    marginLeft: 'auto',
    flex: '0 0 auto',
    marginTop: 0,
    fontSize: '100%',
  },
}

export default { meta, backLink }
