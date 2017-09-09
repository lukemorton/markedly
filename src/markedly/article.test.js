import fs from 'fs'
import path from 'path'
import article from './article'

describe('article()', () => {
  it('includes attributes', () => {
    const thought = article({
      filename: '2016-01-01-cool-things',
      content: fs.readFileSync(path.join(__dirname, 'mockContent.md'), { encoding: 'utf8' })
    })

    expect(thought.title).toBe('<h1 id="a-span-title-span-">A <span>title</span></h1>\n')
    expect(thought.plainTitle).toBe('A title')
    expect(thought.intro).toBe('<p>An introduction\ncool.</p>\n')
    expect(thought.slug).toBe('2016-01-01-cool-things')
    expect(thought.publishedAt).toMatch(/[\d]{1,2}(?:st|nd|rd|th) [A-Za-z]+ [\d]{4}/)
    expect(thought.publishedAtISO).toBeTruthy()
    expect(thought.content.indexOf('<p>An introduction\ncool.</p>\n')).toBe(0)
  })
})
