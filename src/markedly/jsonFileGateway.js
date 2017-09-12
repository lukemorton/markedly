import fs from 'fs'
import fsp from 'fs-promise'
import path from 'path'

export async function write (filePath, data) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  await fsp.writeJson(filePath, data, { spaces: 2 })
  return filePath
}
