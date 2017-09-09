import format from 'date-fns/format'
import striptags from 'striptags'
import marked from 'marked'
import parseDate from './parseDate'

function title (contentFragments) {
  return marked(contentFragments[0])
}

function plainTitle (contentFragments) {
  return striptags(contentFragments[0].slice(2))
}

function intro (contentFragments) {
  let i = 2
  let intro = []

  while (contentFragments[i]) {
    intro.push(contentFragments[i])
    i++
  }

  return marked(intro.join('\n'))
}

function formattedDate (slug, formatPattern = 'Do MMMM YYYY') {
  return format(parseDate(slug), formatPattern)
}

function contentWithoutTitle (contentFragments) {
  return marked(contentFragments.slice(2).join('\n'))
}

export default function ({ filename, content }) {
  const contentFragments = content.split('\n')

  return {
    title: title(contentFragments),
    plainTitle: plainTitle(contentFragments),
    intro: intro(contentFragments),
    publishedAt: formattedDate(filename),
    publishedAtISO: formattedDate(filename, null),
    content: contentWithoutTitle(contentFragments),
    slug: filename
  }
}
