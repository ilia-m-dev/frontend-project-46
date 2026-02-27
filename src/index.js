import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import parse from './parsers.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const getFileExtension = filepath => path.extname(filepath)

const formatValue = (value) => {
  if (value === null) return 'null'
  return String(value)
}

const makeLine = (sign, key, value) => `  ${sign} ${key}: ${formatValue(value)}`

const genDiff = (filepath1, filepath2) => {
  const content1 = readFile(filepath1)
  const content2 = readFile(filepath2)

  const ext1 = getFileExtension(filepath1)
  const ext2 = getFileExtension(filepath2)

  const data1 = parse(content1, ext1)
  const data2 = parse(content2, ext2)

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  const lines = keys.flatMap((key) => {
    const has1 = Object.hasOwn(data1, key)
    const has2 = Object.hasOwn(data2, key)

    if (has1 && !has2) {
      return [makeLine('-', key, data1[key])]
    }

    if (!has1 && has2) {
      return [makeLine('+', key, data2[key])]
    }

    const value1 = data1[key]
    const value2 = data2[key]

    if (_.isEqual(value1, value2)) {
      return [makeLine(' ', key, value1)]
    }

    return [
      makeLine('-', key, value1),
      makeLine('+', key, value2),
    ]
  })

  return ['{', ...lines, '}'].join('\n')
}

export default genDiff
