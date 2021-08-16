import React from 'react'
import { useFela } from 'react-fela'
import Downshift from 'downshift'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Input from '~/components/Input'
import VisuallyHidden from '~/components/VisuallyHidden'
import useNavigator from '~/hooks/useNavigator'
import searcher from './searcher'
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
                  extend={styles.arrow}
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
  const [inputValue, setInputValue] = React.useState('')
  const navigator = useNavigator()
  const input = React.useRef(null)
  const { setIsSearchReady } = props

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
    navigator.push(event.path)
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
                            key={item.path}
                            {...getItemProps({
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
          Psst! Next time, you can use <kbd>/</kbd> or <kbd>CMD</kbd>/
          <kbd>CTRL</kbd> + <kbd>k</kbd> to quickly open the search from
          anywhere.
        </p>
      </div>
    </Dialog>
  )
})
