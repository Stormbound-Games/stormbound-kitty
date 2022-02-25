import hrStyles from '~/components/HorizontalRule/styles'

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
