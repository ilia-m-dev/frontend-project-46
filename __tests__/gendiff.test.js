import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test, expect } from '@jest/globals'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = name =>
  path.join(__dirname, '..', '__fixtures__', name)

const readFixture = name =>
  fs.readFileSync(getFixturePath(name), 'utf-8')

test('gendiff compares flat json files (stylish)', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFixture('expected_stylish.txt').trimEnd()

  expect(genDiff(file1, file2).trimEnd()).toBe(expected)
})
