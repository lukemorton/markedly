import sortByDateOrderDesc from './sortByDateOrderDesc'

function fakeFilenames () {
  return sortByDateOrderDesc([
    '2015-03-01-cool-title',
    '2016-01-01-another-one',
    '2016-02-01-nice'
  ])
}

describe('sortByDateOrderDesc', () => {
  it('sorts by date DESC', () => {
    const [a, b, c] = fakeFilenames()
    expect(a).toBe('2016-02-01-nice')
    expect(b).toBe('2016-01-01-another-one')
    expect(c).toBe('2015-03-01-cool-title')
  })
})
