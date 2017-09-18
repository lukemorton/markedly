import fs from 'fs-extra'
import path from 'path'
import { read } from './directoryFilesGateway'

describe('read', () => {
  function deleteIfExists (path) {
    try { fs.unlinkSync(path) } catch (e) {}
  }

  async function createExampleFile (filePath) {
    deleteIfExists(filePath)
    await fs.mkdirs(path.dirname(filePath))
    return fs.writeFile(filePath, '# Nice')
  }

  describe('when directory has file', () => {
    const dir = path.join(__dirname, '../../tmp/dirFilesGateway')
    const filename = 'cool/testing.md'
    const filePath = path.join(dir, filename)

    beforeEach(async () => createExampleFile(filePath))
    afterEach(() => deleteIfExists(filePath))

    it('should read directory into map', async () => {
      const files = await read(dir)
      expect(files['cool/testing']).toBeTruthy()
    })
  })
})
