import createMapFromFiles from './createMapFromFiles'

function fakeFiles () {
  return {
    '2016-01-01-cool': '# Cool',
    '2016-01-04-cool': '# Cool',
    '2016-01-02-cool': '# Cool'
  }
}

describe('createMapFromFiles', () => {
  it('should write list', async () => {
    const read = jest.fn(() => fakeFiles())
    const write = jest.fn()
    await createMapFromFiles({ read, write })
    expect(write).toBeCalledWith({
      '2016-01-04-cool': expect.objectContaining({ slug: '2016-01-04-cool' }),
      '2016-01-02-cool': expect.objectContaining({ slug: '2016-01-02-cool' }),
      '2016-01-01-cool': expect.objectContaining({ slug: '2016-01-01-cool' })
    })
  })
})
