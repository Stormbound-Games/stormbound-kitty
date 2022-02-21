const author = {
  title: 'Member',
  // Named `author` to preserve backward compatibility with the site, as this is
  // the word used everywhere. A proper data migration would be required to
  // rename that field.
  name: 'author',
  type: 'string',
  description:
    'The case-sensitive name of the member (without spaces, as it’s used in URLs).',
  validation: Rule =>
    Rule.required().custom(
      string => !string.includes(' ') || 'Member names cannot contain spaces.'
    ),
}

export default author
