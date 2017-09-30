import sortBy from 'lodash.sortby'
import parsePost from './parsePost'
import parseDate from './parseDate'

function sort (posts, sort = 'slug', reverse = false) {
  let sortedPosts

  switch (sort) {
    case 'title':
      sortedPosts = sortBy(posts, ['title', 'plain'])
      break
    case 'publishedAt':
      sortedPosts = sortBy(posts, ['publishedAt', 'iso'])
      break
    default:
      sortedPosts = sortBy(posts, 'slug')
  }

  if (reverse) {
    return sortedPosts.reverse()
  } else {
    return sortedPosts
  }
}

function postPublishedAt (post) {
  if (post.publishedAtISO) {
    return parseDate(post.publishedAtISO)
  } else {
    return parseDate(post.publishedAt.iso)
  }
}

function published (posts, preview) {
  if (preview) {
    return posts
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return posts.filter((post) => today >= postPublishedAt(post))
}

function limit (limitable, limit) {
  if (limit) {
    return limitable.slice(0, limit)
  } else {
    return limitable
  }
}

function listOfPosts (filenames, files) {
  return filenames.map(function (filename) {
    return parsePost({ filename, content: files[filename] })
  })
}

export default function ({ files, options, preview }) {
  options = options || {}
  const filenames = Object.keys(files)
  const posts = listOfPosts(filenames, files)
  return limit(published(sort(posts, options.sort, options.reverse), preview), options.limit)
}
