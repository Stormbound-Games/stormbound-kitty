import React from 'react'
import { useFela } from 'react-fela'
import Image from '#components/Image'
import Link from '#components/Link'
import Masonry from 'react-masonry-css'
import Page from '#components/Page'
import Spacing from '#components/Spacing'
import parseDate from '#helpers/parseDate'
import { formatDate } from '#helpers/formatDate'
import styles from './styles'

const pad = value => String(value).padStart(2, '0')

export default React.memo(function PageFanArt(props) {
  const { css } = useFela()

  return (
    <Page
      title='Fan Art'
      description='Find the amazing visual artwork created by the Stormbound community'
      meta={
        props.artworks.length === 1
          ? '1 artwork'
          : props.artworks.length + ' artworks'
      }
      action={{ to: '/fan-kit', children: 'Back to fan-kit' }}
      isEditorialContent
    >
      <Page.Narrow>
        <p>
          All illustrations displayed on this page have been collected from the
          official Discord and Reddit, and all credits go to their respective
          author. If you are the author of an artwork showcased on this page and
          would like to have it removed, contact kitty.sparkles on Discord.
        </p>
      </Page.Narrow>

      <Spacing vertical='LARGEST'>
        <Masonry
          breakpointCols={{
            default: 3,
            900: 2,
            500: 1,
          }}
          className={css(styles.wrapper)}
          columnClassName={css(styles.item)}
        >
          {props.artworks.map(entry => {
            const { width, height } = entry.dimensions
            const displayWidth = 400
            const displayHeight = Math.round((displayWidth / width) * height)
            const dimensions =
              '?auto=format&w=' + displayWidth + '&h=' + displayHeight + '&q=90'
            const date = parseDate(entry.date)

            return (
              <figure className={css(styles.art)} key={entry.image}>
                <Image
                  src={entry.image + dimensions}
                  alt={'Artwork by ' + entry.user.name}
                  extend={{ marginBottom: 0 }}
                />
                <figcaption className={css(styles.caption)}>
                  By{' '}
                  <Link to={'/members/' + entry.user.slug}>
                    {entry.user.name}
                  </Link>{' '}
                  in{' '}
                  <time
                    className='Highlight'
                    dateTime={date.getFullYear() + '-' + pad(date.getMonth())}
                  >
                    {formatDate(date)}
                  </time>
                </figcaption>
              </figure>
            )
          })}
        </Masonry>
      </Spacing>
    </Page>
  )
})
