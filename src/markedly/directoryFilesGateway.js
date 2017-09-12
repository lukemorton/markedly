import fsp from 'fs-promise'
import path from 'path'

async function fullFilenames (dir) {
  const filenames = await fsp.readdir(dir)
  return filenames.map(filename => path.join(dir, filename))
}

async function slugAndContent (filename) {
  return [path.basename(filename, '.md'), await fsp.readFile(filename, 'utf8')]
}

async function slugsAndContents (filenames) {
  const pairs = await Promise.all(filenames.map(slugAndContent))
  const _ = (slugsAndContents, [slug, content]) => {
    return { ...slugsAndContents, [slug]: content }
  }
  return pairs.reduce(_, {})
}

export async function read (dir) {
  const filenames = await fullFilenames(dir)
  return slugsAndContents(filenames)
}