import React from 'react'
import { useFela } from 'react-fela'
import Article from '../Article'
import FAQSection from '../FAQSection'
import Image from '../Image'
import Link from '../Link'
import PageMeta from '../PageMeta'
import StructuredData from '../StructuredData'
import Title from '../Title'
import categories from '../../data/faq'
import styles from './styles'

export default React.memo(function FAQ() {
  const { css } = useFela()

  return (
    <Article title='FAQ'>
      <Article.Narrow>
        <Title>Topics</Title>

        <ul className={css(styles.toc)}>
          {categories.map(category => (
            <li key={category.id}>
              <Link href={'#' + category.id} className={css(styles.link)}>
                {category.title}
              </Link>
              <ul className={css(styles.list)}>
                {category.entries.map(entry => (
                  <li key={entry.id}>
                    <Link href={'#' + entry.id} className={css(styles.link)}>
                      {entry.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <Image
          src='/assets/images/kitty.png'
          alt='Kitty Sparkles by Hurricane Sunny'
          extend={{ margin: 'auto' }}
        />

        {categories.map(category => (
          <FAQSection {...category} key={category.id} />
        ))}

        <StructuredData type='FAQ' />
        <PageMeta
          title='Frequently Asked questions'
          description='Find answers to the frequently asked questions about Stormbound and Stormbound-Kitty'
        />
      </Article.Narrow>
    </Article>
  )
})
