import fs from 'fs-extra';
import { intercept } from './proxy';

const extensions = {};

export default intercept(fs, extensions);
