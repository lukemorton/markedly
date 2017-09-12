import fs from 'fs'
import path from 'path'
import { write } from './jsonFileGateway'

describe('write', () => {
  function deleteIfExists (path) {
    try { fs.unlinkSync(path) } catch (e) {}
  }

  it('should write list', async () => {
    const filePath = path.join(__dirname, '../../tmp/jsonFileGateway/testing.json')
    deleteIfExists(filePath)
    await write(filePath, [{ cool: true }])
    expect(fs.readFileSync(filePath, 'utf8')).toBe(`[\n  {\n    "cool": true\n  }\n]\n`)
  })
})
