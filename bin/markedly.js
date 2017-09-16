#! /usr/bin/env node

import { createListFromDirectory, createMapFromDirectory } from 'markedly'
import path from 'path'

let config = require(path.join(process.cwd(), 'package.json')).markedly

if (config) {
  console.log('markedly config loaded from package.json')
} else {
  config = {}
}

const dir = config.dir || 'posts'
const preview = process.env.NODE_ENV !== 'production'

process.on('unhandledRejection', (e) => console.error(e))

async function compile () {
  console.log('markedly is compiling...')

  if (config.lists) {
    for (const name in config.lists) {
      const outFilePath = await createListFromDirectory({
        dir,
        outFilePath: `dist/${dir}/${name}.json`,
        options: config.lists[name],
        preview
      })
      console.log(`> ${outFilePath}`)
    }
  }

  const outFilePath = await createMapFromDirectory({
    dir,
    outFilePath: `dist/${dir}/index.json`,
    preview
  })
  console.log(`> ${outFilePath}`)

  console.log('markedly is done.')
}

compile()
