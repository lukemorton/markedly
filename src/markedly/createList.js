import buildList from './buildList'

export default async function ({ write, files, limit, preview }) {
  return write(buildList({ files, limit, preview }))
}
