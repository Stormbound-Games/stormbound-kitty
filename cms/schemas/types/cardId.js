const cardId = {
  title: 'Card ID',
  name: 'cardId',
  type: 'string',
  validation: Rule =>
    Rule.required()
      .uppercase()
      .custom(
        string => !string.includes(' ') || 'Card ID cannot contain spaces.'
      ),
}

export default cardId
