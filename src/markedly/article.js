import format from 'date-fns/format'
import striptags from 'striptags'
import fm from 'front-matter'
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

function formattedDate (date, formatPattern = 'Do MMMM YYYY') {
  return format(date, formatPattern)
}

function formattedDateFromSlug (slug, formatPattern = 'Do MMMM YYYY') {
  return format(parseDate(slug), formatPattern)
}

function contentWithoutTitle (contentFragments) {
  return marked(contentFragments.slice(2).join('\n'))
}

function frontMatterParser ({ filename, content }) {
  const { attributes, body } = fm(content)
  const post = legacyParser({ filename, content: body.trim() })

  return {
    title: {
      html: post.title.trim(),
      plain: post.plainTitle.trim()
    },
    excerpt: {
      html: post.intro.trim(),
      plain: striptags(post.intro).trim()
    },
    slug: filename,
    publishedAt: {
      pretty: attributes.publishedAt ? formattedDate(attributes.publishedAt) : post.publishedAt,
      iso: attributes.publishedAt ? formattedDate(attributes.publishedAt, null) : post.publishedAtISO
    },
    content: {
      html: post.content,
      plain: striptags(post.content).trim()
    }
  }
}

function legacyParser ({ filename, content }) {
  const contentFragments = content.split('\n')

  return {
    title: title(contentFragments),
    plainTitle: plainTitle(contentFragments),
    intro: intro(contentFragments),
    publishedAt: formattedDateFromSlug(filename),
    publishedAtISO: formattedDateFromSlug(filename, null),
    content: contentWithoutTitle(contentFragments),
    slug: filename
  }
}

export default function ({ filename, content }) {
  if (fm.test(content)) {
    return frontMatterParser({ filename, content })
  } else {
    return legacyParser({ filename, content })
  }
}
