import fs from 'fs'
import path from 'path'
import parsePost from './parsePost'

describe('parsePost()', () => {
  describe('with front matter', () => {
    it('can sensibly parse front matter from markdown', () => {
      const post = parsePost({
        filename: '2017-09-18-cool-things',
        content: fs.readFileSync(path.join(__dirname, 'mockContentWithSomeFrontMatter.md'), { encoding: 'utf8' })
      })

      expect(post.title.html).toBe('<h1 id="a-span-title-span-">A <span>title</span></h1>')
      expect(post.title.plain).toBe('A title')
      expect(post.excerpt.html).toBe('<p>An introduction\ncool.</p>')
      expect(post.excerpt.plain).toBe('An introduction\ncool.')
      expect(post.slug).toBe('2017-09-18-cool-things')
      expect(post.publishedAt.pretty).toMatch(/[\d]{1,2}(?:st|nd|rd|th) [A-Za-z]+ [\d]{4}/)
      expect(post.publishedAt.iso).toMatch('2017-09-17T')
      expect(post.content.html.indexOf('<p>An introduction\ncool.</p>\n')).toBe(0)
      expect(post.content.plain).toBe('An introduction\ncool.\nMore title\nMore content.')
    })

    it('uses front matter by default', () => {
      const post = parsePost({
        filename: '2017-09-18-cool-things',
        content: fs.readFileSync(path.join(__dirname, 'mockContentWithAllFrontMatter.md'), { encoding: 'utf8' })
      })

      expect(post.title.html).toBe('<h1 id="a-span-custom-title-span-">A <span>custom title</span></h1>')
      expect(post.title.plain).toBe('A custom title')
      expect(post.excerpt.html).toBe('<p>This is a custom introduction</p>')
      expect(post.excerpt.plain).toBe('This is a custom introduction')
      expect(post.slug).toBe('custom-slug')
      expect(post.publishedAt.pretty).toMatch(/[\d]{1,2}(?:st|nd|rd|th) [A-Za-z]+ [\d]{4}/)
      expect(post.publishedAt.iso).toMatch('2017-09-17T')
      expect(post.content.html.indexOf('<p>An introduction\ncool.</p>\n')).toBe(0)
      expect(post.content.plain).toBe('An introduction\ncool.\nMore title\nMore content.')
    })
  })

  describe('with legacy parsing', () => {
    it('includes attributes', () => {
      const post = parsePost({
        filename: '2016-01-01-cool-things',
        content: fs.readFileSync(path.join(__dirname, 'mockContentLegacy.md'), { encoding: 'utf8' })
      })

      expect(post.title).toBe('<h1 id="a-span-title-span-">A <span>title</span></h1>')
      expect(post.plainTitle).toBe('A title')
      expect(post.intro).toBe('<p>An introduction\ncool.</p>')
      expect(post.slug).toBe('2016-01-01-cool-things')
      expect(post.publishedAt).toMatch(/[\d]{1,2}(?:st|nd|rd|th) [A-Za-z]+ [\d]{4}/)
      expect(post.publishedAtISO).toBe('2016-01-01T00:00:00.000+00:00')
      expect(post.content.indexOf('<p>An introduction\ncool.</p>\n')).toBe(0)
    })
  })
})
