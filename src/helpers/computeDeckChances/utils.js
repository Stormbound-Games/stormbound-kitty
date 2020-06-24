export const addArrayValues = (a, b) =>
  a.map((entry, index) => entry + (b[index] || 0))

export const subtractArrayValues = (a, b) =>
  a.map((entry, index) => entry - (b[index] || 0))

export const findMaxInArrays = (a, b) =>
  a.map((entry, index) => Math.max(entry, b[index] || 0))

export const replaceInArray = (a, b) =>
  a.map((entry, index) => (typeof b[index] !== 'undefined' ? b[index] : entry))

export const incrementArrayValues = (array, value = 0) =>
  array.map((entry, index) => (index >= value ? entry + 1 : entry))

export const getHandKey = hand =>
  hand.reduce((total, number) => total | (1 << number), 0)
