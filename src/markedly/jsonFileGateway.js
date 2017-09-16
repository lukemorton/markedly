import fs from 'fs-extra'
import path from 'path'

export async function write (filePath, data) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  await fs.writeJson(filePath, data, { spaces: 2 })
  return filePath
}
