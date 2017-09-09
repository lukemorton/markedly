import buildList from './buildList'

function addArticleToMap (map, article) {
  map[article.slug] = article
  return map
}

export default function ({ files, preview }) {
  const articleList = buildList({ files, preview })
  return articleList.reduce(addArticleToMap, {})
}
