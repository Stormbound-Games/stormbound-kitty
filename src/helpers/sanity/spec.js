import {
  ID_FIELD,
  createQuery,
  findSameEntry,
  isDraftEntry,
  isPublishedEntry,
  isNotSelf,
  withoutSanityId,
} from './utils.js'

describe('Sanity utilities', () => {
  const id = '091b1dda-81dc-45b7-97f4-61b8fc50a3c1'
  const draft = { [ID_FIELD]: 'drafts.' + id }
  const published = { [ID_FIELD]: id }

  it('The ‘isDraftEntry’ helper', () => {
    expect(isDraftEntry(published)).toBeFalsy()
    expect(isDraftEntry(draft)).toBeTruthy()
  })

  it('The ‘isPublishedEntry’ helper', () => {
    expect(isPublishedEntry(published)).toBeTruthy()
    expect(isPublishedEntry(draft)).toBeFalsy()
  })

  it('The ‘isNotSelf’ helper', () => {
    expect(isNotSelf(published)(draft)).toBeTruthy()
    expect(isNotSelf(draft)(draft)).toBeFalsy()
  })

  it('The ‘withoutSanityId’ helper', () => {
    expect(withoutSanityId({ ...published, foo: 0 })).toEqual({ foo: 0 })
  })

  it('The ‘createQuery’ helper', () => {
    expect(createQuery()).toEqual(`*[] { ... }`)
    expect(createQuery({ conditions: ['_type == "foo"'] })).toEqual(
      `*[_type == "foo"] { ... }`
    )
    expect(
      createQuery({ conditions: ['_type == "foo"', 'slug.current == $bar'] })
    ).toEqual(`*[_type == "foo" && slug.current == $bar] { ... }`)
    expect(createQuery({ fields: 'foo' })).toEqual(`*[] { foo }`)
    expect(createQuery({ options: { slice: '0..2' } })).toEqual(
      `*[] { ... } [0..2]`
    )
    expect(createQuery({ options: { order: 'foo asc' } })).toEqual(
      `*[] { ... } | order(foo asc)`
    )
    expect(createQuery({ options: { isPreview: true } })).toEqual(
      `*[] { "${ID_FIELD}": _id, ... }`
    )
  })

  it('The ‘findSameEntry’ helper', () => {
    const array = [draft, published]

    expect(findSameEntry(draft, array)).toEqual(published)
    expect(findSameEntry(published, array)).toEqual(draft)

    expect(findSameEntry(published, [published])).toBeUndefined()
    expect(findSameEntry(draft, [draft])).toBeUndefined()
  })
})
