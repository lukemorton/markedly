import fs from 'fs-extra'
import glob from 'glob'
import path from 'path'
import partial from 'lodash.partial'

function fullFilenames (dir) {
  return new Promise(function (resolve, reject) {
    glob(path.join(dir, '**/*.md'), function (err, files) {
      if (err) reject(err)
      resolve(files)
    })
  })
}

async function slugAndContent (dir, filename) {
  const slug = filename.substring(dir.length + 1, filename.indexOf('.md'))
  return [slug, await fs.readFile(filename, 'utf8')]
}

async function slugsAndContents (dir, filenames) {
  const pairs = await Promise.all(filenames.map(partial(slugAndContent, dir)))
  const _ = (slugsAndContents, [slug, content]) => {
    return { ...slugsAndContents, [slug]: content }
  }
  return pairs.reduce(_, {})
}

export async function read (dir) {
  const filenames = await fullFilenames(dir)
  return slugsAndContents(dir, filenames)
}
