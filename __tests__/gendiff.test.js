import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, test, expect } from '@jest/globals'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = name => path.join(__dirname, '..', '__fixtures__', name)
const readFixture = name => fs.readFileSync(getFixturePath(name), 'utf-8')

const expected = readFixture('expected_stylish.txt').trimEnd()

describe.each([
  ['json', 'file1.json', 'file2.json'],
  ['yml', 'file1.yml', 'file2.yml'],
])('gendiff compares flat %s files (stylish)', (_ext, file1Name, file2Name) => {
  test('works correctly', () => {
    const file1 = getFixturePath(file1Name)
    const file2 = getFixturePath(file2Name)

    expect(genDiff(file1, file2).trimEnd()).toBe(expected)
  })
})
