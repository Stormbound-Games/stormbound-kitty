import capitalise from '../capitalise'

const getBookName = id => id.toLowerCase().split('_').map(capitalise).join(' ')

export default getBookName
