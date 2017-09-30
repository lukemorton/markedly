import format from 'date-fns/format'
import buildList from './buildList'

function fakeFiles () {
  return {
    '2-cool': '---\npublishedAt: 2016-01-01\n---\n\n# Cool',
    '1-cool': '---\npublishedAt: 2016-01-04\n---\n\n# Cool',
    '3-cool': '---\npublishedAt: 2016-01-02\n---\n\n# Cool'
  }
}

describe('buildList', () => {
  it('contains thoughts', () => {
    const list = buildList({ files: fakeFiles() })
    expect(list.length).toBe(3)
  })

  it('can be limited', () => {
    const limit = 2
    const list = buildList({ files: fakeFiles(), options: { limit } })
    expect(list.length).toBe(limit)
  })

  it('can be sorted by publishedAt', () => {
    const files = fakeFiles()
    const list = buildList({ files, options: { sort: 'publishedAt' } })
    expect(list[0].publishedAt).toMatchObject({ iso: format(new Date(2016, 0, 1)) })
  })

  it('can be reversed', () => {
    const list = buildList({ files: fakeFiles(), options: { reverse: true } })
    expect(list[0]).toMatchObject({ slug: '3-cool' })
  })

  it('excludes articles published in future by default', () => {
    const files = fakeFiles()
    files['4-cool'] = '---\npublishedAt: 2050-02-01\n---\n\n# Cool'
    const list = buildList({ files })
    expect(list.length).toBe(3)
  })

  it('does not exclude articles published in future in preview mode', () => {
    const files = fakeFiles()
    files['4-cool'] = '---\npublishedAt: 2050-02-01\n---\n\n# Cool'
    const list = buildList({ preview: true, files })
    expect(list.length).toBe(4)
  })

  it('returns empty list of files empty', () => {
    const list = buildList({ files: [] })
    expect(list.length).toBe(0)
  })
})
