import dotenv from 'dotenv';
dotenv.config();
import { execSync } from 'child_process';

console.log('running jest tests');
execSync(`jest apiTests --no-color 2>testResults.txt`);
console.log('tests finished');
console.log('Detecting missing designations for Parks');
execSync('node --loader ts-node/esm parkDataChecker.ts');
console.log('finshed');
