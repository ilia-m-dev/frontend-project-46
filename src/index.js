import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

const getFileExtension = (filepath) => path.extname(filepath);

const parse = (content, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(content);
    default:
      throw new Error(`Unknown format: ${ext}`);
  }
};

const genDiff = (filepath1, filepath2) => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);

  const ext1 = getFileExtension(filepath1);
  const ext2 = getFileExtension(filepath2);

  const data1 = parse(content1, ext1);
  const data2 = parse(content2, ext2);

  console.log(data1);
  console.log(data2);
};

export default genDiff;