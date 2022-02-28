const cardRef = {
  title: 'Card',
  name: 'card',
  type: 'reference',
  to: [{ type: 'card' }],
  options: { disableNew: true },
  weak: true,
  validation: Rule => Rule.required(),
}

export default cardRef
