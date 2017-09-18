import parsePost from './parsePost'
import parseDate from './parseDate'

function sort (sortable, reverse) {
  if (reverse) {
    return sortable.sort().reverse()
  } else {
    return sortable.sort()
  }
}

function published (slugs, dev) {
  if (dev) {
    return slugs
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return slugs.filter((slug) => today >= parseDate(slug))
}

function limit (limitable, limit) {
  if (limit) {
    return limitable.slice(0, limit)
  } else {
    return limitable
  }
}

function listOfArticles (filenames, files) {
  return filenames.map(function (filename) {
    return parsePost({ filename, content: files[filename] })
  })
}

export default function ({ files, options, preview }) {
  options = options || {}
  const filenames = Object.keys(files)
  const sortedFilenames = limit(published(sort(filenames, options.reverse), preview), options.limit)
  return listOfArticles(sortedFilenames, files)
}
