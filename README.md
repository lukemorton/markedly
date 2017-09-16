# Markedly

Turn a directory of Markdown files into JSON for your blog.

## Usage

To use markedly, first add it to your project:

```
npm install --save markedly
```

Now you can use the `markedly` command:

```
node_modules/.bin/markedly
```

By default markedly compiles a directory of markdown, by default it looks in  `posts/`, into a single `dist/posts/index.json` with file paths as keys. Below is an example of the JSON produced:

```
{
  "2017-01-17-lightweight-docker-images-for-go": {
    "title": "<h1 id=\"lightweight-docker-images-for-go\">Lightweight docker images for Go</h1>\n",
    "plainTitle": "Lightweight docker images for Go",
    "intro": "<p>On building lightweight Docker images for Go applications.</p>\n",
    "publishedAt": "17th January 2017",
    "publishedAtISO": "2017-01-17T00:00:00.000+00:00",
    "content": "<p>On building lightweight Docker images for Go applications.</p>\n<p>In my last article I wrote about <a href=\"/thoughts/2017-01-15-deploying-go-on-zeit-now\">deploying Go apps to Now</a>. I arrived at a solution that compiled a Go app inside a Docker container. This means that the Docker container needed to be built with all the dependencies necessary to compile Go code into something useful.</p>",
    "slug": "2017-01-17-lightweight-docker-images-for-go"
  }
}
```

You can also create lists of posts in your `package.json`:

```js
{
  "markedly": {
    "lists": {
      "latestArticles": {
        "reverse": true,
        "limit": 10
      }
    }
  }
}
```

When you next run `node_modules/.bin/markedly` it will now produce both `dist/posts/index.json`, along with `dist/posts/latestArticles.json`.

If you wanted a list of all articles sorted by day, you can skip the limit line.

```js
{
  "markedly": {
    "lists": {
      "articlesArchive": {
        "reverse": true
      }
    }
  }
}
```

This would produce a file called `dist/posts/articlesArchive.json`.

## License

MIT
