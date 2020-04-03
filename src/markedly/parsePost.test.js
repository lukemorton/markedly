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

      expect(post.title.html).toEqual('<h1 id="a-spantitlespan">A <span>title</span></h1>')
      expect(post.title.plain).toEqual('A title')
      expect(post.excerpt.html).toEqual('<p>An introduction\ncool.</p>')
      expect(post.excerpt.plain).toEqual('An introduction\ncool.')
      expect(post.slug).toEqual('2017-09-18-cool-things')
      expect(post.publishedAt.pretty).toMatch(/[\d]{1,2}(?:st|nd|rd|th) [A-Za-z]+ [\d]{4}/)
      expect(post.publishedAt.iso).toMatch('2017-09-17T')
      expect(post.content.html.indexOf('<p>An introduction\ncool.</p>\n')).toEqual(0)
      expect(post.content.plain).toEqual('An introduction\ncool.\nMore title\nMore content.')
    })

    it('uses front matter by default', () => {
      const post = parsePost({
        filename: '2017-09-18-cool-things',
        content: fs.readFileSync(path.join(__dirname, 'mockContentWithAllFrontMatter.md'), { encoding: 'utf8' })
      })

      expect(post.title.html).toEqual('<h1 id="a-spancustom-titlespan">A <span>custom title</span></h1>')
      expect(post.title.plain).toEqual('A custom title')
      expect(post.excerpt.html).toEqual('<p>This is a custom introduction</p>')
      expect(post.excerpt.plain).toEqual('This is a custom introduction')
      expect(post.slug).toEqual('custom-slug')
      expect(post.featuredImage).toEqual('/nice.jpg')
      expect(post.tags).toEqual(['fiction'])
      expect(post.publishedAt.pretty).toMatch(/[\d]{1,2}(?:st|nd|rd|th) [A-Za-z]+ [\d]{4}/)
      expect(post.publishedAt.iso).toMatch('2017-09-17T')
      expect(post.content.html.indexOf('<p>An introduction\ncool.</p>\n')).toEqual(0)
      expect(post.content.plain).toEqual('An introduction\ncool.\nMore title\nMore content.')
    })
  })

  describe('with HTML h1', () => {
    it('can parse title correctly', () => {
      const post = parsePost({
        filename: '2017-09-18-cool-things',
        content: fs.readFileSync(path.join(__dirname, 'mockContentWithCustomH1.md'), { encoding: 'utf8' })
      })

      expect(post.title.html).toEqual('<h1 class="larger">A <span>title</span></h1>')
      expect(post.title.plain).toEqual('A title')
    })
  })

  describe('with legacy parsing', () => {
    it('includes attributes', () => {
      const post = parsePost({
        filename: '2016-01-01-cool-things',
        content: fs.readFileSync(path.join(__dirname, 'mockContentLegacy.md'), { encoding: 'utf8' })
      })

      expect(post.title.html).toEqual('<h1 id="a-spantitlespan">A <span>title</span></h1>')
      expect(post.title.plain).toEqual('A title')
      expect(post.excerpt.html).toEqual('<p>An introduction\ncool.</p>')
      expect(post.slug).toEqual('2016-01-01-cool-things')
      expect(post.publishedAt.pretty).toMatch(/[\d]{1,2}(?:st|nd|rd|th) [A-Za-z]+ [\d]{4}/)
      expect(post.publishedAt.iso).toMatch('2016-01-01T')
      expect(post.content.html.indexOf('<p>An introduction\ncool.</p>\n')).toEqual(0)
    })
  })
})
