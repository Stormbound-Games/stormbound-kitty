import React from 'react'
import { useFela } from 'react-fela'
import Image from '~/components/Image'
import Link from '~/components/Link'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function HomeNews(props) {
  const { css } = useFela()

  return (
    <aside className={css(styles.container)}>
      <div className={css(styles.image)}>
        <Image
          src='https://cdn.sanity.io/images/5hlpazgd/production/f675c9ec86b27088ee6433b53433a9a3fdd96803-512x512.png'
          alt='Sparkly Kitties'
          width={390}
          height={390}
        />
      </div>

      <Spacing bottom='LARGE'>
        <div className={css(styles.box)}>
          <Title extend={styles.title}>Latest News</Title>
          <ul className={css(styles.news)} data-testid='news'>
            {props.news.map((news, index) => (
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
        </div>
      </Spacing>
    </aside>
  )
})
