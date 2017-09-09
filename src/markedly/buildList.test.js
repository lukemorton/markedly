import format from 'date-fns/format'
import buildList from './buildList'

function fakeFiles () {
  return {
    '2016-01-01-cool': '# Cool',
    '2016-01-04-cool': '# Cool',
    '2016-01-02-cool': '# Cool'
  }
}

describe('buildList', () => {
  it('contains thoughts', () => {
    const list = buildList({ files: fakeFiles() })
    expect(list.length).toBe(3)
  })

  it('can be limited', () => {
    const list = buildList({ limit: 2, files: fakeFiles() })
    const firstDate = list[0].publishedAtISO

    expect(firstDate).toBe(format(new Date(2016, 0, 4)))
    expect(list.length).toBe(2)
  })

  it('excludes articles published in future by default', () => {
    const files = fakeFiles()
    files['2050-02-01-cool'] = '# Cool'
    const list = buildList({ files })
    expect(list.length).toBe(3)
  })

  it('excludes articles published in future in preview mode', () => {
    const files = fakeFiles()
    files['2050-02-01-cool'] = '# Cool'
    const list = buildList({ preview: true, files })
    expect(list.length).toBe(4)
  })
})
