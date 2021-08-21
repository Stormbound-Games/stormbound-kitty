import React from 'react'
import { useFela } from 'react-fela'
import querystring from 'querystring'
import Downshift from 'downshift'
import DiamondButton from '~/components/DiamondButton'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Input from '~/components/Input'
import VisuallyHidden from '~/components/VisuallyHidden'
import useNavigator from '~/hooks/useNavigator'
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

const Breadcrumbs = React.memo(function Breadcrumbs(props) {
  return props.breadcrumbs.reduce((acc, crumb, index) => {
    if (index !== 0) {
      acc.push(
        <Icon icon='arrow-right' extend={styles.arrow} key={index + '-icon'} />
      )
    }

    acc.push(
      <span className='Highlight' key={index}>
        {crumb}
      </span>
    )
    return acc
  }, [])
})

const Option = React.memo(function Option(props) {
  const { css } = useFela()

  return (
    <span className={css(styles.option)}>
      {props.label}
      {props.breadcrumbs.length > 0 && (
        <span className={css(styles.meta)}>
          In <Breadcrumbs breadcrumbs={props.breadcrumbs} />
        </span>
      )}
    </span>
  )
})

export default React.memo(function SearchDialog(props) {
  const { css } = useFela()
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState([])
  const navigator = useNavigator()
  const input = React.useRef(null)

  const search = React.useCallback(async search => {
    const query = querystring.stringify({ s: search })
    const response = await fetch('/api/search?' + query)
    const data = await response.json()

    setOptions(data)
  }, [])

  const handleSubmit = React.useCallback(
    event => {
      event.preventDefault()
      search(inputValue)
    },
    [search, inputValue]
  )

  const registerDialog = instance => {
    props.dialogRef.current = instance

    if (instance) {
      // Push the focus at the end of the event queue to avoid having `/` being
      // filled inside the field when opening the search dialog with `/`.
      instance.on('show', () => setTimeout(() => input.current.focus(), 0))
      instance.on('hide', () => {
        setOptions([])
        setInputValue('')
      })
    }
  }

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
      <form onSubmit={handleSubmit} className={css(styles.body)} name='search'>
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
                    'data-testid': 'search-input',
                    onChange: event => setInputValue(event.target.value),
                  })}
                />
              </div>
              <ul {...getMenuProps()} className={css(styles.list({ isOpen }))}>
                {options.map(({ item }, index) => (
                  <li
                    key={item.path}
                    className={css(
                      styles.item({
                        isHighlighted: highlightedIndex === index,
                        isSelected: selectedItem === item,
                      })
                    )}
                    {...getItemProps({ index, item })}
                    data-testid='search-result'
                  >
                    <Option {...item} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Downshift>
        <DiamondButton
          type='submit'
          icon='search'
          label='Search'
          extend={{ zIndex: 2 }}
        />
      </form>

      <p className={css({ marginBottom: 0 })}>
        Psst! Next time, you can use <kbd>/</kbd> or <kbd>CTRL</kbd> +{' '}
        <kbd>k</kbd> to quickly open the search from anywhere.
      </p>
    </Dialog>
  )
})
