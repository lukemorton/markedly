import format from 'date-fns/format'
import striptags from 'striptags'
import fm from 'front-matter'
import marked from 'marked'
import parseDate from './parseDate'

function formattedDate (date, formatPattern = 'Do MMMM YYYY') {
  return format(date, formatPattern)
}

class MetaParser {
  constructor (content) {
    const { attributes, body } = fm(content)
    this._attributes = attributes
    this._body = body
  }

  attributes () {
    return this._attributes
  }

  title () {
    if (this._attributes.title) {
      const html = marked(this._attributes.title).trim()

      return {
        html,
        plain: striptags(html)
      }
    }
  }

  excerpt () {
    if (this._attributes.excerpt) {
      const html = marked(this._attributes.excerpt).trim()
      return {
        html,
        plain: striptags(html)
      }
    }
  }

  publishedAt () {
    if (this._attributes.publishedAt) {
      return {
        pretty: formattedDate(this._attributes.publishedAt),
        iso: formattedDate(this._attributes.publishedAt, null)
      }
    }
  }

  slug () {
    return this._attributes.slug
  }

  body () {
    return this._body
  }
}

class ContentParser {
  constructor (content) {
    const contentFragments = content.trim().split('\n')
    this._frags = contentFragments
  }

  title () {
    return {
      html: marked(this._frags[0]).trim(),
      plain: striptags(this._frags[0].slice(2)).trim()
    }
  }

  excerpt () {
    let i = 2
    let excerpt = []

    while (this._frags[i]) {
      excerpt.push(this._frags[i])
      i++
    }

    const html = marked(excerpt.join('\n')).trim()

    return {
      html,
      plain: striptags(html)
    }
  }

  content () {
    const html = marked(this._frags.slice(2).join('\n')).trim()
    return {
      html,
      plain: striptags(html)
    }
  }
}

function frontMatterParser ({ filename, content }) {
  const metaParser = new MetaParser(content)
  const attributes = metaParser.attributes()
  const body = metaParser.body()
  const contentParser = new ContentParser(body)
  const post = legacyParser({ filename, content: body.trim() })

  return {
    title: metaParser.title() || contentParser.title(),
    excerpt: metaParser.excerpt() || contentParser.excerpt(),
    slug: metaParser.slug() || filename,
    publishedAt: metaParser.publishedAt(),
    content: contentParser.content()
  }
}

function legacyFormattedDateFromSlug (slug, formatPattern) {
  return formattedDate(parseDate(slug), formatPattern)
}

function legacyPublishedAtFromFilename (filename) {
  return {
    pretty: legacyFormattedDateFromSlug(filename),
    iso: legacyFormattedDateFromSlug(filename, null),
  }
}

function legacyParser ({ filename, content }) {
  const contentParser = new ContentParser(content)
  const contentFragments = content.split('\n')

  const title = contentParser.title()
  const excerpt = contentParser.excerpt()
  const publishedAt = legacyPublishedAtFromFilename(filename)
  const contentHtml = contentParser.content().html

  return {
    title: title.html,
    plainTitle: title.plain,
    intro: excerpt.html,
    publishedAt: publishedAt.pretty,
    publishedAtISO: publishedAt.iso,
    content: contentHtml,
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
