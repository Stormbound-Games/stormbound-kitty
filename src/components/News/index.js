import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import CTA from '~/components/CTA'
import Row from '~/components/Row'
import Spacing from '~/components/Spacing'
import chunk from '~/helpers/chunk'
import track from '~/helpers/track'
import styles from './styles'

const MAX_NEWS = 7

export default React.memo(function News(props) {
  const { css } = useFela()
  const pages = chunk(props.items, MAX_NEWS)
  const [activePage, setActivePage] = React.useState(0)
  const loadPrev = () => setActivePage(page => page + 1)
  const loadNext = () => setActivePage(page => page - 1)

  if (!pages[activePage]) return null

  return (
    <>
      <ul className={css(styles.news)} data-testid='news'>
        {pages[activePage].map((news, index) => (
          <li className={css(styles.item)} key={index}>
            {news.link ? (
              <Link to={news.link}>
                <span className='Highlight'>{news.intro}:</span>
              </Link>
            ) : (
              <span className='Highlight'>{news.intro}:</span>
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
              onClick={() => {
                loadNext()
                track('news_pagination', { direction: 'NEXT' })
              }}
              disabled={activePage === 0}
            >
              Recent news
            </CTA>
          </Row.Column>
          <Row.Column align='center'>
            <CTA
              type='button'
              data-testid='news-older-btn'
              onClick={() => {
                loadPrev()
                track('news_pagination', { direction: 'PREV' })
              }}
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
