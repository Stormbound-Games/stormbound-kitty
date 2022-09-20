import hrStyles from '../HorizontalRule/styles.js'

const disclaimer = {
  color: 'var(--beige)',

  '::before': {
    ...hrStyles.rule,
    content: '""',
    display: 'block',
    marginBottom: 'var(--s-large)',
  },

  '::after': {
    ...hrStyles.rule,
    content: '""',
    display: 'block',
    marginTop: 'var(--s-large)',
  },
}

const styles = { disclaimer }

export default styles
