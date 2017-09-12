import buildMap from './buildMap'

export default async function ({ read, write, limit, preview }) {
  const files = await read()
  return write(buildMap({ files, limit, preview }))
}
