import React from 'react'
import { useFela } from 'react-fela'
import { useHistory } from 'react-router-dom'
import Downshift from 'downshift'
import { StoriesContext } from '../StoriesProvider'
import Dialog from '../Dialog'
import Icon from '../Icon'
import Input from '../Input'
import VisuallyHidden from '../VisuallyHidden'
import searcher, { SEARCH_INDEX } from './searcher'
import capitalise from '../../helpers/capitalise'
import styles from './styles'

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
  const { css } = useFela()

  return (
    <span className={css(styles.option)}>
      {props.label}
      {props.breadcrumbs.length > 0 && (
        <span className={css(styles.meta)}>
          In{' '}
          {props.breadcrumbs.reduce((acc, crumb, index) => {
            if (index !== 0) {
              acc.push(
                <Icon
                  icon='arrow-right'
                  className={css(styles.arrow)}
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
  const { css } = useFela()
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
      <div className={css(styles.body)}>
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
            <div className={css(styles.wrapper)}>
              <VisuallyHidden as='label' {...getLabelProps()}>
                Search Stormbound-Kitty
              </VisuallyHidden>
              <div
                className={css(styles.inputWrapper)}
                {...getRootProps({}, { suppressRefError: true })}
              >
                <Input
                  {...getInputProps({
                    extend: styles.input,
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
              <ul {...getMenuProps()} className={css(styles.list)}>
                {isOpen && inputValue.length >= 3
                  ? searcher
                      .search(inputValue)
                      .slice(0, 5)
                      .map(({ item }, index) => {
                        return (
                          <li
                            className={css(styles.item)}
                            {...getItemProps({
                              key: item.path,
                              index,
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index
                                    ? '#0000001a'
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

        <p className={css(styles.hint)}>
          Psst! Next time, you can use <kbd>/</kbd> or <kbd>{metaKeyName}</kbd>{' '}
          + <kbd>k</kbd> to quickly open the search from anywhere.
        </p>
      </div>
    </Dialog>
  )
})
