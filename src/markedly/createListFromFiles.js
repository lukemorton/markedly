import buildList from './buildList'

export default async function ({ read, write, limit, preview }) {
  const files = await read()
  return write(buildList({ files, limit, preview }))
}
