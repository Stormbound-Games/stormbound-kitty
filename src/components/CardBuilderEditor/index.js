import React from 'react'
import CardBuilderApp from '~/components/CardBuilderApp'
import useCardBuilder from '~/hooks/useCardBuilder'

export default React.memo(function CardBuilderEditor(props) {
  const editor = useCardBuilder(props)

  return <CardBuilderApp {...props} card={editor.card} {...editor.setters} />
})
