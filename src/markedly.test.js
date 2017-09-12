import fs from 'fs'
import path from 'path'
import { createListFromDirectory } from './markedly'

describe('createListFromFiles', () => {
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
    const dir = path.join(__dirname, '../tmp/dir')
    const filename = 'testing.md'
    const filePath = path.join(dir, filename)
    const outFilePath = path.join(dir, 'output.json')

    beforeEach(() => createExampleFile(filePath))
    afterEach(() => deleteIfExists(filePath))

    it('should write list', async () => {
      await createListFromDirectory({ dir, outFilePath })
    })
  })
})
