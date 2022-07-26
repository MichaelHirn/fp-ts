import * as path from 'path'
import { pipe } from '../src/function'
import * as RTE from '../src/ReaderTaskEither'
import * as TE from '../src/TaskEither'
import { FileSystem, fileSystem } from './FileSystem'
import { run } from './run'

interface Build<A> extends RTE.ReaderTaskEither<FileSystem, Error, A> {}

const OUTPUT_FOLDER = 'dist'
const FIXTURES_FOLDER = 'fixtures'
// required for 'io-ts'
const LIB_FOLDER = 'lib'

export const copyMarkdowns: Build<ReadonlyArray<void>> = (C) =>
  pipe(
    ['CHANGELOG.md', 'LICENSE', 'README.md'] as ReadonlyArray<string>,
    TE.traverseReadonlyArrayWithIndex((_, from) => C.copyFile(from, path.resolve(OUTPUT_FOLDER, from)))
  )

const fixHKT = (folder: string): Build<ReadonlyArray<void>> => (C) =>
  pipe(
    ['HKT.ts', 'IOEither.ts', 'Reader.ts', 'ReaderTask.ts', 'ReaderTaskEither.ts', 'State.ts', 'StateReaderTaskEither.ts', 'Task.ts', 'TaskEither.ts', 'TaskOption.ts'] as ReadonlyArray<string>,
    TE.traverseReadonlyArrayWithIndex((_, name) => C.copyFile(path.join(FIXTURES_FOLDER, folder, name), path.join(OUTPUT_FOLDER, folder, name))),
  )

const createLib = (C: FileSystem) =>
  pipe(
    C.glob(path.resolve(OUTPUT_FOLDER, 'deno', '*')),
    TE.chain(TE.traverseReadonlyArrayWithIndex((_, file: string) => C.copyFile(file, path.join(LIB_FOLDER, file.split('/').pop() as string)))),
  )

const main: Build<ReadonlyArray<void>> = pipe(
  copyMarkdowns,
  RTE.chain(() => fixHKT('deno')),
  RTE.chain(() => createLib)
)

run(
  main({
    ...fileSystem
  })
)
