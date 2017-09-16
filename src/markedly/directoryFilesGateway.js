import fs from 'fs-extra'
import glob from 'glob'
import path from 'path'

function fullFilenames (dir) {
  return new Promise(function (resolve, reject) {
    glob(path.join(dir, '**/*.md'), function (err, files) {
      if (err) reject(err)
      resolve(files)
    })
  })
}

async function slugAndContent (filename) {
  return [path.basename(filename, '.md'), await fs.readFile(filename, 'utf8')]
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
