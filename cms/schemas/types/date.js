const date = {
  title: 'Date',
  name: 'date',
  type: 'date',
  options: { dateFormat: 'MM/YYYY' },
  validation: Rule => Rule.required(),
}

export default date
