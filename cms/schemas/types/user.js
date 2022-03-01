const user = {
  title: 'User',
  name: 'user',
  type: 'reference',
  to: [{ type: 'user' }],
  validation: Rule => Rule.required(),
}

export default user
