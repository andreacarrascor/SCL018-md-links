import { mdLinks } from './index.js';
import Yargs from 'yargs';
const path = process.argv[2];
const options = Yargs(process.argv.slice(2)).argv;

mdLinks(path, options).then(response => console.table(response)).catch(error=> console.log(error))

