import React from 'react'
import Column from '../Column'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import categories from '../../data/faq'
import './index.css'

const FAQEntry = props => (
  <>
    <dt className='FAQ__question' id={props.id}>
      <a
        className='FAQ__link'
        href={'#' + props.id}
        title={`Link to ‘${props.question}’`}
      >
        {props.question}
      </a>
    </dt>
    <dd>{props.answer}</dd>
  </>
)

const FAQSection = props => (
  <section className='FAQ__section' id={props.id}>
    <Title>{props.title}</Title>
    <dl className='FAQ__list'>
      {props.entries.map(entry => (
        <FAQEntry key={entry.id} {...entry} />
      ))}
    </dl>
  </section>
)

const FAQ = props => {
  return (
    <div className='FAQ'>
      <h1 className='visually-hidden'>Frequently Asked Questions</h1>

      <Row desktopOnly wideGutter>
        <Column width={33}>
          <Title>Topics</Title>

          <ul className='FAQ__toc'>
            {categories.map(category => (
              <li key={category.id}>
                <a href={'#' + category.id}>{category.title}</a>
              </li>
            ))}
          </ul>
        </Column>

        <Column width={66}>
          {categories.map(category => (
            <FAQSection {...category} key={category.id} />
          ))}
        </Column>
      </Row>

      <PageMeta
        title='Frequently Asked questions'
        description='Frequently asked questions about Stormbound Kitty.'
      />
    </div>
  )
}

export default FAQ
