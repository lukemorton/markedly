import createList from './createList'

export default async function ({ read, write, limit, preview }) {
  const files = await read()
  return createList({ write, files, limit, preview })
}
