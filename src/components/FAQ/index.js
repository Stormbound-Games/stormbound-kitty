import React from 'react'
import { useFela } from 'react-fela'
import Page from '../Page'
import FAQSection from '../FAQSection'
import Image from '../Image'
import Link from '../Link'
import Spacing from '../Spacing'
import StructuredData from '../StructuredData'
import Title from '../Title'
import FAQ from '../../data/faq'
import styles from './styles'

export default React.memo(function FrequentlyAskedQuestions() {
  const { css } = useFela()

  return (
    <Page
      title='FAQ'
      description='Find answers to the frequently asked questions about Stormbound and Stormbound-Kitty'
      isEditorialContent
    >
      <Page.Narrow>
        <Title>Topics</Title>

        <ul className={css(styles.toc)}>
          {FAQ.map(category => (
            <li key={category.id}>
              <Link href={'#' + category.id} extend={styles.link}>
                {category.title}
              </Link>
              <ul className={css(styles.list)}>
                {category.entries.map(entry => (
                  <li key={entry.id}>
                    <Link href={'#' + entry.id} extend={styles.link}>
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

        {FAQ.map((category, index) => (
          <Spacing
            bottom={index !== FAQ.length - 1 ? 'LARGEST' : 'NONE'}
            id={category.id}
            key={category.id}
          >
            <FAQSection {...category} />
          </Spacing>
        ))}

        <StructuredData type='FAQ' />
      </Page.Narrow>
    </Page>
  )
})
