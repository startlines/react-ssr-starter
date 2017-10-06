import * as path from 'path';

export const Path = {
    root: (...paths: string[]) => path.join('..', ...paths),
};
