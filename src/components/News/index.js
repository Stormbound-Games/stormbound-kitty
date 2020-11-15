import React from 'react'
import { Link } from 'react-router-dom'
import CTA from '../CTA'
import Error from '../Error'
import Loader from '../Loader'
import Row from '../Row'
import chunk from '../../helpers/chunk'
import useFetch from '../../hooks/useFetch'
import './index.css'

const MAX_NEWS = 7

export default React.memo(function News(props) {
  const { loading, error, data: news = [] } = useFetch('/news.json')
  const pages = chunk(news, MAX_NEWS)
  const [activePage, setActivePage] = React.useState(0)
  const loadPrev = () => setActivePage(page => page + 1)
  const loadNext = () => setActivePage(page => page - 1)

  if (loading) {
    return (
      <div className='News' data-testid='news'>
        <Loader hideLabel />
      </div>
    )
  }

  if (error) {
    return (
      <div className='News' data-testid='news'>
        <Error error='Error fetching latest news.' noTitle noImage />
      </div>
    )
  }

  if (!pages[activePage]) return null

  return (
    <>
      <ul className='News' data-testid='news'>
        {pages[activePage].map((news, index) => (
          <li className='News__item' key={index}>
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
      <Row desktopOnly>
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
    </>
  )
})
