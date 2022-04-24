// 1. The dialog for Harvesters of Souls’ card pick displays up to 4 cards next
//    to each other and therefore needs to be larger than a regular dialog.
const content = {
  width: '750px', // 1
}

// 1. Because dialog for Harvesters of Souls’ card pick display cards, it needs
//    a bit more spacing than for text content to not look too crowded.
const body = {
  padding: 'var(--s-large)', // 1
}

// 1. Horizontally centers the cards within the dialog.
const list = {
  justifyContent: 'center', // 1
}

// 1. Make sure the cards do not take too much width, otherwise they would
//    proportionally grow the dialog’s.
const item = {
  maxWidth: '160px', // 1
}

const styles = { content, body, list, item }

export default styles
