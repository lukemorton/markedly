import createList from './createList'

function fakeFiles () {
  return {
    '2016-01-01-cool': '# Cool',
    '2016-01-04-cool': '# Cool',
    '2016-01-02-cool': '# Cool'
  }
}

describe('createList', () => {
  it('should write list', async () => {
    const write = jest.fn()
    await createList({ write, files: fakeFiles() })
    expect(write).toBeCalledWith([
      expect.objectContaining({ slug: '2016-01-04-cool' }),
      expect.objectContaining({ slug: '2016-01-02-cool' }),
      expect.objectContaining({ slug: '2016-01-01-cool' })
    ])
  })
})
