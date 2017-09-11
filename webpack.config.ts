import { Configuration } from "webpack";

const Base: Configuration = {};

export const Client: Configuration = {
    ...Base,

    target: 'web',
    name: 'client',

};

export const Server: Configuration = {
    ...Base,

    target: 'node',
    name: 'server',
};
