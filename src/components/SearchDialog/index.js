import React from 'react'
import { useFela } from 'react-fela'
import { useRouter } from 'next/router'
import querystring from 'querystring'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Input from '~/components/Input'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'
import Loader from '~/components/Loader'
import track from '~/helpers/track'
import useDebounce from '~/hooks/useDebounce'
import useSearchShortcut from '~/hooks/useSearchShortcut'
import styles from './styles'

async function runSearch(search) {
  const query = querystring.stringify({ search })
  const response = await fetch('/api/search?' + query)
  const results = await response.json()

  return results.map(entry => ({ ...entry.item, score: entry.score }))
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

export default React.memo(function SearchDialog(props) {
  const router = useRouter()
  const { css } = useFela()
  const input = React.useRef(null)
  const [search, setSearch] = React.useState('')
  const debouncedSearch = useDebounce(search, 500)
  const [results, setResults] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  useSearchShortcut(() => props.dialogRef.current?.show())

  React.useEffect(() => {
    if (debouncedSearch && debouncedSearch.length >= 3) {
      track('site_search', { search: debouncedSearch })
      runSearch(debouncedSearch).then(results => {
        setResults(results)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [debouncedSearch])

  // Hide the dialog when the URL changes (after navigating to a result).
  React.useEffect(() => {
    props.dialogRef.current?.hide()
    setIsLoading(false)
    // eslint-disable-next-line
  }, [router.asPath])

  const registerDialog = instance => {
    props.dialogRef.current = instance

    if (instance) {
      // Push the focus at the end of the event queue to avoid having `/` being
      // filled inside the field when opening the search dialog with `/`.
      instance.on('show', () => setTimeout(() => input.current.focus(), 0))
    }
  }

  return (
    <Dialog
      id='search-dialog'
      title='Site search'
      dialogRef={registerDialog}
      close={() => props.dialogRef.current?.hide()}
      image='https://cdn.sanity.io/images/5hlpazgd/production/651e45679d864ebc514bbcd66757022ad8eee282-419x449.png'
      imageWidth={200}
      imageHeight={214}
      extend={{
        dialog: styles.dialog,
        body: styles.body,
      }}
    >
      <div className={css(styles.inputWrapper)}>
        <Input
          ref={input}
          label='Search the site'
          placeholder='e.g. Sparkly Kitties'
          id='search'
          value={search}
          onChange={event => {
            setIsLoading(true)
            setSearch(event.target.value)
          }}
          data-testid='search-input'
          hideLabel
          extend={styles.input}
        />
        <Icon icon='search' extend={styles.searchIcon} />
        {isLoading && (
          <Loader
            hideLabel
            extend={styles.inputLoaderContainer}
            extendSvg={styles.inputLoader}
          />
        )}
      </div>
      <div>
        <ul className={css(styles.list)}>
          {results.map(result => (
            <li
              key={result.path}
              className={css(styles.item)}
              data-testid='search-result'
            >
              <FeedEntry
                icon={result.icon}
                right={
                  <span className={css({ opacity: 0.6 })}>
                    <abbr title='Relevance score out of 1'>Rlv.</abbr>
                    <br />
                    {(1 - result.score).toFixed(2)}
                  </span>
                }
              >
                <Link to={result.path}>{result.label}</Link>
                <span className={css(styles.meta)}>
                  In <Breadcrumbs breadcrumbs={result.breadcrumbs} />
                </span>
              </FeedEntry>
            </li>
          ))}
        </ul>
      </div>
      <p className={css(styles.hint)}>
        Psst! Next time, you can use <kbd>/</kbd> or <kbd>CTRL</kbd> +{' '}
        <kbd>k</kbd> to quickly open the search from anywhere.
      </p>
    </Dialog>
  )
})
