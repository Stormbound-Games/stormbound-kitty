const list = ({ cards }) => ({
  fontSize: '120%',

  [`> li:nth-child(-n+${cards.length})`]: {
    textDecoration: 'line-through',
    opacity: 0.6,
  },
})

const styles = { list }

export default styles
