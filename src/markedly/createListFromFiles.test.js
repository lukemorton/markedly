import createListFromFiles from './createListFromFiles'

function fakeFiles () {
  return {
    '2016-01-01-cool': '# Cool',
    '2016-01-04-cool': '# Cool',
    '2016-01-02-cool': '# Cool'
  }
}

describe('createListFromFiles', () => {
  it('should write list', async () => {
    const read = jest.fn(() => fakeFiles())
    const write = jest.fn()
    await createListFromFiles({ read, write })
    expect(write).toBeCalledWith([
      expect.objectContaining({ slug: '2016-01-04-cool' }),
      expect.objectContaining({ slug: '2016-01-02-cool' }),
      expect.objectContaining({ slug: '2016-01-01-cool' })
    ])
  })
})
