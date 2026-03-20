import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const readJSON = (path) => require(path);

export default readJSON;