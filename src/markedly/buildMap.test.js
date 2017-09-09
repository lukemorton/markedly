import buildMap from './buildMap'

function fakeFiles () {
  return {
    '2016-01-01-cool': '# Cool'
  }
}

describe('buildMap', () => {
  it('should use filenames as keys', () => {
    const files = fakeFiles()
    const filenames = Object.keys(files)
    const map = buildMap({ files })
    expect(map[filenames[0]].slug).toBe(filenames[0])
  })
})
