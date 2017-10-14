import { Env } from '../../config';
import { Api, Params, Query } from './types';

interface UrlOptions {
    env: Env;
}

export class Url {

    constructor(private _options: UrlOptions) {

    }

    get(api: Api, params: Params, query: Query): string {
        return '';
    }
}
