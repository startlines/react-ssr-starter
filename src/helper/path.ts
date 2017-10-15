import * as path from 'path';

export const Path = {
    root: (...paths: string[]) => path.join(__dirname, '..', '..', ...paths),
    current: (...paths: string[]) => path.join(__dirname, '.', ...paths),
    relative: (...paths: string[]) => path.join(...paths),
};
