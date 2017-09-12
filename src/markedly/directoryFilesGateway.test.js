import fs from 'fs'
import path from 'path'
import { read } from './directoryFilesGateway'

describe('read', () => {
  function deleteIfExists (path) {
    try { fs.unlinkSync(path) } catch (e) {}
  }

  function createExampleFile (filePath) {
    deleteIfExists(filePath)
    const dir = path.dirname(filePath)
    const parentDir = path.dirname(dir)
    if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    fs.writeFileSync(filePath, '# Nice')
  }

  describe('when directory has file', () => {
    const dir = path.join(__dirname, '../../tmp/dirFilesGateway')
    const filename = 'testing.md'
    const filePath = path.join(dir, filename)

    beforeEach(() => createExampleFile(filePath))
    afterEach(() => deleteIfExists(filePath))

    it('should read directory into map', async () => {
      const files = await read(dir)
      expect(files.testing).toBeTruthy()
    })
  })
})
