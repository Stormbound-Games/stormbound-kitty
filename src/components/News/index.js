import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import CTA from '../CTA'
import Error from '../Error'
import Loader from '../Loader'
import Row from '../Row'
import Spacing from '../Spacing'
import chunk from '../../helpers/chunk'
import useFetch from '../../hooks/useFetch'
import styles from './styles'

const MAX_NEWS = 7

export default React.memo(function News(props) {
  const { css } = useFela()
  const { loading, error, data: news = [] } = useFetch('/news.json')
  const pages = chunk(news, MAX_NEWS)
  const [activePage, setActivePage] = React.useState(0)
  const loadPrev = () => setActivePage(page => page + 1)
  const loadNext = () => setActivePage(page => page - 1)

  if (loading) {
    return (
      <div className={css(styles.news)} data-testid='news'>
        <Loader hideLabel />
      </div>
    )
  }

  if (error) {
    return (
      <div className={css(styles.news)} data-testid='news'>
        <Error error='Error fetching latest news.' noTitle noImage />
      </div>
    )
  }

  if (!pages[activePage]) return null

  return (
    <>
      <ul className={css(styles.news)} data-testid='news'>
        {pages[activePage].map((news, index) => (
          <li className={css(styles.item)} key={index}>
            {news.link ? (
              <Link to={news.link}>
                <strong className='Highlight'>{news.intro}:</strong>
              </Link>
            ) : (
              <strong className='Highlight'>{news.intro}:</strong>
            )}{' '}
            {news.description}
          </li>
        ))}
      </ul>

      <Spacing top='BASE'>
        <Row isDesktopOnly>
          <Row.Column align='center'>
            <CTA
              type='button'
              data-testid='news-recent-btn'
              onClick={loadNext}
              disabled={activePage === 0}
            >
              Recent news
            </CTA>
          </Row.Column>
          <Row.Column align='center'>
            <CTA
              type='button'
              data-testid='news-older-btn'
              onClick={loadPrev}
              disabled={activePage === pages.length - 1}
            >
              Older news
            </CTA>
          </Row.Column>
        </Row>
      </Spacing>
    </>
  )
})
