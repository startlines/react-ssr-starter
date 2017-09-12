import { Configuration } from "webpack";
import * as path from 'path';

function Root(...paths: string[]) {
    return path.join(__dirname, ...paths);
}

const Base: Configuration = {

};

export const Client: Configuration = {
    ...Base,

    target: 'web',
    name: 'client',

    entry: {
        client: Root('src/client'),
    },

};

export const Server: Configuration = {
    ...Base,

    target: 'node',
    name: 'server',

    entry: {
        server: Root('src/server'),
    },
};
