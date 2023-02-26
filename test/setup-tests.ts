import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, 'config.env.test') });

const filePath = path.join(__dirname, 'config.env.test');
const environmentsPath = path.join(__dirname, '../environments', 'test.env');

// File destination.txt will be created or overwritten by default.
export function copyTestFile(): void {
  // Full local path to the file
  console.log(
    '\nFile Contents of example_file:',
    fs.readFileSync(filePath, 'utf8'),
  );
  fs.copyFile(filePath, 'environments/test.env', (err) => {
    if (err) throw err;
    console.log('Test config file copied');
  });
}

export function deleteTestFile(): void {
  fs.unlink(environmentsPath, (err) => {
    if (err) throw err;
    console.log('Test config file deleted');
  });
}
