const cardRef = {
  title: 'Card',
  name: 'card',
  type: 'reference',
  to: [{ type: 'card' }],
  options: { disableNew: true },
  validation: Rule => Rule.required(),
}

export default cardRef
