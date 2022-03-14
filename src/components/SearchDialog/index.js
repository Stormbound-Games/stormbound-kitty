import React from 'react'
import { useFela } from 'react-fela'
import { useRouter } from 'next/router'
import querystring from 'querystring'
import { useCombobox } from 'downshift'
import Dialog from '~/components/Dialog'
import Loader from '~/components/Loader'
import Icon from '~/components/Icon'
import Input from '~/components/Input'
import useDebounce from '~/hooks/useDebounce'
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

async function runSearch(search) {
  const query = querystring.stringify({ s: search })
  const response = await fetch('/api/search?' + query)
  return response.json()
}

export default React.memo(function SearchDialog(props) {
  const { css } = useFela()
  const router = useRouter()
  const navigator = useNavigator()
  const input = React.useRef(null)
  const [search, setSearch] = React.useState('')
  const debouncedSearch = useDebounce(search, 500)
  const [results, setResults] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  useSearchKeyboardShortcut(() => props.dialogRef.current?.show())

  // Update search results when the search term changes.
  React.useEffect(
    () =>
      debouncedSearch &&
      runSearch(debouncedSearch).then(results => {
        setResults(results)
        setIsLoading(false)
      }),
    [debouncedSearch]
  )

  // Hide the dialog when the URL changes (after navigating to a result).
  React.useEffect(() => {
    props.dialogRef.current?.hide()
    setIsLoading(false)
    // eslint-disable-next-line
  }, [router.asPath])

  // Function executed when selecting a result to navigate to its path.
  const handleNavigation = React.useCallback(
    ({ selectedItem }) => {
      if (selectedItem) {
        setIsLoading(true)
        navigator.push(selectedItem.path)
      }
    },
    [navigator]
  )

  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    isOpen,
    selectedItem,
    reset,
  } = useCombobox({
    items: results,
    onInputValueChange: ({ inputValue }) => {
      setIsLoading(inputValue.length > 0)
      setSearch(inputValue)
    },
    onSelectedItemChange: handleNavigation,
    itemToString: item => (item ? item.label : ''),
  })

  const registerDialog = instance => {
    props.dialogRef.current = instance

    if (instance) {
      // Push the focus at the end of the event queue to avoid having `/` being
      // filled inside the field when opening the search dialog with `/`.
      instance.on('show', () => setTimeout(() => input.current.focus(), 0))
      // Clean up the local state when closing the dialog (either manually or
      // after having navigated to a result).
      instance.on('hide', () => reset())
    }
  }

  const comboboxProps = getComboboxProps(
    { className: css({ position: 'relative' }) },
    { suppressRefError: true }
  )
  const menuProps = getMenuProps({}, { suppressRefError: true })
  const inputProps = getInputProps(
    {
      hideLabel: true,
      label: 'Search Stormbound-Kitty',
      placeholder: 'e.g. calculator',
      type: 'text',
      id: 'search',
      ref: input,
      'data-testid': 'search-input',
    },
    { suppressRefError: true }
  )

  return (
    <Dialog
      id='search-dialog'
      title='Search'
      dialogRef={registerDialog}
      close={() => props.dialogRef.current?.hide()}
      image='https://cdn.sanity.io/images/5hlpazgd/production/651e45679d864ebc514bbcd66757022ad8eee282-419x449.png'
      imageWidth={200}
      imageHeight={214}
    >
      <div className={css(styles.body)}>
        <div {...comboboxProps}>
          <Input {...inputProps} />
          {isLoading && (
            <Loader
              hideLabel
              extend={styles.inputLoaderContainer}
              extendSvg={styles.inputLoader}
            />
          )}
        </div>
        <ul {...menuProps} className={css(styles.list({ isOpen }))}>
          {isOpen &&
            results.map((item, index) => (
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

      <p className={css({ marginBottom: 0 })}>
        Psst! Next time, you can use <kbd>/</kbd> or <kbd>CTRL</kbd> +{' '}
        <kbd>k</kbd> to quickly open the search from anywhere.
      </p>
    </Dialog>
  )
})
