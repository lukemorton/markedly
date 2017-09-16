import buildList from './buildList'

export default async function ({ read, write, options, preview }) {
  const files = await read()
  return write(buildList({ files, options, preview }))
}
