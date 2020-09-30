import React from 'react'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import Article from '../Article'
import Loader from '../Loader'
import PageMeta from '../PageMeta'
import art from '../../data/art'
import shuffle from '../../helpers/shuffle'
import useLazyLoad from '../../hooks/useLazyLoad'
import './index.css'

export default React.memo(function FanArt(props) {
  const entries = React.useMemo(() => shuffle(art), [])
  const { loading, items, ref } = useLazyLoad(entries, 3)

  return (
    <Article title='Fan Art'>
      <p>
        All illustrations displayed on this page have been collected from the
        official Discord and Reddit, and all credits go to their respective
        author. If you are the author of an artwork showcased on this page and
        would like to have it removed, contact Kitty#1909 on Discord.
      </p>

      <Article.FullWidth>
        <Masonry
          breakpointCols={{
            default: 3,
            1100: 3,
            700: 2,
            500: 1,
          }}
          className='FanArtWrapper'
          columnClassName='FanArtItem'
        >
          {items.map(entry => (
            <figure className='FanArt' key={entry.image}>
              <img
                src={'/assets/images/art/' + entry.image}
                alt={'Artwork by ' + entry.author}
                className='FanArt__image'
              />
              <figcaption className='FanArt__caption'>
                Artwork by{' '}
                <Link to={'/member/' + entry.author}>{entry.author}</Link>
              </figcaption>
            </figure>
          ))}
        </Masonry>

        {loading && <Loader />}
        <div ref={ref} />
      </Article.FullWidth>

      <PageMeta
        title='Fan Art'
        description='Find the amazing visual artwork created by the Stormbound community'
      />
    </Article>
  )
})
