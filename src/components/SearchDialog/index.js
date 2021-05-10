import React from 'react'
import { useHistory } from 'react-router-dom'
import Downshift from 'downshift'
import { StoriesContext } from '../StoriesProvider'
import Dialog from '../Dialog'
import Icon from '../Icon'
import searcher, { SEARCH_INDEX } from './searcher'
import capitalise from '../../helpers/capitalise'
import './index.css'

const isSearchShortcut = event => {
  const { key, metaKey } = event
  const isTyping = ['TEXTAREA', 'INPUT'].includes(
    document.activeElement.tagName
  )

  return (!isTyping && key === '/') || (metaKey && key === 'k')
}

const useSearchKeyboardShortcut = setIsOpen => {
  const handleKeyUp = React.useCallback(
    event => isSearchShortcut(event) && setIsOpen(isOpen => !isOpen),
    [setIsOpen]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyUp)

    return () => document.removeEventListener('keydown', handleKeyUp)
  }, [handleKeyUp])
}

const Option = props => {
  return (
    <span className='SearchDialog__option'>
      {props.label}
      {props.breadcrumbs.length > 0 && (
        <span className='SearchDialog__meta'>
          In{' '}
          {props.breadcrumbs.reduce((acc, crumb, index) => {
            if (index !== 0) {
              acc.push(
                <Icon
                  icon='arrow-right'
                  className='SearchDialog__arrow'
                  key={index + '-icon'}
                />
              )
            }
            acc.push(
              <span className='Highlight' key={index}>
                {crumb}
              </span>
            )
            return acc
          }, [])}
        </span>
      )}
    </span>
  )
}

export default React.memo(function SearchDialog(props) {
  const [storiesAdded, setStoriesAdded] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const history = useHistory()
  const input = React.useRef(null)
  const { setIsSearchReady } = props
  const stories = React.useContext(StoriesContext)
  const metaKeyName =
    navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'CMD' : 'CTRL'

  React.useEffect(() => {
    if (storiesAdded || stories.length === 0) return

    stories.forEach(story => {
      const path = `/stories/${story.id}`
      const isStoryFound = SEARCH_INDEX.find(entry => entry.path === path)
      const isMemberFound = SEARCH_INDEX.find(
        entry => entry.path === '/member/' + story.author
      )

      if (!isStoryFound) {
        SEARCH_INDEX.push({
          path: `/stories/${story.id}`,
          label: story.title + ' by ' + story.author,
          breadcrumbs: ['Stories', capitalise(story.category)],
        })
      }
      if (!isMemberFound) {
        SEARCH_INDEX.push({
          path: `/member/${story.member}`,
          label: story.member,
          breadcrumbs: ['Home', 'Member'],
        })
      }
    })

    setStoriesAdded(true)
  }, [storiesAdded, stories])

  const registerDialog = instance => {
    props.dialogRef.current = instance

    if (instance) {
      // Push the focus at the end of the event queue to avoid having `/` being
      // filled inside the field when opening the search dialog with `/`.
      instance.on('show', () => setTimeout(() => input.current.focus(), 0))
      instance.on('hide', () => setInputValue(''))
    }
  }

  React.useEffect(() => setIsSearchReady(true), [setIsSearchReady])

  const handleSearch = event => {
    if (!event) return
    history.push(event.path)
    props.dialogRef.current.hide()
  }

  useSearchKeyboardShortcut(() => props.dialogRef.current.show())

  return (
    <Dialog
      id='search-dialog'
      title='Search'
      dialogRef={registerDialog}
      close={() => props.dialogRef.current.hide()}
      image='/assets/images/cards/trekking_aldermen.png'
    >
      <Downshift
        inputValue={inputValue}
        onChange={handleSearch}
        itemToString={item => (item ? item.label : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getRootProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => (
          <div className='SearchDialog__wrapper'>
            <label
              {...getLabelProps()}
              className='SearchDialog__label VisuallyHidden'
            >
              Search Stormbound-Kitty
            </label>
            <div
              className='SearchDialog__input-wrapper'
              style={{ display: 'inline-block' }}
              {...getRootProps({}, { suppressRefError: true })}
            >
              <input
                {...getInputProps({
                  className: 'SearchDialog__input',
                  placeholder: 'e.g. calculator',
                  type: 'text',
                  id: 'search',
                  name: 'search',
                  ref: input,
                  value: inputValue,
                  onChange: event => setInputValue(event.target.value),
                })}
              />
            </div>
            <ul {...getMenuProps()} className='SearchDialog__list'>
              {isOpen && inputValue.length >= 3
                ? searcher
                    .search(inputValue)
                    .slice(0, 5)
                    .map(({ item }, index) => {
                      return (
                        <li
                          className='SearchDialog__item'
                          {...getItemProps({
                            key: item.path,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index
                                  ? 'rgba(0, 0, 0, 0.1)'
                                  : 'transparent',
                              fontWeight:
                                selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          <Option {...item} />
                        </li>
                      )
                    })
                : null}
            </ul>
          </div>
        )}
      </Downshift>

      <p className='SearchDialog__hint'>
        Psst! Next time, you can use <kbd>/</kbd> or <kbd>{metaKeyName}</kbd> +{' '}
        <kbd>k</kbd> to quickly open the search from anywhere.
      </p>
    </Dialog>
  )
})
