import createListFromFiles from './markedly/createListFromFiles'
import createMapFromFiles from './markedly/createMapFromFiles'
import * as directoryFilesGateway from './markedly/directoryFilesGateway'
import * as jsonFileGateway from './markedly/jsonFileGateway'
import partial from 'lodash.partial'

export async function createListFromDirectory ({ dir, outFilePath, limit, preview }) {
  const read = partial(directoryFilesGateway.read, dir)
  const write = partial(jsonFileGateway.write, outFilePath)
  return createListFromFiles({ read, write, limit, preview })
}

export async function createMapFromDirectory ({ dir, outFilePath, limit, preview }) {
  const read = partial(directoryFilesGateway.read, dir)
  const write = partial(jsonFileGateway.write, outFilePath)
  return createMapFromFiles({ read, write, limit, preview })
}
