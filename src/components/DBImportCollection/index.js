import React from 'react'
import chunk from '../../helpers/chunk'
import cards from '../../data/cards'
import './index.css'

const onFileUpload = onChange => event => {
  const file = event.target.files[0]

  if (!file) return

  const reader = new FileReader()

  try {
    reader.readAsText(file)
  } catch (error) {
    onChange(null)
  }

  reader.onload = event => {
    try {
      onChange(parseCSVData(event.target.result))
    } catch (error) {
      onChange(null)
    }
  }
}

const parseCSVData = data => {
  // The former CSV exporting didn’t use line breaks to split lines, therefore
  // the importing needs to be based on the line separator
  const isCollectionSplitWithLineBreaks = data.includes('\n')
  // The former CSV exporting didn’t include card names as it was just about
  // exporting/importing data, without caring about making it readable
  const hasCollectionCardNames = data.includes('name')
  const items = isCollectionSplitWithLineBreaks
    ? data
        .split('\n')
        .slice(1)
        .map(item => item.split(','))
    : chunk(data.split(',').slice(3), hasCollectionCardNames ? 4 : 3)

  // To make sure the collection is complete, the source of truth is the data
  // from the constant file
  return cards
    .filter(card => !card.token)
    .map(card => {
      const item = items.find(item => item[0] === card.id)

      // The card has not been found in the CSV data, which might mean it’s a
      // new card, therefore consider it missing
      if (!item) {
        return { id: card.id, level: 1, copies: 0, missing: true }
      }

      const level = hasCollectionCardNames ? +item[2] : +item[1]
      const copies = hasCollectionCardNames ? +item[3] : +item[2]

      if (level === 0) {
        return { id: card.id, level: 1, copies: 0, missing: true }
      }

      return { id: card.id, level, copies, missing: false }
    })
}

const DBImportCollection = props => (
  <div className='DBImportCollection'>
    <label htmlFor='import' className='CTA DBImportCollection__button'>
      <span className='CTA__content'>Import collection</span>
    </label>
    <input
      id='import'
      name='import'
      type='file'
      accept='.csv'
      onChange={onFileUpload(props.onChange)}
      className='DBImportCollection__file'
    />
  </div>
)

export default DBImportCollection
