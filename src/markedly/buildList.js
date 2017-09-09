import articles from './article'
import sortByDateOrderDesc from './sortByDateOrderDesc'
import parseDate from './parseDate'

function published (slugs, dev) {
  if (dev) {
    return slugs
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return slugs.filter((slug) => today >= parseDate(slug))
}

function limitBy (limitable, limit) {
  if (limit) {
    return limitable.slice(0, limit)
  } else {
    return limitable
  }
}

function listOfArticles (filenames, files) {
  return filenames.map(function (filename) {
    return articles({ filename, content: files[filename] })
  })
}

export default function ({ limit, files, preview }) {
  const filenames = Object.keys(files)
  const sortedFilenames = limitBy(published(sortByDateOrderDesc(filenames), preview), limit)
  return listOfArticles(sortedFilenames, files)
}
