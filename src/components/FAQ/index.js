import React from 'react'
import Article from '../Article'
import FAQSection from '../FAQSection'
import Image from '../Image'
import PageMeta from '../PageMeta'
import StructuredData from '../StructuredData'
import Title from '../Title'
import categories from '../../data/faq'
import './index.css'

export default React.memo(function FAQ() {
  return (
    <Article title='FAQ'>
      <Article.Narrow>
        <Title>Topics</Title>

        <ul className='FAQ__toc'>
          {categories.map(category => (
            <li key={category.id}>
              <a href={'#' + category.id}>{category.title}</a>
              <ul className='FAQ__toc-list'>
                {category.entries.map(entry => (
                  <li key={entry.id}>
                    <a href={'#' + entry.id}>{entry.question}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <Image
          src='/assets/images/kitty.png'
          alt='Kitty Sparkles by Hurricane Sunny'
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
