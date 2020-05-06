import React from 'react'
import template from './'

describe('The `template` helper', () => {
  it('should always return an array', () => {
    const actual = template('Hello')
    const expected = ['Hello']
    expect(actual).to.deep.equal(expected)
  })

  it('should strip out non-replaced tokens', () => {
    const actual = template('Hello {{token}}')
    const expected = ['Hello ']
    expect(actual).to.deep.equal(expected)
  })

  it('should replace tokens when given', () => {
    const actual = template('Hello {{token}}', { token: 'world' })
    const expected = ['Hello ', 'world']
    expect(actual).to.deep.equal(expected)
  })

  it('should replace all occurrences of tokens', () => {
    const actual = template('Hello {{token}}, cool {{token}}', {
      token: 'world',
    })
    const expected = ['Hello ', 'world', ', cool ', 'world']
    expect(actual).to.deep.equal(expected)
  })

  it('should replace multiple tokens', () => {
    const actual = template('Hello {{token}}, cool {{other}}', {
      token: 'world',
      other: 0,
    })
    const expected = ['Hello ', 'world', ', cool ', 0]
    expect(actual).to.deep.equal(expected)
  })

  it('should replace tokens with React components', () => {
    const actual = template('Hello {{token}}, cool {{other}}', {
      token: 'world',
      other: <span key='story'>Story</span>,
    })
    const expected = [
      'Hello ',
      'world',
      ', cool ',
      <span key='story'>Story</span>,
    ]
    expect(actual).to.deep.equal(expected)
  })

  it('should replace multiple tokens with React components', () => {
    const actual = template('Hello {{token}}, cool {{other}}', {
      token: <span key='world'>world</span>,
      other: <span key='Story'>Story</span>,
    })
    const expected = [
      'Hello ',
      <span key='world'>world</span>,
      ', cool ',
      <span key='Story'>Story</span>,
    ]
    expect(actual).to.deep.equal(expected)
  })

  it('should replace all occurrences of tokens with React components', () => {
    const actual = template('Hey,{{__BREAK__}}hello{{__BREAK__}}world', {
      __BREAK__: <br key />,
    })
    const expected = ['Hey,', <br key />, 'hello', <br key />, 'world']
    expect(actual).to.deep.equal(expected)
  })
})
